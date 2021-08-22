const CurrencySystem = require("currency-system");
    const cs = new CurrencySystem;

module.exports = {
    name: 'give',
    desctiption: 'Gives money to another user!',
    args: true,
    cooldown: 60,
    usage: "<Target user's @ OR Target users ID>",
    async execute(message, args, client) {
        let user;
        if(message.mentions.members.first()) {
            user = message.mentions.members.first()
        } else if(args[0]) {
            user = message.guild.members.cache.get(args[0])
        } else {
            user.id = "1"
        }

        if(user.bot || user === client.user) return message.channel.send('This user is a bot!')
        if (!client.users.cache.get(user.id) || !user) return message.channel.send('Sorry, you forgot to mention somebody.');
        let amount = args[1].toLowerCase();
        if (!amount) return message.channel.send("Enter amount of money to add.");
        if (amount.includes("-")) return message.channel.send("You can't send negative money.")
        let money = parseInt(amount);

        let result = await cs.transferMoney({
            user: message.author,
            user2: user,
            guild: message.guild,
            amount: money
        });
        if (result.error) return message.channel.send(`You don't have enough money in your wallet.`);
        else message.channel.send(`**${message.author.username}**, Successfully transfered **${result.money}** to **${result.user2.user.tag}**`)
    }
}