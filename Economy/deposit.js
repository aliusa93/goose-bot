const CurrencySystem = require("currency-system");
const {
    MessageEmbed
} = require("discord.js");
const cs = new CurrencySystem;


module.exports = {
    name: 'deposit',
    description: 'Deposits money into the bank',
    args: true,
    usage: '<Amount that you want to deposit>',
    async execute(message, args) {
        let money = args.join(' ')
        if(isNaN(money)) return message.channel.send('Amount specified is not a valid number!')


        try {
            let result = await cs.deposite({
                user: message.author,
                guild: message.guild,
                amount: money

                
            })
            if (result.error) {
                if (result.type === 'money') return message.channel.send("Specify an amount to deposit");
                if (result.type === 'negative-money') return message.channel.send("You can't deposit negative money");
                if (result.type === 'low-money') return message.channel.send("You don't have that much money in your wallet.");
                if (result.type === 'no-money') return message.channel.send("You don't have any money to deposit");
            } else {
                if (result.type === 'all-success') return message.channel.send("You have deposited all your money to your bank");
                if (result.type === 'success') return message.channel.send(`You have deposited $${result.amount} money to your bank.`);
            };
            
        } catch (error) {
            console.error(error)
        }
        
       
        if (result.error) {
            if (result.type === 'money') return message.channel.send("Specify an amount to deposit");
            if (result.type === 'negative-money') return message.channel.send("You can't deposit negative money");
            if (result.type === 'low-money') return message.channel.send("You don't have that much money in your wallet.");
            if (result.type === 'no-money') return message.channel.send("You don't have any money to deposit");
        } else {
            if (result.type === 'all-success') return message.channel.send("You have deposited all your money to your bank");
            if (result.type === 'success') return message.channel.send(`You have deposited $${result.amount} money to your bank.`);
        };
    }
}