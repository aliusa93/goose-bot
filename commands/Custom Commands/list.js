const schema = require('../../db/models/commands-schema')
const {
    MessageEmbed
} = require('discord.js')


module.exports = {
    name: 'list',
    description: 'Lists custom commands!',
    async execute(message, args, client) {

        const data = await schema.find({
            GuildId: message.guild.id
        })
        if (!!data === false) return message.channel.send('There are no custom commands!')
         
        const embed = new MessageEmbed()
                .setTitle(`Custom Commands`)
                    .setDescription(
                        data.map(
                            (cmd, i) => 
                            `\`${i + 1}\`: ${cmd.Command}\n`
                        ).toString()
                    )
                    .setColor("BLUE")
                    message.channel.send({ embeds: [embed] })


        }
    }