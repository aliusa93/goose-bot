const { MessageEmbed } = require("discord.js")
const  db = require("../../db/models/warn-schema");

module.exports = {
    name: 'warns',
    description: 'Lists warns for a member.',
    args: true,
    usage: '<@Member OR ID>',
    async execute(message, args, client) {
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('You do not have permissions to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User not found.')
        const reason = args.slice(1).join(" ")
        db.findOne({ guildId: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                const embed = new MessageEmbed()
                .setTitle(`${user.user.tag}'s warns`)
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}\n`
                        ).toString()
                    )
                    .setColor("BLUE")
                    message.channel.send({ embeds: [embed] })
                
                        }  
        })
    }
}
