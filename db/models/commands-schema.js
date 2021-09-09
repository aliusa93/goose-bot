const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    GuildId: String,
    Command: String,
    Response: String,
})

module.exports = new mongoose.model('custom-commands', Schema)