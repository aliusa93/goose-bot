const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    name: 'help',
    description: 'A link to this website where you can see the commands!',
    async execute(message, args, client) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setEmoji('😀')
            .setLabel('Click on this for the help menu!')
            .setStyle('LINK')
            .setURL('https://goose-bot-backup.herokuapp.com/commands')
        )

        message.reply({ content: 'Click on the button below to go to a website with commands!', components: [row] })
    }
}