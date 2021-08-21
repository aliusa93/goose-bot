const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cringe')
    .setDescription('Cringe yes.'),
   async execute(interaction) {
        await interaction.reply('https://www.youtube.com/channel/UCLoLMshdUJrYqqNGHzVy9CA')
    }
}