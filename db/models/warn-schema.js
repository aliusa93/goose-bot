const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const Schema = new mongoose.Schema({
    guildId: reqString,
    user: reqString,
    content: Array
})

module.exports = mongoose.model('warns', Schema)