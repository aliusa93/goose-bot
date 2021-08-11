const mongoose = require('mongoose')
const Guild = require('../../db/models/guild-schema')
const Discord = require('discord.js')

module.exports = {
    name: 'settings',
    description: 'Allows the server owner to change the guild settings!',
    async execute(message, args, client) {
        //settings
        let guildProfile = await Guild.findOne({ guildId: message.guild.id})
        if(!guildProfile) {
             guildProfile = await new Guild({
                guildId: message.guild.id
            })
            await guildProfile.save().catch(err => console.error(err))
        }
        if(!args.length) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`${message.guild.name}'s Settings:`)
                .setDescription(`If you are not seeing fields below this, it is because you have nothing assigned for the property!\nProperties: prefix, muteRoleID`)
                .setColor('RED')


            if (guildProfile.prefix) embed.addField(`Prefix`, guildProfile.prefix)
            if(guildProfile.muteRoleID) embed.addField(`Mute Role ID`, guildProfile.muteRoleID)
            if(guildProfile.muteRoleID) embed.addField(`Member Role ID`, guildProfile.memberRoleID)
            if(guildProfile.welcomeChannel) embed.addField(`Welcome Channel`, guildProfile.welcomeChannel)
            message.channel.send( {embeds: [embed]} )

        } else {
            if (!["prefix", "muteRoleID", "memberRoleID"].includes(args[0])) return message.channel.send('You must specify valid  setting to change! Settings: prefix, welcomeChannel.')
            if(!args[1]) return message.channel.send('You did not state a value to update that property to.')

            if("prefix" === args[0]) {
                await Guild.findOneAndUpdate({ guildId: message.guild.id}, { prefix: args[1], lastEdited: Date.now() })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)
            } else if ("muteRoleID" === args[0]) {
                await Guild.findOneAndUpdate({ guildId: message.guild.id}, { muteRoleID: args[1], lastEdited: Date.now() })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)
            } else if ("memberRoleID" === args[0]) {
                await Guild.findOneAndUpdate({ guildId: message.guild.id}, { memberRoleID: args[1], lastEdited: Date.now() })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)
            } else if ("welcomeChannel" === args[0]) {
                await Guild.findOneAndUpdate({ guildId: message.guild.id}, { welcomeChannel: message.channel.id, lastEdited: Date.now() })
                message.channel.send(`Updated welcome channel. Welcome messages will show here now!`)
            }
            
        }
    }
}