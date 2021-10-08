const { MessageEmbed } = require("discord.js");
const  db = require("../db/models/warn-schema");

module.exports = {
    name: 'warn',
    description: 'Warn command',
    async execute(message, args, client) {
        if(!message.member.permissions.has('ADMINISTRATOR')) return;

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User not found.')
        const reason = args.slice(1).join(' ')
        if(!reason) return message.channel.send('please specify a reason!')
        db.findOne({ guildId: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) console.error(err)
            if(!data) {
                data = new db({
                    guildId: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        } 
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        const embed1 = new MessageEmbed()
        .setDescription(`You have been warned in ${message.guild.name}`)
        .setColor('RED')

       user.send({ embeds: [embed1] })

       const embed2 = new MessageEmbed()
       .setDescription(`Warned user for ${reason}`).setColor('BLUE')

        message.channel.send({ embeds: [embed2] })

    }
}