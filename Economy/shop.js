const Discord = require('discord.js')
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;


module.exports = {
    name: 'shop',
    async execute(message, args, client) {
        let result = await cs.getShopItems({
            guild: message.guild
        });
        let inv = result.inventory;
        const embed = new Discord.MessageEmbed()
            .setDescription('Shop!')
        for (let key in inv) {
            embed.addField(`${parseInt(key) + 1} - **${inv[key].name}:**`, `Price: ${inv[key].price}`)
        }
        message.channel.send({ embeds: [embed] })
    
    }
}