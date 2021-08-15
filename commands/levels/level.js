const Levels = require('discord-xp')
const canvacord = require('canvacord')

module.exports = {
    name: 'level',
    guildOnly: true,
    description: 'Returns a level of the person stated.',
    async execute (message, args, client) {
        let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!mentionedMember) mentionedMember = message.member;

        const target = await Levels.fetch(mentionedMember.user.id, message.guild.id)
        if(!target) return message.reply('The member stated does not have any levels within the server.')

       try {
        message.reply(`${mentionedMember.user.tag} is level ${target.level} and has ${target.xp}/${Levels.xpFor(target.level + 1)}`)
       } catch (error) {
           console.error(error)
           message.channel.send('There was an error fetching levels for that user!')
       }
    }
}