const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Shows information about the bot'),
    async execute (interaction) {
        const embed  = new MessageEmbed()
        .setTitle('About Goose Bot')
        .setDescription('Thank you for using goose bot! Information is below')
        .setColor('RANDOM')
        .addFields([{
            name: 'Creator',
            value: 'Sensei Goose'
        }, {
            name: 'Website',
            value: 'Coming..... ||Not Soon||'
        }, {
            name: 'News',
            value: 'Goose bot will be switching to slash commands on <t:1641358800>'
        }])

        await interaction.reply({ embeds: [embed] })

    }
}