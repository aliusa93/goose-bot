const CurrencySystem = require("currency-system");
const { MessageEmbed } = require("discord.js");
const cs = new CurrencySystem;


module.exports = {
    name: 'balance',
    aliases: ['bal', 'b'],
    description: 'A way to see how much money you have in your bank!',
    guildOnly: true,
    async execute (message, args, client) {
        let user;
        if (message.mentions.members.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]);
            if (user) user = user.user;
        } else if (!args[0]) {
            user = message.author;
        }

        let result = await cs.balance({
            user: user,
            guild: message.guild
        });
        const embed = new MessageEmbed()
        .setTitle(`Balance for ${user.tag}`)
        .addFields([{
            name: 'Wallet',
            value: `$${result.wallet}`
        }, {
            name: 'Bank',
            value: `$${result.bank}`
        }])
        .setColor('RANDOM')
        message.channel.send({ embeds: [embed] });
    }
    
}