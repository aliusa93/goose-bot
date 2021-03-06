

const CurrencySystem = require("currency-system");
const { MessageEmbed } = require("discord.js");
const cs = new CurrencySystem;

module.exports = {
    name: 'beg',
    async execute(message, args, client) {
        let result = await cs.beg({
            user: message.author,
            guild: message.guild,
            minAmount: 20,
            maxAmount: 85
    
        });
        if (result.error) return message.channel.send(`You have begged recently. Try again in ${result.time}`);
        else message.channel.send(`Ok fine... I will give you $${result.amount}`)
    }
}
