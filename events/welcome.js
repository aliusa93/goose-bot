const Guild = require('../db/models/guild-schema')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        let guildProfile = await Guild.findOne({ guildId: message.guild.id })
        if (!guildProfile) {
            guildProfile = await new Guild({
                guildId: message.guild.id
            })
            await guildProfile.save().catch(err => console.error(err))

            const channel = guildProfile.welcomeChannel

            channel.send(`Welcome <@${member.id} to the server!`)
}
    }
}