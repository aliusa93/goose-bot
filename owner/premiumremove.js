const schema = require('../db/models/premium-schema')


module.exports = {
    name: 'premiumremove',
    description: 'Removes guild from the premium system.',
    ownerOnly: true,
    async execute(message, args, client) {
        if(!args[0]) return;

        schema.findOne(
            {
                GuildId: message.guild.id
            }, 
            async(err, data) => {
            if(!data) 
                return message.reply(
                    'The id you have provided is not present in the database.'
                )
                data.delete()
                message.reply('Deleted data!')
            }
        )
    }
}