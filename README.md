# <div align="center">Vikaru Super Baileys</div>

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

| Feature                              | Description                                                |
| ------------------------------------ |--------| ---------------------------------------------------------- |
| 🚫 **Anti-duplicate Response**       | Solution to overcome duplicate incoming message id         |
| 🗞️ **Newsletter Management**         | Full newsletter support including create, follow, metadata |
| 🗃️ **makeInMemoryStore**             | Supported `makeInMemoryStore` built in from baileys        |
| 🔘 **Button & Interactive Messages** | Full interactive support for WhatsApp Messenger & Business |
| 🖼️ **Send Album Messages**           | Send grouped media (album style) with caption support      |
| 👥 **Group with JID/LID Support**    | Enhanced support for `@jid` and `@lid` identifiers         |
| 🤖 **AI Message Icon**               | Add AI-styled icons to your bot replies                    |
| 🖼️ **Full-Size Profile Pictures**    | Upload HD profile pictures without cropping                |
| 🔑 **Custom Pairing Codes**          | Generate and use your own pairing codes                    |
| 📡 **Libsignal Fixes**               | Clean console logs and improved stability                  |
| 🛠️ **Pairing/Qr Fixes**              | `Fixed bugs` where WhatsApp cannot be linked (Pairing/Qr)  |
| ⚙️ **Multi-file Auth Support**       | Built-in multi-file auth like official Baileys             |
| 📈 **Optimized Performance**         | Rewritten modules for faster connection and retries        |
| 🏷️ **Label Group Management**        | Set labels for group members                               |
| ⏱️ **Delay Function**                | Built-in delay/sleep function                              |
| ❤️ **React Messages**                | React to messages with emojis                              |
| ✏️ **Edit Messages**                 | Edit sent messages                                         |
| 🚫 **Check Banned Numbers**          | Check if a number is banned                                |
| 📺 **Channel ID Checker**            | Get channel metadata from URL                              |
| 📢 **Multiple Newsletter Follow**    | Follow multiple newsletters at once                        |
| 🌊 **Audio Waveform**                | Automatic waveform generation for audio messages           |
| 📊 **Group Status Messages**         | Send status messages to groups                             |
| 📅 **Event Messages**                | Create and send event invitations                          |
| 🗳️ **Poll Result Messages**          | Display poll results                                       |
| 🔧 **Advanced Handlers**             | Enhanced message handling                                  |
| 🖼️ **Media Utilities**               | Resize, convert, compress, sticker functions               |

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
    console.log(mek.key.remoteJid, mek.message?.conversation)
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
        console.log(`Your Pairing Code: ${code?.match(/.{1,4}/g)?.join("-") || code}`);
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

        // Command ( case / plugin )
        console.log(mek.key.remoteJid, mek.message?.conversation)
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

### Newsletter Management

```ts
await vikaru.newsletterMetadata("invite", "xxxx")
await vikaru.newsletterUpdateDescription("xxxx@newsletter", "New Description")
await vikaru.newsletterUpdateName("xxxx@newsletter", "New Name")
await vikaru.newsletterUpdatePicture("xxxx@newsletter", buffer)
await vikaru.newsletterRemovePicture("xxxx@newsletter")
await vikaru.newsletterUnfollow("xxxx@newsletter")
await vikaru.newsletterFollow("xxxx@newsletter")
await vikaru.newsletterUnmute("xxxx@newsletter")
await vikaru.newsletterMute("xxxx@newsletter")
await vikaru.newsletterCreate("Name", "Description", buffer)
await vikaru.newsletterAdminCount("xxxx@newsletter")
await vikaru.newsletterChangeOwner("xxxx@newsletter", "xxxx@s.whatsapp.net")
await vikaru.newsletterDemote("xxxx@newsletter", "xxxx@s.whatsapp.net")
await vikaru.newsletterDelete("xxxx@newsletter")
await vikaru.newsletterReactMessage("xxxx@newsletter", "175", "🥳")
// For more details, you can visit the file (./lib/Socket/newsletter.js)
```

---

### AI Message Icon Customization

```ts
await vikaru.sendMessage(id, {
    text: "Hello with AI!",
    ai: true
});
```
---

### Send Album Message

```ts
await vikaru.sendMessage(id, {
    album: [
        {image: {url: "https://example.com/image1.jpg"}},
        {image: {url: "https://example.com/image2.jpg"}},
        {video: {url: "https://example.com/video.mp4"}}
    ],
    caption: "Album test"
});
```

---

### Button and Interactive Message Management

```ts
await vikaru.sendMessage(id, {
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

        // Copy button
        {
            name: "quick_copy",
            buttonParamsJson: JSON.stringify({
                display_text: "Copy Text",
                id: "copy_id_1",
                copy_code: "HELLO-12345"
            })
        },

        // URL button
        {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: "Visit Website",
                url: "https://example.com"
            })
        },

        // Call button
        {
            name: "cta_call",
            buttonParamsJson: JSON.stringify({
                display_text: "Call Now",
                phone_number: "+6289508899033"
            })
        },

        // Copy button
        {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
                display_text: "Copy Coupon",
                copy_code: "DCODEMAXZ2025"
            })
        }
    ]
}, { quoted: null });

// ------------------------------------------------------------------- //

await vikaru.sendMessage(id, {
    title: "❏ *`SELECT ITEMS`*",
    text: "Please select one of the following:",
    footer: "© dcodemaxz baileys",
    // image: { url: "https://example.com/shop.jpg" },

    interactiveButtons: [
        {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
                title: "Choose Item",
                sections: [
                    {
                        title: "🛒 Category 1",
                        highlight_label: "Recommended",
                        rows: [
                            {
                                header: "Item A",
                                title: "Buy Item A",
                                description: "Description for Item A",
                                id: "buy_a"
                            },
                            {
                                header: "Item B",
                                title: "Buy Item B",
                                description: "Description for Item B",
                                id: "buy_b"
                            }
                        ]
                    },
                    {
                        title: "🎁 Category 2",
                        rows: [
                            {
                                header: "Item C",
                                title: "Buy Item C",
                                description: "Description for Item C",
                                id: "buy_c"
                            }
                        ]
                    }
                ]
            })
        }
    ]
}, { quoted: null });

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
