const Discord = require('discord.js')
const logSchema = require('../db/models/log-schema')


module.exports = {
	name: 'messageUpdate',
	async execute(oldMessage, newMessage, client) {

        const data = await logSchema.findOne({
            GuildId: oldMessage.guild.id,
        })
        
        if(!data) return;
        let channel = client.channels.cache.get(data.ChannelId)

        const embed = new Discord.MessageEmbed()
        .setTitle('Message Update')
        .setColor('BLUE')
        .setAuthor(`${oldMessage.author.tag}`)
        .setDescription(`The old message: ${oldMessage}\n The new message: ${newMessage}`)

        channel.send({ embeds: [embed] })
    }
}