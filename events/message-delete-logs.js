const Discord = require('discord.js')
const logSchema = require('../db/models/log-schema')


module.exports = {
	name: 'messageDelete',
	async execute(message, client) {

        const data = await logSchema.findOne({
            GuildId: message.guild.id,
        })
        
        if(!data) return;
        let channel = client.channels.cache.get(data.ChannelId)

        const embed = new Discord.MessageEmbed()
        .setTitle('Message Deleted')
        .setColor('DARK_RED')
        .setAuthor(`${message.author.tag}`)
        .setDescription(`Deleted Message: ${message}`)

        channel.send({ embeds: [embed] })
    }
}