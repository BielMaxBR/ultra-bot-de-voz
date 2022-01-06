import { SlashCommandBuilder } from "@discordjs/builders";

const command = {
    builder: new SlashCommandBuilder()
        .setName('test')
        .setDescription('teste desse bagulho')
        .addStringOption(option => option.setName('input').setDescription('bote uma string').setRequired(true)),
        

    run: (interaction) => {
        var text = interaction.options.get('input').value
        var newtext = text.split('').map(char => `:regional_indicator_${char}:`).join(' ')

        interaction.reply(newtext)
    }
}
export default command