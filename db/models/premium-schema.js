const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    GuildId: String,
    Expire: Number,
    Permanent: Boolean,
})

module.exports = new mongoose.model('premium-guilds', Schema)