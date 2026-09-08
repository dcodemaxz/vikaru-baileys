import { DEFAULT_CONNECTION_CONFIG } from '../Defaults/index.js';
import { makeCommunitiesSocket } from './communities.js';
import { makeInteropSocket } from './interop.js'
import { makePrivacySocket } from './privacy.js'
import { makeGraphQLSocket } from './graphql.js'
import { makeMessageBuilderSocket } from './message-builder.js'
// export the last socket layer
const makeWASocket = (config) => {
    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config
    };
    const communitiesSocket = makeCommunitiesSocket(newConfig);
    const interopSocket = makeInteropSocket(communitiesSocket);
    const privacySocket = makePrivacySocket(interopSocket);
    const graphqlSocket = makeGraphQLSocket(privacySocket);
    return makeMessageBuilderSocket(graphqlSocket);
};
export default makeWASocket;
//# sourceMappingURL=index.js.map