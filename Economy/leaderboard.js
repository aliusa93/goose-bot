const CurrencySystem = require("currency-system");
const {
    MessageEmbed
} = require("discord.js");
const cs = new CurrencySystem;


module.exports = {
    name: 'leaderboard',
    description: 'Shows guild economy leaderboard.',
    async execute(message, args, client) {
        let data = await cs.leaderboard(message.guild.id);
        if (data.length < 1) return message.channel.send("Nobody's in leaderboard yet.");
        const msg = new MessageEmbed();
        let pos = 0;
        // This is to get First 10 Users )
        data.slice(0, 10).map(e => {
            pos++
            if (!client.users.cache.get(e.userID)) return;
            msg.addField(`${pos} - **${client.users.cache.get(e.userID).username}**`, `Wallet: **${e.wallet}** - Bank: **${e.bank}**`, true);
        });
    
        message.channel.send({ embeds: [msg]}).catch();
    }
}