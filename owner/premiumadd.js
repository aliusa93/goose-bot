const schema = require('../../db/models/premium-schema')

const day = require('dayjs')

module.exports = {
    name: 'premiumadd',
    description: 'Premium system!',
    ownerOnly: true,
    cooldown: 10,
    async execute(message, args, client) {
        if(!args[0]) return message.channel.send('Please specify a guild ID!')
        if(!client.guilds.cache.has(args[0])) return message.channel.send('Invalid guild ID!')

       
        schema.findOne({ GuildId: args[0] }, async(err, data) => {
            if(data) data.delete()

            if(args[1]) {
                const Expire = day(args[1]).valueOf()
                new schema({
                    GuildId: args[0],
                    Expire: 0,
                    Permanent: false,
                }).save()
            } else {
                new schema({
                    GuildId: args[0],
                    Expire: 0,
                    Permanent: true,
                }).save()
            }

            message.reply('Saved data!')
        })

    }
}