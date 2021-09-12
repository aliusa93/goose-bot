const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),
    async execute (interaction, client) {
        let embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(`PONG! :ping_pong:`)
        .setThumbnail('https://cdn.discordapp.com/avatars/871040665243512843/388809f4fbf15b683118c0d4c4775030.webp?size=128')
        .addFields(
            {name: 'Latency', value: `\`${Date.now() - interaction.createdTimestamp}ms\``},
            {name: 'API Latency', value: `\`${Math.round(client.ws.ping)}ms\``},
        )
        interaction.reply({ embeds: [embed] });
    }
}