const schema = require('../../db/models/passive-schema')

module.exports = {
    name: 'passive',
    description: 'Passive mode!',
    args: true,
    usage: 'on/off',
    async execute(message, args, client) {
        if (!['on', 'off'].includes(args[0])) {
            message.reply('Valid options: on/off.')
        }

        if (args[0] === 'off') {
            let offdata = await schema.findOne({
                GuildId: message.guild.id,
                UserId: message.author.id
            })
            if (!offdata) {
                offdata = await new schema({
                    GuildId: message.guild.id,
                    UserId: message.author.id
                })
                await offdata.save().catch(err => console.error(err))

            }

            await schema.findOneAndUpdate({
                GuildId: message.guild.id,
                UserId: message.author.id,
                
            },{
                Passive: false,
            })
            message.reply('Passive mode has been disabled!')
        } else if (args[0] === 'on') {
            let data = await schema.findOne({
                GuildId: message.guild.id,
                UserId: message.author.id
            })
            if (!data) {
                data = await new schema({
                    GuildId: message.guild.id,
                    UserId: message.author.id
                })
                await data.save().catch(err => console.error(err))

            }

            await schema.findOneAndUpdate({
                GuildId: message.guild.id,
                UserId: message.author.id,
                
            },{
                Passive: true,
            })


            message.reply('Passive mode has been enabled!')
        }
    }
}