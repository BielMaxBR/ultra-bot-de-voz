import { Routes } from "discord-api-types/v9"
import { REST } from "@discordjs/rest"

import { config } from "dotenv"
config()

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

export default async client => {
    let commands = []

    client.commands.forEach((value) => {
        commands.push(value.builder.toJSON())
        console.log('carregando comando:', value.builder.name)
    });

    try {
        console.log('enviando comandos pro discord...');

        if (process.env.TEST) {

            // for (const command of await rest.get(
            //     Routes.applicationGuildCommands(process.env.CLIENTID, process.env.TESTSERVER)
            // )) {
            //     await rest.delete(
            //         Routes.applicationGuildCommand(process.env.CLIENTID, process.env.TESTSERVER, command.id)
            //     )
            // }

            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENTID, process.env.TESTSERVER),
                { body: commands },
            )
        } else {
            await rest.put(
                Routes.applicationCommands(process.env.CLIENTID),
                { body: commands },
            )
        }

        console.log('comandos enviados pro discord com sucesso');
    } catch (error) {
        console.error(error);
    }

}