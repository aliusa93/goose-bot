const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
    GuildId: String,
    ChannelId: String,
})

module.exports = mongoose.model('logChannels', channelSchema)