const custom = require('../db/models/commands-schema')


module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        const data = await custom.findOne({ GuildId: message.guild.id, Command: message.content.toLowerCase() })
        if(!data) return;
		if(message.content.includes(data.Command)) message.channel.send(data.Response)
    }
}