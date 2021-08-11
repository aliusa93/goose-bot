const axios = require('axios')

module.exports = {
    name: 'cat',
    description: 'Gets cat picture from API!',
    cooldown: 3,
    async execute(message) {
        axios.get('https://api.thecatapi.com/v1/images/search')
        .then((res) => {
            message.reply(`Here is your cat! ${res.data[0].url}`)
        })
        .catch((err) => {
            console.error('ERR:', err)
        })
    }
}