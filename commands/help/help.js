const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')


module.exports = {
    name: 'help',
    description: 'Displays all commands with a selection menu!',
    async execute(message, client) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('help-menu')
                .setPlaceholder('Please choose a category to list the commands for.')
                .addOptions([
                    {
                        label: 'Misc',
                        description: 'Misc commands!',
                        value: 'Misc',
                        emoji: '😀'
                    },{
                        label: 'Moderation',
                        description: 'Moderation commands!',
                        value: 'Moderation',
                        emoji: '👮'
                    }, {
                        label: 'Economy',
                        description: 'Economy commands!',
                        value: 'Economy',
                        emoji: '💰'
                    }
                ])
        
        )
        message.channel.send({ content: 'Help Selection Menu', components:[row] })
    }
}