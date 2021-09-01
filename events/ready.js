const Schema = require('../db/models/antiswear-schema')

module.exports = {
    name: 'ready',
    async execute(client) {
        console.log(`${client.user.tag} is online!`)

        Schema.find().then(((data) => {
            data.forEach((val) => {
                client.words.set(val.GuildId, val.Words)
            })
        }))
    }
}