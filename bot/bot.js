import { Client, Intents } from "discord.js"

import readyEvent from "./events/ready.event.js"
import interactionCreateEvent from "./events/interactionCreate.event.js"


const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
})

client.on('ready', readyEvent)
client.on('interactionCreate', interactionCreateEvent);

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