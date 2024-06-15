import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { Client, GatewayIntentBits, TextChannel } from 'discord.js'
import dotenv from 'dotenv'
import express from 'express'
import { dbconect } from './config'
import { ENV } from './libs'
import routes from './routes'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Pastikan intent ini diaktifkan
    ]
});

const TARGET_GUILD_ID = '1190693773236240446'; // Ganti dengan ID server Anda
const TARGET_CHANNEL_ID = '1190693773685043272'; // Ganti dengan ID channel Anda

client.once('ready', () => {
    console.log('Bot is online!');
});


client.login("MTI1MTM3MTQ1NTM2MzY4MjMzNA.GYUsGB.l1XMEctITSgKd0W9VGKlNvbWL05ndX_yi2rz8Y");

const app = express()
const port = ENV.PORT || 8000
dotenv.config()
dbconect()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json())
app.use(routes)

app.post('/api/vercel-webhook', (req, res) => {
    const { type, payload } = req.body;

    let message;
    if (type === 'deployment') {
        switch (payload.state) {
            case 'READY':
                message = `Deployment ${payload.name} succeeded!`;
                break;
            case 'ERROR':
                message = `Deployment ${payload.name} failed with error: ${payload.errorMessage}`;
                break;
            case 'BUILDING':
                message = `Deployment ${payload.name} is building...`;
                break;
            default:
                message = `Deployment ${payload.name} is in state: ${payload.state}`;
                break;
        }
    }

    if (message) {
        const targetGuild = client.guilds.cache.get(TARGET_GUILD_ID);
        if (targetGuild) {
            const targetChannel = targetGuild.channels.cache.get(TARGET_CHANNEL_ID) as TextChannel
            if (targetChannel) {
                targetChannel?.send(message).catch(console.error);
            }
        }
    }

    res.status(200).send('Webhook received');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

export default app