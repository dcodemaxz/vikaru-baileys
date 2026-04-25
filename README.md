# <div align="center">Vikaru Baileys</div>

<div align="center">

  <img src="https://raw.githubusercontent.com/dcodemaxz/Vikaru-Bot/refs/heads/main/media/image.png" />

  <a href="https://github.com/dcodemaxz/vikaru-baileys">
    <img src="https://img.shields.io/github/package-json/v/dcodemaxz/vikaru-baileys?color=red&label=Version&logo=github" alt="GitHub version" />
  </a>

  <a href="https://chat.whatsapp.com/GlNdk54lm9V7C4U54SXnh1">
    <img src="https://img.shields.io/badge/WhatsApp-Comunity-25D366?logo=whatsapp&logoColor=white" alt="WhatsApp Comunity" />
  </a>

![Stars](https://img.shields.io/github/stars/dcodemaxz/vikaru-baileys)
![Forks](https://img.shields.io/github/forks/dcodemaxz/vikaru-baileys)
![Issues](https://img.shields.io/github/issues/dcodemaxz/vikaru-baileys)

</div>

## 📝 Important Note

> [!IMPORTANT]
> This is a **custom `Baileys` build** by [dcodemaxz](https://github.com/dcodemaxz), based on [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys).  
This version includes several improvements, enhanced performance, and TypeScript compatibility.

---

## ✨ Added Features and Improvements

> [!TIP]
> 🔥 This Baileys is intended to `support` the [Vikaru-Bot](https://github.com/dcodemaxz/Vikaru-Bot) project

### Message Management
| Feature                              | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| 💬 **Send Messages**                 | Send text, media, documents, and more with rich formatting |
| ✏️ **Edit Messages**                 | Edit sent messages after delivery                          |
| 🗑️ **Delete Messages**               | Delete messages from your side or for everyone             |
| ❤️ **React Messages**                | React to messages with emojis (add/remove reactions)       |
| 📌 **Pin Messages**                  | Pin important messages in chats or groups                  |
| 📍 **Keep Messages**                 | Mark messages as kept/important for later reference        |
| 🗳️ **Poll Messages**                 | Create and send interactive poll messages                  |
| 🤖 **AI Message Icon**               | Add AI-styled icons to bot messages (biz_bot marker)       |

### Media & Upload
| Feature                              | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| 🖼️ **Send Album Messages**           | Send grouped media (album style) with captions             |
| 🎨 **Media Utilities**               | Resize, convert, compress, and sticker creation           |
| 🌊 **Audio Waveform**                | Automatic waveform generation for audio messages           |
| 📤 **Media Upload**                  | Optimized media upload to WhatsApp servers                 |
| 📥 **Media Download**                | Download and save media from messages                      |
| 🖼️ **Full-Size Profile Pictures**    | Upload HD profile pictures without cropping                |
| 🎞️ **Video to GIF**                  | Convert videos to animated GIFs                            |

### Interactive Messages
| Feature                              | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| 🔘 **Button Messages**               | Send interactive button messages (quick reply, URL, call)  |
| 📋 **List Messages**                 | Send single and multi-select list messages                 |
| 🎫 **Interactive Buttons**           | Quick reply, copy, URL, call, and copy coupon buttons      |
| 📑 **Single Select**                 | Single selection from categorized item lists               |

### Group Management
| Feature                              | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| 👥 **Group Operations**              | Create, update, leave, and manage groups                   |
| 👤 **Member Management**             | Add, remove, promote, and demote group members             |
| 🏷️ **Label Group Members**           | Set labels/tags for individual group members               |
| 📝 **Group Metadata**                | Get group info, participants, settings                     |
| 📊 **Group Settings**                | Configure member add mode, approval mode, ephemeral msgs  |
| 📢 **Group Invites**                 | Generate, revoke, and manage group invite codes/links      |
| 👥 **JID/LID Support**               | Full support for `@jid` and `@lid` group identifiers       |
| 📱 **Ephemeral Messages**            | Auto-delete messages in groups (24h, 7d, 90d)             |
| 📊 **Group Status Messages**         | Send status updates visible only in groups                 |
| 📅 **Event Invitations**             | Create and send event invitation messages                  |

### Newsletter Management
| Feature                              | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| 🗞️ **Newsletter Operations**         | Create, follow, unfollow, and manage newsletters           |
| 📝 **Newsletter Metadata**           | Get newsletter info, subscribers, verification status     |
| 📝 **Update Newsletter Info**         | Change newsletter name, description, and profile picture   |
| 👤 **Newsletter Management**         | Add/remove admins, change owner, manage subscribers        |
| 📊 **Admin Count**                   | Get count of newsletter administrators                     |
| 🔕 **Mute/Unmute**                  | Mute and unmute newsletter notifications                   |
| 📢 **Multiple Newsletter Follow**    | Follow multiple newsletters at once                        |
| ❤️ **Newsletter React Messages**     | React to messages in newsletters                           |

### Message Utilities
| Feature                              | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| 📖 **Read Receipts**                 | Send read receipts and mark messages as read              |
| ✅ **Duplicate Prevention**          | Prevent duplicate message handling with ID caching         |
| 🔍 **Message Searching**             | Query and retrieve messages from store                     |
| 📊 **Message Updates**               | Handle message edits and media retries                     |

### Account & Security
| Feature                              | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| 🔑 **Custom Pairing Codes**          | Generate and use your own pairing codes                    |
| 🛠️ **Pairing/QR Fixes**              | Fixed bugs for WhatsApp linking issues (Pairing/QR)        |
| 🚫 **Check Banned Numbers**          | Check if a number is banned on WhatsApp                    |
| 📊 **Privacy Settings**              | Fetch and manage privacy settings (read receipts, etc)     |
| 🚪 **Logout**                        | Safely logout and end the session                          |
| ⚙️ **Multi-file Auth Support**       | Built-in multi-file auth like official Baileys            |

### Channels & Discovery
| Feature                              | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| 📺 **Channel Metadata**              | Get channel info from URLs                                 |
| 🔗 **Channel ID Checker**            | Extract channel IDs and metadata from links                |
| 📢 **Status Messages**               | Send and manage status/story messages                      |

### Performance & Infrastructure
| Feature                              | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| 📈 **Optimized Performance**         | Rewritten modules for faster connection and retries        |
| 📡 **Libsignal Fixes**               | Latest libsignal-node from WhiskeySockets (clean logs)     |
| 🗃️ **makeInMemoryStore**             | In-memory store support for message caching                |
| 🔄 **Device Sync (USync)**           | Latest device protocol with USync query improvements       |
| ⏱️ **Delay Function**                | Built-in async delay/sleep function                        |
| 🔧 **Advanced Handlers**             | Enhanced message and event handling                        |

### Protocol & Compatibility
| Feature                              | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| 🌐 **Communities Support**           | Full support for WhatsApp Communities                      |
| 🏢 **Business Features**             | Business account and catalog support                       |
| 📡 **Multi-Device (MD) Support**     | Full multi-device protocol compliance                      |
| 🔐 **E2E Encryption**                | End-to-end encryption with Signal protocol                 |

---

## 📥 Installation

Install via `package.json`:

```bash
"dependencies": {
    "baileys": "github:dcodemaxz/vikaru-baileys"
}

```

Install via `terminal`:

```bash
npm install baileys@github:dcodemaxz/vikaru-baileys
```

---


## 🚀 Quick Example (Anti-duplicate messages)

> [!TIP]
> A simple example of preventing duplicate executions due to `duplicate messages` from a WhatsApp message ID.
This code caches the first message ID and then automatically ignores messages with the same ID (second, etc.), preventing the bot from executing the command twice. The cache is automatically cleared after reaching 10 IDs to keep it lightweight.

```ts
// Duplicate message ( cached )
const duplicateMsg = new Map();

vikaru.ev.on("messages.upsert", ({ messages }) => {
    const mek = messages[0]

    // Stop execution if the same ID is detected
    if (duplicateMsg.has(mek.key.id)) {
        console.log(`\n› [ Duplicate-Id ] ▸ ${mek.key.participant || mek.key.remoteJid} | ${mek.key.id}`);
        return;
    }

    // Delete saved id after 10 id
    if (duplicateMsg.size >= 10) duplicateMsg.clear();

    // Save the incoming id
    duplicateMsg.set(mek.key.id, true);

    // Command ( case / plugin )
    // ...
})
```

---

## 🧪 Advanced Usage (index.js)

<details>

```ts
// Import variables from baileys
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
} = require("baileys");

// Function starts
async function vikarustart() {
    const { state, saveCreds } = await useMultiFileAuthState("./session/")
    const vikaru = makeWASocket({
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        getMessage: async (key) => await getMessageFromStore(key),
        cachedGroupMetadata: async (jid) => groupCache.get(jid),
    });

// ------------------------------------------------------------------- //

    // Piring code
    if (!vikaru.authState.creds.registered) {
        const phoneNumber = "6289508899033"
        const customCode = "MAXZBAIL";
        const code = await vikaru.requestPairingCode(phoneNumber, customCode);
        console.log(`Pairing Code : ${code?.match(/.{1,4}/g)?.join("-") || code}`);
    }

    // Save credentials after connecting
    vikaru.ev.on("creds.update", saveCreds)

// ------------------------------------------------------------------- //

    // Detecting connection to server
    vikaru.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;

        // Connecting
        if (connection == "connecting") {
            console.log(`\n› [ Starting Bot ] ▸ Connecting To WhatsApp Server...`);

        // Connected
        } else if (connection === "open") {
            console.log(`\n› [ Connected To ] ▸ ${vikaru.user.id}`);

        // Disconnected
        } else if (connection === "close") {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.badSession) {
                console.log(`\n› [ Disconnected ] ▸ Bad Session File, Please Delete Session and Pairing Again`);
                process.exit(1);
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log(`\n› [ Reconnecting ] ▸ Connection Closed...`);
                vikarustart();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log(`\n› [ Reconnecting ] ▸ Connection Lost From Server...`);
                vikarustart();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log(`\n› [ Disconnected ] ▸ Connection Replaced, Another New Session Opened`);
                process.exit(1);
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(`\n› [ Disconnected ] ▸ Device Logged Out, Deleted session Folder and Pairing Again.`);
                process.exit(1);
            } else if (reason === DisconnectReason.restartRequired) {
                console.log(`\n› [ Reconnecting ] ▸ Restarting connection...`);
                vikarustart();
            } else if (reason === DisconnectReason.timedOut) {
                console.log(`\n› [ Reconnecting ] ▸ Connection TimedOut...`);
                vikarustart();
            } else {
                console.log(`\n› [ Disconnected ] ▸ Unknown DisconnectReason: ${reason} | ${connection}`);
                process.exit(1);
            }
        }
    });

// ------------------------------------------------------------------- //

    // Duplicate message ( cached )
    const duplicateMsg = new Set();

    // Receive messages
    vikaru.ev.on("messages.upsert", ({ messages }) => {
        const mek = messages[0]

        // Stop execution if the same ID is detected
        if (duplicateMsg.has(mek.key.id)) {
            console.log(`\n› [ Duplicate-Id ] ▸ ${mek.key.participant || mek.key.remoteJid} | ${mek.key.id}`);
            return;
        }

        // Delete saved id after 10 id
        if (duplicateMsg.size >= 10) duplicateMsg.clear();

        // Save the incoming id
        duplicateMsg.set(mek.key.id, true);

        // Simple command
        const text = mek.message.conversation
        if (text?.startsWith(["/", "#", "!"])) {
            const command = text.substring(1).split(" ")[0]
            
            if (command === "ping") {
                await vikaru.sendMessage(mek.key.remoteJid, 
                    { text: "Pong! 🏓" }, 
                    { quoted: mek }
                )
            }
        }
    })

// ------------------------------------------------------------------- //

} // end

// Call the start function
vikarustart()
```

</details>

---

## 🧩 Feature Examples

<details>

### ✏️ Edit Message

```ts
await vikaru.edit(message, "Updated message text")

// Or
await vikaru.sendMessage(chatId, {
    edit: message.key,
    text: "New text content"
})
```

---

### 🗑️ Delete Message (Revoke)

```ts
// Delete for yourself
await vikaru.sendMessage(chatId, {
    delete: message.key
})

// For groups/newsletter, delete for everyone (admin only)
// Automatically handled based on context
```

---

### 🔔 Read Receipts & Mark as Read

```ts
// Send read receipt for single message
await vikaru.sendReadReceipt(chatId, participantJid, [messageId], 'read')

// Bulk read messages
await vikaru.readMessages([
    { remoteJid: chatId, id: messageId1 },
    { remoteJid: chatId, id: messageId2 }
])

// Read receipt types: 'read', 'read-self', 'delivery', 'played'
```

---

### 📌 Pin & Keep Messages

```ts
// Pin message
await vikaru.sendMessage(chatId, {
    pin: message.key
})

// Keep message (mark as important)
await vikaru.sendMessage(chatId, {
    keep: message.key
})
```

---

### 🗳️ Poll Messages

```ts
await vikaru.sendMessage(chatId, {
    poll: {
        name: "Which feature do you like?",
        values: ["Feature A", "Feature B", "Feature C"],
        selectableCount: 1
    }
})
```

---

### 🎨 Media Utilities (Resize, Convert, Compress, Sticker)

```ts
// Resize image
const resized = await vikaru.resize(imageBuffer, 800, 600, { quality: 85 })

// Convert image format
const converted = await vikaru.convert(imageBuffer, { to: '.png' })

// Convert to sticker (512x512 WebP)
const sticker = await vikaru.toSticker(imageBuffer, { quality: 80 })

// Compress video
const compressed = await vikaru.compress(videoBuffer, { quality: 60 })

// Send as sticker pack
await vikaru.sendMessage(chatId, {
    stickerPack: {
        sticker: await vikaru.toSticker(imageBuffer)
    }
})
```

---

### 🌊 Audio Waveform & Audio Messages

```ts
// Send audio with automatic waveform generation
const audioBuffer = fs.readFileSync('./audio.mp3')
await vikaru.sendMessage(chatId, {
    audio: audioBuffer,
    mimetype: 'audio/mpeg'
    // Waveform is automatically generated
})
```

---

### 💬 Send Message with Text, Links & Preview

```ts
// Simple text message
await vikaru.sendMessage(chatId, { text: "Hello!" })

// With link preview
await vikaru.sendMessage(chatId, {
    text: "Check this: https://github.com/dcodemaxz/vikaru-baileys"
})

// Force link preview generation (high quality)
// Configure: generateHighQualityLinkPreview: true in socket config
```

---

### 🎫 Button Messages (Interactive)

```ts
await vikaru.sendMessage(chatId, {
    title: "❏ *`EXAMPLE BUTTONS`*",
    text: "Choose one of the options below:",
    footer: "© dcodemaxz baileys",
    // image: { url: "https://example.com/image.jpg" },

    interactiveButtons: [
        // Reply button
        {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
                display_text: "Quick Reply",
                id: "reply_id_1"
            })
        },

        // Copy button (copy to clipboard)
        {
            name: "quick_copy",
            buttonParamsJson: JSON.stringify({
                display_text: "Copy Code",
                id: "copy_id_1",
                copy_code: "VIKARU-2025"
            })
        },

        // URL button
        {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: "Visit Website",
                url: "https://github.com/dcodemaxz"
            })
        },

        // Call button
        {
            name: "cta_call",
            buttonParamsJson: JSON.stringify({
                display_text: "Call Support",
                phone_number: "+6289508899033"
            })
        }
    ]
}, { quoted: null })
```

---

### 📋 List/Select Messages

```ts
// Single select list
await vikaru.sendMessage(chatId, {
    title: "❏ *`SELECT ITEMS`*",
    text: "Choose one of the following:",
    footer: "© dcodemaxz baileys",

    interactiveButtons: [
        {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
                title: "Choose Product",
                sections: [
                    {
                        title: "🛍️ Category 1",
                        highlight_label: "Recommended",
                        rows: [
                            {
                                header: "Product A",
                                title: "Buy Product A",
                                description: "High quality product",
                                id: "buy_a"
                            },
                            {
                                header: "Product B",
                                title: "Buy Product B",
                                description: "Budget friendly",
                                id: "buy_b"
                            }
                        ]
                    },
                    {
                        title: "🎁 Category 2",
                        rows: [
                            {
                                header: "Product C",
                                title: "Buy Product C",
                                description: "Premium option",
                                id: "buy_c"
                            }
                        ]
                    }
                ]
            })
        }
    ]
}, { quoted: null })
```

---

### 🖼️ Album Messages (Grouped Media)

```ts
await vikaru.sendMessage(chatId, {
    album: [
        { image: { url: "https://example.com/image1.jpg" } },
        { image: { url: "https://example.com/image2.jpg" } },
        { video: { url: "https://example.com/video.mp4" } },
        { image: { url: "https://example.com/image3.jpg" } }
    ],
    caption: "Beautiful album collection 🎨"
})
```

---

### ❤️ React to Messages (Emoji Reactions)

```ts
// React with emoji
await vikaru.react(message, "🔥")

// Or
await vikaru.sendMessage(chatId, {
    react: {
        text: "😂",
        key: message.key
    }
})

// Remove reaction
await vikaru.unreact(message)
```

---

### 📞 Quoted Messages (Reply)

```ts
// Reply/Quote to a message
await vikaru.sendMessage(chatId, {
    text: "This is a reply!"
}, {
    quoted: message  // or message.key
})
```

---

### 🤖 AI Message Icon

```ts
// Add AI bot icon to message
await vikaru.sendMessage(chatId, {
    text: "This message is from AI Bot! 🤖",
    ai: true  // Displays AI icon
})
```

---

### 🗳️ Newsletter Management

```ts
// Create newsletter
const newsletter = await vikaru.newsletterCreate(
    "My Newsletter",
    "Latest updates and news",
    fs.readFileSync('./newsletter-pic.jpg')
)

// Follow newsletter
await vikaru.newsletterFollow("123456789@newsletter")

// Unfollow newsletter
await vikaru.newsletterUnfollow("123456789@newsletter")

// Update newsletter name
await vikaru.newsletterUpdateName("123456789@newsletter", "Updated Name")

// Update description
await vikaru.newsletterUpdateDescription("123456789@newsletter", "New description here")

// Update profile picture
await vikaru.newsletterUpdatePicture("123456789@newsletter", fs.readFileSync('./pic.jpg'))

// Remove profile picture
await vikaru.newsletterRemovePicture("123456789@newsletter")

// Mute/Unmute newsletters
await vikaru.newsletterMute("123456789@newsletter")
await vikaru.newsletterUnmute("123456789@newsletter")

// Change newsletter owner
await vikaru.newsletterChangeOwner("123456789@newsletter", "1234567890@s.whatsapp.net")

// Demote admin
await vikaru.newsletterDemote("123456789@newsletter", "1234567890@s.whatsapp.net")

// Delete newsletter
await vikaru.newsletterDelete("123456789@newsletter")

// Get admin count
const adminCount = await vikaru.newsletterAdminCount("123456789@newsletter")

// React to newsletter message
await vikaru.newsletterReactMessage("123456789@newsletter", "175", "🥳")

// Get newsletter metadata
const metadata = await vikaru.newsletterMetadata("invite", "code_here")

// Subscribe to newsletter live updates
await vikaru.subscribeNewsletterUpdates("123456789@newsletter")
```

---

### 👥 Group Management

```ts
// Create group
const group = await vikaru.groupCreate("My Group", ["628xx@s.whatsapp.net", "628yy@s.whatsapp.net"])

// Get group metadata
const metadata = await vikaru.groupMetadata(groupJid)

// Update group name
await vikaru.groupUpdateSubject(groupJid, "New Group Name")

// Update group description
await vikaru.groupUpdateDescription(groupJid, "Group description here")

// Add member(s)
await vikaru.groupParticipantsUpdate(groupJid, ["628xx@s.whatsapp.net"], "add")

// Remove member(s)
await vikaru.groupParticipantsUpdate(groupJid, ["628xx@s.whatsapp.net"], "remove")

// Promote to admin
await vikaru.groupParticipantsUpdate(groupJid, ["628xx@s.whatsapp.net"], "promote")

// Demote admin
await vikaru.groupParticipantsUpdate(groupJid, ["628xx@s.whatsapp.net"], "demote")

// Leave group
await vikaru.groupLeave(groupJid)

// Get group invite code
const inviteCode = await vikaru.groupInviteCode(groupJid)

// Revoke invite
await vikaru.groupRevokeInvite(groupJid)

// Accept group invite
const joinedGroup = await vikaru.groupAcceptInvite("inviteCodeHere")

// Get invite info
const inviteInfo = await vikaru.groupGetInviteInfo("inviteCodeHere")

// Set label for group member
await vikaru.setLabelGroup(groupJid, "VIP Members")

// Toggle ephemeral messages (auto-delete)
await vikaru.groupToggleEphemeral(groupJid, 604800) // 7 days

// Update group settings
await vikaru.groupSettingUpdate(groupJid, "announcement") // announcement only

// Set member add mode
await vikaru.groupMemberAddMode(groupJid, [{ tag: "member_add_mode", attrs: {}, content: "restricted" }])

// Set join approval mode
await vikaru.groupJoinApprovalMode(groupJid, "on")
```

---

### 📢 Group Status Messages

```ts
// Send status message visible to group
await vikaru.sendStatusMention({
    text: "Group update! Check this out 📢"
}, [groupJid])
```

---

### 📺 Channel/Newsletter Info

```ts
// Check channel/newsletter from URL
const channelInfo = await vikaru.cekIDSaluran("https://whatsapp.com/channel/xxxx")
console.log(channelInfo)
// Returns: { name, id, state, subscribers, verification, creation_time }
```

---

### 🚫 Check Banned Numbers

```ts
// Check if number is banned
const isBanned = await vikaru.checkBanned("6289508899033@s.whatsapp.net")
if (isBanned) {
    console.log("This number is banned on WhatsApp")
}
```

---

### ⏱️ Delay/Sleep Function

```ts
// Delay for 5 seconds
await vikaru.delay(5)

// Delay for 2.5 seconds
await vikaru.delay(2.5)
```

---

### 🔑 Custom Pairing Codes

```ts
// Request pairing code
const phoneNumber = "6289508899033"
const customCode = "MAXZBAIL"  // Optional custom code
const code = await vikaru.requestPairingCode(phoneNumber, customCode)

console.log(`Your Pairing Code: ${code?.match(/.{1,4}/g)?.join("-") || code}`)
```

---

### 🚪 Logout

```ts
// Logout and end session
await vikaru.logout("Goodbye!")
```

---

### 📊 Update Media Message

```ts
// Retry and update media message (if media failed)
const updatedMessage = await vikaru.updateMediaMessage(message)
```

---

### 📖 Fetch Privacy Settings

```ts
// Get your privacy settings
const privacySettings = await vikaru.fetchPrivacySettings()
// Returns: { readreceipts, lastseen, onlineStatus, profilePhoto, ... }
```

---

### 🗃️ In-Memory Store

```ts
const { makeWASocket, makeInMemoryStore } = require('baileys')

const store = makeInMemoryStore({ 
    logger: pino({ level: 'debug' }) 
})

const vikaru = makeWASocket({ auth: state })
store.bind(vikaru.ev)

// Now you can access messages from store
console.log(store.messages[chatId])
console.log(store.contacts[jid])
console.log(store.chats)
```

---

### 🔄 Event Listening

```ts
// Connection updates
vikaru.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, isNewLogin } = update
    console.log(connection, lastDisconnect, isNewLogin)
})

// Messages
vikaru.ev.on('messages.upsert', ({ messages, type }) => {
    console.log(`Messages: ${type}`, messages)
})

// Message updates
vikaru.ev.on('messages.update', (updates) => {
    console.log('Message updates:', updates)
})

// Chats
vikaru.ev.on('chats.upsert', (chats) => {
    console.log('Chats upserted:', chats)
})

// Groups
vikaru.ev.on('groups.update', (updates) => {
    console.log('Groups updated:', updates)
})

// Contacts
vikaru.ev.on('contacts.upsert', (contacts) => {
    console.log('Contacts upserted:', contacts)
})

// Credentials
vikaru.ev.on('creds.update', saveCreds)
```

</details>


---

## 🪲 Reporting Issues

> [!NOTE]
> If you find a `bug` or `need help`, please open an [issue](https://github.com/dcodemaxz/vikaru-baileys/issues).

<details>
<summary>⚡ Developer</summary>

- [WhatsApp](https://wa.me/+6289508899033)  
- [Telegram](https://t.me/dcodemaxz)

</details>

---

## ⚠️ Disclaimer

> [!CAUTION]
> This project is not affiliated with `WhatsApp Inc`.\
Use it responsibly. Avoid spam, abuse, or illegal activity.

<details>
<summary>⚡ Thanks to</summary>

- whiskeysockets  
- baileys-mod 
- whileys  

</details>

---

## 📄 License

MIT © 2025 [dcodemaxz](LICENSE)
