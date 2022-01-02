import { Intents } from "discord.js"
import Client from "./classes/Client.class.js"
import dotenv from 'dotenv'
dotenv.config()

import { dirname } from "dirname-filename-esm"
import reloadCommandsUtils from "./utils/reloadCommands.utils.js"
const __dirname = dirname(import.meta)

const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
})


const loadedCommands = client.loadCommands('commands', __dirname)
const loadedEvents = client.loadEvents('events', __dirname)

Promise.all([loadedCommands, loadedEvents]).then(_ => {
    reloadCommandsUtils(client)
})
// client.on('messageCreate', message => {
//     // console.log(message.member.voice)
//     if (message.content == "entre") {
//         const channel = message.member.voice.channel
//         if (connection != null) return

//         connection = joinVoiceChannel({
//             channelId: channel.id,
//             guildId: channel.guild.id,
//             adapterCreator: channel.guild.voiceAdapterCreator,
//         });

//         connection.receiver.speaking.on('start', id => {
//             const member = message.guild.members.cache.get(id)
//             console.log(`${member.user.username} ta falando, aquele cuzão`)
//         })
//         connection.receiver.speaking.on('end', id => {
//             const member = message.guild.members.cache.get(id)
//             console.log(`${member.user.username} parou de falar, aquele merda`)
//         })
//     }



// })

export default client