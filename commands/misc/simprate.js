const random = require('discord-randomizers')


module.exports = {
    name: 'simprate',
    description: 'Checks your simprate, or someone elses.',
    execute (message) {
        const rate = random.randomNum(100)
        const target = message.mentions.members.first() || message.author

        message.channel.send(`${target} is ${rate} percent simp.`)
    }
}