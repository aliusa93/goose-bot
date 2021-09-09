const CurrencySystem = require("currency-system");
const { MessageEmbed } = require("discord.js");
const cs = new CurrencySystem;
const schema = require('../../db/models/passive-schema')


module.exports = {
    name: 'rob',
    description: 'Rob another user',
    args: true,
    usage: '<@Target>',
    async execute(message, args, client) {

        const authordata  = await schema.findOne({ GuildId: message.guild.id, UserId: message.author.id, Passive: true, })
        if(authordata) return message.channel.send('You have passive mode enabled, so you cannot use this command!')
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]);
            if (user) user = user.user;;
        }


        if (user.bot || user === client.user) return message.channel.send("This user is a bot.");
        if (!user) return message.channel.send('Sorry, you forgot to mention somebody.');

        const userdata  = await schema.findOne({ GuildId: message.guild.id, UserId: user.id, Passive: true, })
        if(userdata) return message.channel.send('You cannot rob users that have passive mode on!')

        let result = await cs.rob({
            user: message.author,
            user2: user,
            guild: message.guild,
            minAmount: 100,
            successPercentage: 5,
            cooldown: 25, //25 seconds,
                maxRob: 1000
        });
        if (result.error) {
            if (result.type === 'time') return message.channel.send(`You have already robbed recently. Try again in ${result.time}`);
            if (result.type === 'low-money') return message.channel.send(`You need atleast $${result.minAmount} to rob somebody.`);
            if (result.type === 'low-wallet') return message.channel.send(`${result.user2.username} has less than $${result.minAmount}, so you cannot rob him! Don't rob poor people :angry:`)
            if (result.type === 'caught') return message.channel.send(`${message.author.username} you robbed ${result.user2.username} and got caught. You payed ${result.amount} to ${result.user2.username}!`)
        } else {
            if (result.type === 'success') return message.channel.send(`${message.author.username} you robbed ${result.user2.username}. You got away with ${result.amount}!`)

        }

    }
}