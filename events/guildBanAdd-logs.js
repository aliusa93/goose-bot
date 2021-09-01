const Discord = require('discord.js');
const logSchema = require('../db/models/log-schema')


module.exports = {
	name: 'guildBanAdd',
	async execute(ban, client) {

        const data = await logSchema.findOne({
            GuildId: ban.guild.id,
        })
        
        if(!data) return;
        let channel = client.channels.cache.get(data.ChannelId)

        let embed;

        if(ban.reason) {
        embed = new Discord.MessageEmbed()
        .setTitle('Member Banned')
        .setColor('RED')
        .setAuthor(`${ban.user.tag}`)
        .setDescription(`The user ${ban.user.tag} has been banned for ${ban.reason}`)
        } else {
        embed = new Discord.MessageEmbed()
        .setTitle('Member Banned')
        .setColor('RED')
        .setAuthor(`${ban.user.tag}`)
        .setDescription(`The user ${ban.user.tag} has been banned. No reason specified.`)
        }

    
        channel.send({ embeds: [embed] })
    }
}