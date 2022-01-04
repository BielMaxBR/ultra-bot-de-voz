import { SlashCommandBuilder } from "@discordjs/builders";

const command = {
    builder: new SlashCommandBuilder()
        .setName('github')
        .setDescription('github desse bagulho'),

    run: (interaction) => {
        interaction.reply("https://github.com/BielMaxBR/ultra-bot-de-voz")
    }
}
export default command