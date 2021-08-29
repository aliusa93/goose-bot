const Discord = require('discord.js')
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: 'setitems',
    async execute(message, args, client) {
        cs.setItems({
            guild: message.guild,
            shop: [{
                name: 'Watch',
                price: 20
            }, {
                name: 'Rolex',
                price: 1230
            }]
        }).then(console.log)

        message.channel.send('Set.')
    
    }
}