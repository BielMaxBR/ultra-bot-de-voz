import { Routes } from "discord-api-types/v9"
import { REST } from "@discordjs/rest"

import { config } from "dotenv"
config()

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

export default client => {
    let commands = []
    
    client.commands.forEach((value) => {
        commands.push(value.toJSON())
    })
}