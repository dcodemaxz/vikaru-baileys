# <div align='center'>Baileys Modified | Beta test</div>

<div align="center">

  <img src="https://raw.githubusercontent.com/dcodemaxz/Vikaru-Bot/refs/heads/main/media/image.png" />

  <a href="https://github.com/dcodemaxz/baileys">
    <img src="https://img.shields.io/github/package-json/v/dcodemaxz/baileys?color=red&label=Version&logo=github" alt="GitHub version" />
  </a>

  <a href="https://chat.whatsapp.com/GlNdk54lm9V7C4U54SXnh1">
    <img src="https://img.shields.io/badge/WhatsApp-Comunity-25D366?logo=whatsapp&logoColor=white" alt="WhatsApp Comunity" />
  </a>

</div>


## 📝 Important Note

This is a **custom Baileys build** by [dcodemaxz](https://github.com/dcodemaxz), based on [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys).  
This version includes several improvements, enhanced performance, and TypeScript compatibility.

> 🔥 This Baileys is intended to support the [Vikaru-Bot](https://github.com/dcodemaxz/Vikaru-Bot) project

<details>
<summary>⚡ Thanks to</summary>

- @whiskeysockets  
- @nstar-y/bail  
- @whileys  

</details>

---

## 📖 Table of Contents

- [Important Note](#📝-important-note)
- [Added Features and Improvements](#✨-added-features-and-improvements)
- [Installation](#📥-installation)
- [Anti Duplicate Id](#🚀-quick-example-anti-duplicate-messages)
- [Advanced Usage (index.js)](#🧪-advanced-usage-indexjs)
- [Feature Examples](#🧩-feature-examples)
  - [Newsletter Management](#newsletter-management)
  - [AI Message Icon Customization](#ai-message-icon-customization)
  - [Send Album Message](#send-album-message)
  - [Button and Interactive Message Management](#button-and-interactive-message-management)
- [Reporting Issues](#🪲-reporting-issues)
- [Disclaimer](#⚠️-disclaimer)
- [License](#📄-license)

---

## ✨ Added Features and Improvements

| Feature                              | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| 🚫 **Anti-duplicate messages**     | Solution to overcome duplicate incoming message id        |
| 💬 **Send Messages to Channels**     | Supports text & media messages to WhatsApp channels        |
| 🔘 **Button & Interactive Messages** | Full interactive support for WhatsApp Messenger & Business |
| 🖼️ **Send Album Messages**          | Send grouped media (album style) with caption support      |
| 👥 **Group with LID Support**        | Enhanced support for `@lid` and `@jid` identifiers         |
| 🤖 **AI Message Icon**               | Add AI-styled icons to your bot replies                    |
| 🖼️ **Full-Size Profile Pictures**   | Upload HD profile pictures without cropping                |
| 🔑 **Custom Pairing Codes**          | Generate and use your own pairing codes                    |
| 🛠️ **Libsignal Fixes**              | Clean console logs and improved stability                  |
| ⚙️ **Multi-file Auth Support**       | Built-in multi-file auth like official Baileys             |
| 📈 **Optimized Performance**         | Rewritten modules for faster connection and retries        |

---

## 📥 Installation

Install in package.json:

```bash
"dependencies": {
    "baileys": "github:dcodemaxz/baileys"
}

```

or install in terminal:

```bash
npm install baileys@github:dcodemaxz/baileys
```

---


## 🚀 Quick Example (Anti-duplicate messages)

```ts
// Duplicate message ( cached )
const duplicateMsg = new Set();

vikaru.ev.on('messages.upsert', ({ messages }) => {
    const msg = messages[0]

    // Stop execution if the same ID is detected
    if (duplicateMsg.has(msg.key.id)) {
      console.log(`[ Skip Duplicate-Id ] ▸ ${msg.key.participant || msg.key.remoteJid} | ${msg.key.id}`);
      return;
    };

    // Save all ids to cached
    duplicateMsg.add(msg.key.id);

    // Delete saved id after 10 seconds
    setTimeout(() => duplicateMsg.delete(msg.key.id), 10000);
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
    const { state, saveCreds } = await useMultiFileAuthState('./session/')
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
        const customCode = 'MAXZBAIL';
        const code = await vikaru.requestPairingCode(phoneNumber, customCode);
        console.log(`Your Pairing Code: ${code?.match(/.{1,4}/g)?.join('-') || code}`);
    }

    // Save credentials after connecting
    vikaru.ev.on('creds.update', saveCreds)

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
                console.log(`\n› [ ${chalk.black(chalk.bgYellow(" Reconnecting "))} ] ▸ Connection Lost From Server...`);
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
    vikaru.ev.on('messages.upsert', ({ messages }) => {
        const msg = messages[0]

        // Stop execution if the same ID is detected
        if (duplicateMsg.has(msg.key.id)) {
          console.log(`[ Skip Duplicate-Id ] ▸ ${msg.key.participant || msg.key.remoteJid} | ${msg.key.id}`);
          return;
        };

        // Save all ids to cached
        duplicateMsg.add(msg.key.id);

        // Delete saved id after 10 seconds
        setTimeout(() => duplicateMsg.delete(msg.key.id), 10000);

        console.log(msg.key.remoteJid, msg.message?.conversation)
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
const metadata = await vikaru.newsletterMetadata('invite', 'xxxx')
await vikaru.newsletterUpdateDescription('xxxx@newsletter', 'New Description')
await vikaru.newsletterUpdatePicture('xxxx@newsletter', buffer)
await vikaru.newsletterMute('xxxx@newsletter')
await vikaru.newsletterFollow('xxxx@newsletter')
await vikaru.newsletterReactMessage('xxxx@newsletter', '175', '🥳')
```

---

### AI Message Icon Customization

```ts
await vikaru.sendMessage(id, {
    text: 'Hello with AI!',
    ai: true
});
```
---

### Send Album Message

```ts
await vikaru.sendMessage(id, {
    album: [
        {image: {url: 'https://example.com/image1.jpg'}},
        {image: {url: 'https://example.com/image2.jpg'}},
        {video: {url: 'https://example.com/video.mp4'}}
    ],
    caption: 'Album test'
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

If you encounter bugs or need help, please open an issue on the [GitHub repository](https://github.com/dcodemaxz/baileys/issues).

---

## ⚠️ Disclaimer

This project is not affiliated with WhatsApp Inc.\
Use it responsibly. Avoid spam, abuse, or illegal activity.

---

## 📄 License

MIT © 2025 [dcodemaxz](LICENSE)
