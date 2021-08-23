const db  = require("../../db/models/warn-schema");



module.exports = {
    name: 'clearwarns',
    description: 'Clear users warnings.',
    async execute(message, args, client) {
        if(!message.member.permissions.has('ADMINSTRATOR')) return;
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('Please specify a user.')

        db.findOne({ guildId: message.guild.id, user:user.user.id}, async (err, data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user: user.user.id, guildId: message.guild.id})
            } else {
                message.channel.send('This user does not have any warns.')
            }
        })
    }
}