const mongoose = require('mongoose')
const Guild = require('../../db/models/guild-schema')



module.exports = {
    name: 'prefix',
    description: 'Allows the server owner to change the guild ',
    async execute(message, args, client) {
        //settings
        let guildProfile = await Guild.findOne({
            guildId: message.guild.id
        })
        if (!guildProfile) {
            guildProfile = await new Guild({
                guildId: message.guild.id
            })
            await guildProfile.save().catch(err => console.error(err))
        }
        if (!args.length) {
            message.reply(`My prefix for this server is ${guildProfile.prefix}`)

        } else {
            if (!args[0]) return message.channel.send('Please specify a prefix!')
            await Guild.findOneAndUpdate({
                guildId: message.guild.id
            }, {
                prefix: args[0],
                lastEdited: Date.now()
            })
            message.channel.send(`Updated prefix to ${args[0]}`)

        }

    }





}