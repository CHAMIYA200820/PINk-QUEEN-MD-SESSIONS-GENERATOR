const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: Gifted_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("maher-zubair-baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
};
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    async function GIFTED_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
        try {
            let Pair_Code_By_Gifted_Tech = Gifted_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: ["Chrome (Linux)", "", ""]
            });
            if(!Pair_Code_By_Gifted_Tech.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g,'');
                const code = await Pair_Code_By_Gifted_Tech.requestPairingCode(num)
                if(!res.headersSent){
                    await res.send({code});
                }
            }
            Pair_Code_By_Gifted_Tech.ev.on('creds.update', saveCreds)
            Pair_Code_By_Gifted_Tech.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Pair_Code_By_Gifted_Tech.sendMessage(Pair_Code_By_Gifted_Tech.user.id, { text: '' + b64data });

                    // Image URL Added to the Session Confirmation Message
                    let image_url = "https://raw.githubusercontent.com/ransika2008/Img-2/refs/heads/main/High-resolution%203D%20render%2C%20silhouetted%20backlighting%2C%20soft%20dreamy%20atmosphere.%20Embossed%20gold%20text%20PINK%20QUEEN%20MD%20and%20CONNECTED%20SUCCESSFUL.%20Pastel%20rose%20pink%20background%2C%20golden%20crown%20and%20baroque%20flourishes.%20Hazy%2C%20soft%20light%2C%20light%20source%20behind%20subject.jpg";

                    let GIFTED_MD_TEXT = `
┏━━━━━━━━━━━━━━
┃MUSTAFFA SESSIONS
┃ARE
┃CONNECTED💙🔵
┗━━━━━━━━━━━━━━━
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❶ || 𝐶𝑟𝑒𝑎𝑡𝑜𝑟 = POPKID
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❷ || YouTube Channel = https://youtube.com/@mustaffamk?si=uJQhZ5skOWwnT2oh
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
Please Follow My Support Channel https://whatsapp.com/channel/0029VawBbI40AgWKACOjdm1T
Wanna talk? http://wa.me/254758755663?
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
©*MUSTAFFA KE*

_Don't Forget To Give Star To My Repo_`;

                    // Sending Image Along with Text
                    await Pair_Code_By_Gifted_Tech.sendMessage(Pair_Code_By_Gifted_Tech.user.id, {
                        image: { url: image_url },
                        caption: GIFTED_MD_TEXT
                    });

                    await delay(100);
                    await Pair_Code_By_Gifted_Tech.ws.close();
                    return await removeFile('./temp/'+id);
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/'+id);
            if(!res.headersSent){
                await res.send({code:"Service Unavailable"});
            }
        }
    }
    return await GIFTED_MD_PAIR_CODE()
});
module.exports = router;
