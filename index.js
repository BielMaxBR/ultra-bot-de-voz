import { Client } from "discord.js"
import { joinVoiceChannel } from "@discordjs/voice"
import dotenv from 'dotenv'
import { lookup } from "dns"
dotenv.config()

var connection

const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES']
})

client.on('ready', _ => {
    console.log("começou")
})

client.on('messageCreate', message => {
    // console.log(message.member.voice)
    if (message.content == "entre") {
        const channel = message.member.voice.channel

        connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        connection.receiver.speaking.on('start', id => {
            const member = message.guild.members.cache.get(id)
            message.channel.send(`${member.user.username} ta falando, aquele cuzão`)
        })
        connection.receiver.speaking.on('end', id => {
            const member = message.guild.members.cache.get(id)
            message.channel.send(`${member.user.username} parou de falar, aquele merda`)
        })
    }



})

client.login(process.env.TOKEN)