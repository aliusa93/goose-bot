const { SlashCommandBuilder } = require('@discordjs/builders')
const random = require('discord-randomizers')


 

module.exports = {
    data: new SlashCommandBuilder()
    .setName('epic-or-no')
    .setDescription('Is the person epic or no?')
    .addUserOption(option => option.setName('target').setDescription('Select a user')),
    async execute (interaction) {
        if(interaction.member.id === '435592949137539093') return await interaction.reply('ULTRA EPIK')
        const response = random.twoRandomStr('epic', 'no') 
        await interaction.reply(response.toString())
    }
}