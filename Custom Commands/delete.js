const schema = require('../../db/models/commands-schema')

module.exports = {
    name: 'delete',
    description: 'Deletes a custom command!',
    async execute(message, args, client) {
        const name = args[0]?.toLowerCase()

        if(!name) return message.channel.send('Please specify a command name!')

        const data  = await schema.findOne({ GuildId: message.guild.id, Command: name })
        if(!data) return message.channel.send('That custom command does not exist.')

        await schema.findOneAndDelete({ GuildId: message.guild.id, Command: name })
        message.channel.send(`Removed ***${name}***`)
    }
}