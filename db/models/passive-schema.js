const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    GuildId: String,
    UserId: String,
    Passive: Boolean,
})

module.exports = new mongoose.model('passive', Schema)