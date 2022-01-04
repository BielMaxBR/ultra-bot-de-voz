export default async (interaction) => {
    console.log(interaction)

    if (interaction.type != "APPLICATION_COMMAND") return

    try {
        const name = interaction.commandName
        const client = interaction.client
        const command = client.commands.get(name)
        console.log(client.commands)
        command.run(interaction, client)
        // interaction.client.commands[interaction.commandName].run(interaction)
    } catch(err) {
        console.log(err)
    }
}