const CurrencySystem = require('currency-system');
const cs = new CurrencySystem;

module.exports = {
    name: 'weekly',
    async execute(message, args, client) {
        let result = await cs.weekly({
            user: message.author,
            guild: message.guild,
            amount: 100,
    
        });
        if (result.error) return message.channel.send(`You have used weekly recently. Try again in ${result.time}`);
        else message.channel.send(`You have earned $${result.amount}.`)
    }
}