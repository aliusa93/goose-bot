const db  = require("../../db/models/warn-schema");



module.exports = {
    name: 'delwarn',
    description: 'Deletes users warnings.',
    async execute(message, args, client) {
        if(!message.member.permissions.has('ADMINSTRATOR')) return;
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('Please specify a user.')
        db.findOne({ guildId: message.guild.id, user:user.user.id}, async (err, data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send('Deleted the warn.')
                data.save()

            } else{
                message.channel.send('This user does not have any warns in this server!')
            }
        })

    }
}