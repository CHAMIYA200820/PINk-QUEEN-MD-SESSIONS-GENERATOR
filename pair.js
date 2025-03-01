const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const {
    default: Gifted_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("maher-zubair-baileys");

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    
    async function GIFTED_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);

        try {
            let Pair_Code_By_Gifted_Tech = Gifted_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: ["Chrome (Linux)", "", ""]
            });

            if (!Pair_Code_By_Gifted_Tech.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_Gifted_Tech.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_Gifted_Tech.ev.on('creds.update', saveCreds);
            Pair_Code_By_Gifted_Tech.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Pair_Code_By_Gifted_Tech.sendMessage(Pair_Code_By_Gifted_Tech.user.id, { text: '' + b64data });

                    let imageURL = "https://raw.githubusercontent.com/ransika2008/Img-2/refs/heads/main/High-resolution%203D%20render%2C%20silhouetted%20backlighting%2C%20soft%20dreamy%20atmosphere.%20Embossed%20gold%20text%20PINK%20QUEEN%20MD%20and%20CONNECTED%20SUCCESSFUL.%20Pastel%20rose%20pink%20background%2C%20golden%20crown%20and%20baroque%20flourishes.%20Hazy%2C%20soft%20light%2C%20light%20source%20behind%20subject.jpg";

                    let GIFTED_MD_TEXT = `
┏━━━━━━━━━━━━━━
┃✨ 𝙋𝙄𝙉𝙆-𝙌𝙐𝙀𝙀𝙉 𝙎𝙀𝙎𝙎𝙄𝙊𝙉𝙎 ✨
┃💙 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋 💙
┗━━━━━━━━━━━━━━━
🔹 𝘾𝙧𝙚𝙖𝙩𝙤𝙧: *𝐂𝐇𝐀𝐌𝐈𝐍𝐃𝐔*
🔹 𝘠𝘰𝘶𝘵𝘶𝘣𝘦: [Pink Queen MD](https://youtube.com/@pinkqueenmd?si=1rET_h_GijRWIryA)
🔹 𝘚𝘶𝘱𝘱𝘰𝘳𝘵 𝘊𝘩𝘢𝘯𝘯𝘦𝘭: [WhatsApp Channel](https://whatsapp.com/channel/0029Vb0rCUr72WU3uq0yMg42)
🔹 𝘊𝘰𝘯𝘵𝘢𝘤𝘵 𝘮𝘦: [Click Here](http://wa.me/94783314361?)
┗━━━━━━━━━━━━━━━
🌟 _𝐃𝐨𝐧'𝐭 𝐅𝐨𝐫𝐠𝐞𝐭 𝐓𝐨 𝐆𝐢𝐯𝐞 𝐒𝐭𝐚𝐫 𝐓𝐨 𝐌𝐲 𝐑𝐞𝐩𝐨_ 🌟`;

                    await Pair_Code_By_Gifted_Tech.sendMessage(Pair_Code_By_Gifted_Tech.user.id, {
                        image: { url: imageURL },
                        caption: GIFTED_MD_TEXT
                    }, { quoted: session });

                    await delay(100);
                    await Pair_Code_By_Gifted_Tech.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("Service restarted");
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "Service Unavailable" });
            }
        }
    }
    return await GIFTED_MD_PAIR_CODE();
});

module.exports = router;
