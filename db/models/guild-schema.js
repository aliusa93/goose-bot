const mongoose = require('mongoose')

const guildSchema = new mongoose.Schema({
    guildId: String,
    lastEdited: String,
    prefix: { type: String, default: "!"},
})

module.exports = new mongoose.model('Guild', guildSchema, 'guilds')