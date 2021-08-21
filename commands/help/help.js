const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu
} = require('discord.js')

module.exports = {
    name: 'help',
    async execute(message) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId('help-menu')
                .setPlaceholder('Please choose a category to list the commands for.')
                .addOptions([{
                    label: 'Misc',
                    description: 'Misc commands!',
                    value: `Here are a list of the **misc** category commands: ping, help, simprate, wiki`,
                    emoji: '😀'
                }, {
                    label: 'Moderation',
                    description: 'Moderation commands!',
                    value: 'Here are a list of the **moderation** category commands: ban, kick, settings.',
                    emoji: '👮'
                }, {
                    label: 'Economy',
                    description: 'Economy commands!',
                    value: 'Here are a list of the **economy** category commands: balance, deposit, rob, withdraw, work, leaderboard.',
                    emoji: '💰'
                }])


            )


        const filter = (interaction) => interaction.isSelectMenu() && message.author.id;


        const collector = message.channel.createMessageComponentCollector({
            filter,
            max: '6',
            time: 10000,
        })

        collector.on('collect', async (collected) => {
            const value = collected.values[0]

            collected.deferUpdate()



            collected.channel.send({
                content: value
            })
        })
        message.reply({
            content: 'Below is the help menu, after a certain amount of time, the dropdown will stop working.',
            components: [row]
        })
    }
}