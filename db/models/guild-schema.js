const mongoose = require('mongoose')

const guildSchema = new mongoose.Schema({
    guildId: String,
    lastEdited: String,
    prefix: { type: String, default: "!"},
    muteRoleID: {type: String, required: false},
    memberRoleID: {type: String, required: false},
    welcomeChannel: {type: String, required: false},
    text: {type: String, required: false,}
})

module.exports = new mongoose.model('Guild', guildSchema, 'guilds')