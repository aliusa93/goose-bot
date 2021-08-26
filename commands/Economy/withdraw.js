const CurrencySystem = require("currency-system");
const {
    MessageEmbed
} = require("discord.js");
const cs = new CurrencySystem;



module.exports = {
    name: 'withdraw',
    description: 'Withdraws money into the bank',
    args: true,
    usage: '<Amount that you want to withdraw>',
    async execute(message, args) {
        let money = args.join(' ')
        if(isNaN(money)) return message.channel.send('Amount specified is not a valid number!')
        let result = await cs.withdraw({
            user: message.author,
            guild: message.guild,
            amount: money
        });
        if (result.error) {
            if (result.type === 'money') return message.channel.send("Specify an amount to withdraw")
            if (result.type === 'negative-money') return message.channel.send("You can't withdraw negative money, please use deposit command.")
            if (result.type === 'low-money') return message.channel.send("You don't have that much money in your bank.")
            if (result.type === 'no-money') return message.channel.send("You don't have any money to withdraw")
        } else {
            if (result.type === 'all-success') return message.channel.send("You have withdrawed all your money from your bank")
            if (result.type === 'success') return message.channel.send(`You have withdrawed $${result.amount}  from your bank.`)

        }
    }

    }
