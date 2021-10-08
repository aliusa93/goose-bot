const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;


module.exports = {
    name: 'daily',
    description: 'Daily command for economy system!',
    async execute(message, args, client) {
        let result = await cs.daily({
            user: message.author,
            guild: message.guild,
            amount: 1000,

        });
        if (result.error) return message.channel.send(`You have used daily recently. Try again in ${result.time}`);
        else message.channel.send(`You have earned $${result.amount}.`)
    }
}