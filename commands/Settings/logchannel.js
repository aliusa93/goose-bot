const logSchema = require('../../db/models/log-schema')

module.exports = {
    name: 'logchannel',
    async execute(message, args, client) {
        if(!message.member.permissions.has('ADMINSTRATOR')) return message.channel.send('You must have the ADMINSTRATOR permission to run this command!')
        const channel = message.mentions.channels.first()
        if(!channel) return message.channel.send('Please specify a channel.')

        const data = await logSchema.findOne({
            GuildId: message.guild.id,
        });

        if(!data) {
            const data = new logSchema({
                GuildId: message.guild.id,
                ChannelId: channel.id
            });
            data.save()
            message.channel.send(`Upated log channel to ${channel}`)
        } else {
            await logSchema.deleteOne({
                GuildId: message.guild.id,
            });

            const data = new logSchema({
                GuildId: message.guild.id,
                ChannelId: channel.id
            });
            data.save()
            message.channel.send(`Updated log channel to ${channel}`)
        }
    }
}