const axios = require('axios')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Fetches a cat picture from an API!'),
    async execute (interaction) {
        axios.get('https://api.thecatapi.com/v1/images/search')
        .then((res) => {
            interaction.reply(`Here is your cat! ${res.data[0].url}`)
        })
    }
}