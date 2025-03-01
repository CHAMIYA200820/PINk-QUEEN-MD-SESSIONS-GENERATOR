const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');

const { makeid } = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const fs = require('fs');
const path = require('path');
const pino = require("pino");

const {
    default: Wasi_Tech,
    useMultiFileAuthState,
    Browsers,
    delay
} = require("@whiskeysockets/baileys");

let router = express.Router();

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();

    async function WASI_MD_QR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Qr_Code_By_Wasi_Tech = Wasi_Tech({
                auth: state,
                printQRInTerminal: false,
                logger: pino({ level: "silent" }),
                browser: Browsers.macOS("Desktop"),
            });

            Qr_Code_By_Wasi_Tech.ev.on('creds.update', saveCreds);
            Qr_Code_By_Wasi_Tech.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect, qr } = s;

                if (qr) {
                    let qrBuffer = await QRCode.toBuffer(qr, {
                        color: {
                            dark: "#FF1493", // Pink Foreground
                            light: "#000000" // Black Background
                        }
                    });
                    return res.end(qrBuffer);
                }

                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Qr_Code_By_Wasi_Tech.sendMessage(Qr_Code_By_Wasi_Tech.user.id, { text: b64data });

                    let TREX_MD_TEXT = `
┏━━━━━━━━━━━━━━
┃ PINk QUEEN MD SESSIONS
┃ ARE CONNECTED 💙🔵
┗━━━━━━━━━━━━━━━
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❶ || 𝐶𝑟𝑒𝑎𝑡𝑜𝑟 = CHAMINDU
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❷ || YouTube Channel = https://youtube.com/@pinkqueenmd?si=jNSo4MO0ZfxZ_NZT
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
📢 Support Channel: https://whatsapp.com/channel/0029Vb0rCUr72WU3uq0yMg42
📩 Wanna talk? http://wa.me/94783314361
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
© *PINk QUEEN MD* | _Do not share!_
_Don't Forget To Give Star To My Repo_
`;
                    await Qr_Code_By_Wasi_Tech.sendMessage(Qr_Code_By_Wasi_Tech.user.id, { text: TREX_MD_TEXT }, { quoted: session });

                    await delay(100);
                    await Qr_Code_By_Wasi_Tech.ws.close();
                    return removeFile("temp/" + id);
                } else if (connection === "close" && lastDisconnect?.error?.output?.statusCode !== 401) {
                    await delay(10000);
                    WASI_MD_QR_CODE();
                }
            });
        } catch (err) {
            if (!res.headersSent) {
                res.json({ code: "Service is Currently Unavailable" });
            }
            console.error("Error:", err);
            removeFile("temp/" + id);
        }
    }

    return WASI_MD_QR_CODE();
});

module.exports = router;
