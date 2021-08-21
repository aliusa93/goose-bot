const CurrencySystem = require("currency-system");
const {
    MessageEmbed
} = require("discord.js");
const cs = new CurrencySystem;


module.exports = {
    name: 'work',
    description: 'Work at an EPIK job',
    async execute(message, args, client) {
        let result = await cs.work({
            user: message.author,
            guild: message.guild,
            maxAmount: 100,
            replies: ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chef', 'Mechanic'],
            cooldown: 25 //25 seconds,

        });
        if (result.error) return message.channel.send(`You have already worked recently. Try again in ${result.time}`);
        else message.channel.send(`You worked as a ${result.workType} and earned $${result.amount}.`)
    }
}