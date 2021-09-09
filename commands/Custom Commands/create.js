const schema = require('../../db/models/commands-schema')

module.exports = {
    name: 'create',
    description: 'Creates a custom command!',
    async execute(message, args, client) {
        const name = args[0]?.toLowerCase()
        const response = args.slice(1).join(' ')

        if(!name) return message.channel.send('Please specify a command name!')

        if(typeof name !== 'string') return message.channel.send('Custom commands cannot be numbers!')
        if(!response) return message.channel.send('Please specify a command name!')

        const data  = await schema.findOne({ GuildId: message.guild.id, Command: name })
        if(data) return message.channel.send('This custom command already exists.')
        const newData = new schema({
            GuildId: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(`Saved **${name}** as a custom command!`)
    }
}