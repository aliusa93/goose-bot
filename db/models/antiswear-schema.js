const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    GuildId: String,
    Words: Array,
})

module.exports = mongoose.model('antiswear', Schema)