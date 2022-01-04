import { Routes } from "discord-api-types/v9"
import { REST } from "@discordjs/rest"

import { config } from "dotenv"
config()

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

export default async client => {
    let commands = []

    client.commands.forEach((value) => {
        commands.push(value.builder.toJSON())
        console.log('carregando comando:', Object.keys(value))
    });

    console.log(commands)

    try {
        console.log('recarregando comandos no client');

        // console.log(await rest.get(
        //     Routes.applicationCommands(process.env.CLIENTID)
        // ))

        console.log(await rest.put(
            Routes.applicationCommands(process.env.CLIENTID),
            { body: commands },
        ))

        console.log('comandos recarregados no client');
    } catch (error) {
        console.error(error);
    }

}