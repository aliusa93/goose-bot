const Discord = require('discord.js')
const logSchema = require('../db/models/log-schema')


module.exports = {
	name: 'channelCreate',
	async execute(channel, client) {

        const data = await logSchema.findOne({
            GuildId: channel.guild.id,
        })
        
        if(!data) return;
        let logchannel = client.channels.cache.get(data.ChannelId)

        const embed = new Discord.MessageEmbed()
        .setTitle('Channel Created')
        .setColor('GREEN')
        .setDescription(`Channel Created ${channel}`)

        logchannel.send({ embeds: [embed] })
    }
}