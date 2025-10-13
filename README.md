# <div align='center'>Baileys Modified | Beta test</div>

<div align="center">

  <img src="https://raw.githubusercontent.com/dcodemaxz/Vikaru-Bot/refs/heads/main/image.png" />

  <a href="https://github.com/dcodemaxz/baileys">
    <img src="https://img.shields.io/github/package-json/v/dcodemaxz/baileys?color=red&label=Version&logo=github" alt="GitHub version" />
  </a>

  <a href="https://chat.whatsapp.com/GlNdk54lm9V7C4U54SXnh1">
    <img src="https://img.shields.io/badge/WhatsApp-Channel-25D366?logo=whatsapp&logoColor=white" alt="WhatsApp Channel" />
  </a>

</div>


## 📝 Important Note

This is a **custom Baileys build** by [dcodemaxz](https://github.com/dcodemaxz), based on [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys).  
This version includes several improvements, enhanced performance, and TypeScript compatibility.
> 🔥 This Baileys is intended to support the [Vikaru-Bot](https://github.com/dcodemaxz/Vikaru-Bot) project

### ⚡ Thaks to
- @whiskeysockets
- @baileys-mod
- @yupra

---

## 📖 Table of Contents

- [Important Note](#📝-important-note)
- [Added Features and Improvements](#✨-added-features-and-improvements)
- [Installation](#📥-installation)
- [Quick Example](#🚀-quick-example)
- [Advanced Usage (Multi-file Auth)](#🧪-advanced-usage-multi-file-auth)
- [Feature Examples](#🧩-feature-examples)
  - [Newsletter Management](#newsletter-management)
  - [Button and Interactive Message Management](#button-and-interactive-message-management)
  - [Send Album Message](#send-album-message)
  - [AI Message Icon Customization](#ai-message-icon-customization)
  - [Custom Pairing Code Generation](#custom-pairing-code-generation)
- [Reporting Issues](#🪲-reporting-issues)
- [Disclaimer](#⚠️-disclaimer)
- [License](#📄-license)

---

## ✨ Added Features and Improvements

| Feature                              | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
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

## 🚀 Quick Example

```ts
import makeWASocket, { getSenderLid, toJid } from 'baileys'

const sock = makeWASocket({ printQRInTerminal: true })

sock.ev.on('messages.upsert', ({ messages }) => {
    const msg = messages[0]
    const info = getSenderLid(msg) //log
    const jid = toJid(info.lid)
    console.log('normalized jid:', jid)
})
```

---

## 🧪 Advanced Usage (Multi-file Auth)

```ts
import makeWASocket, { useMultiFileAuthState } from 'baileys'

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    const sock = makeWASocket({ auth: state, printQRInTerminal: true })

    sock.ev.on('creds.update', saveCreds)
    sock.ev.on('messages.upsert', ({ messages }) => {
        for (const m of messages) console.log(m.key.remoteJid, m.message?.conversation)
    })
}

start()
```

---

## 🧩 Feature Examples


### Custom Pairing Code Generation

```ts
if (usePairingCode && !sock.authState.creds.registered) {
    const phoneNumber = await question('Enter your phone number:\n');
    const customCode = 'MAXZBAIL';
    const code = await sock.requestPairingCode(phoneNumber, customCode);
    console.log(`Your Pairing Code: ${code?.match(/.{1,4}/g)?.join('-') || code}`);
}
```

---

### Newsletter Management

```ts
const metadata = await sock.newsletterMetadata('invite', 'xxxxx')
await sock.newsletterUpdateDescription('abcd@newsletter', 'New Description')
await sock.newsletterUpdatePicture('abcd@newsletter', buffer)
await sock.newsletterMute('abcd@newsletter')
await sock.newsletterFollow('abcd@newsletter')
await sock.newsletterReactMessage('abcd@newsletter', '175', '🥳')
```

---

### Button and Interactive Message Management

```ts
const buttons = [
  { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
  { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 }
]

const buttonMessage = {
  image: { url: 'https://example.com/image.jpg' },
  caption: 'Hello from baileys!',
  footer: 'dcodemaxz baileys',
  buttons,
  headerType: 1
}

await sock.sendMessage(id, buttonMessage)
```

---

### Send Album Message

```ts
const media = [
  { image: { url: 'https://example.com/image1.jpg' } },
  { image: { url: 'https://example.com/image2.jpg' } },
  { video: { url: 'https://example.com/video.mp4' } }
]

await sock.sendMessage(id, { album: media, caption: 'Album test' })
```

---

### AI Message Icon Customization

```ts
await sock.sendMessage(id, { text: 'Hello with AI flair!', ai: true });
```

## 🪲 Reporting Issues

If you encounter bugs or need help, please open an issue on the [GitHub repository](https://github.com/dcodemaxz/baileys/issues).

---

## ⚠️ Disclaimer

This project is not affiliated with WhatsApp Inc.\
Use it responsibly. Avoid spam, abuse, or illegal activity.

---

## 📄 License

MIT © 2025 [dcodemaxz](LICENSE)
