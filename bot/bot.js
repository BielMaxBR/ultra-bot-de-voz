import { SapphireClient } from '@sapphire/framework'
import { joinVoiceChannel } from "@discordjs/voice"

var connection

const client = new SapphireClient({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES']
})

client.on('ready', _ => {
    console.log("começou")
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