const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const mongoose = require('mongoose')
require('../db/mongoose')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),
    async execute (interaction, client) {
        let mongoState;

        if(mongoose.connection.readyState === 0) mongoState = 'Disconnected'
        if(mongoose.connection.readyState === 1) mongoState = 'Connected'
        if(mongoose.connection.readyState === 2) mongoState = 'Connecting'
        if(mongoose.connection.readyState === 3) mongoState = 'Disconnecting'

        const mesg = await interaction.channel.send('Pinging...')
        let embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(`PONG! :ping_pong:`)
        .setThumbnail('https://cdn.discordapp.com/avatars/871040665243512843/388809f4fbf15b683118c0d4c4775030.webp?size=128')
        .addFields(
            {name: 'Latency', value: `\`${mesg.createdTimestamp - interaction.createdTimestamp}ms\``},
            {name: 'API Latency', value: `\`${Math.round(client.ws.ping)}ms\``},
            {name: 'Database Status', value: `\`${mongoState}\``},
        )
         interaction.reply({ embeds: [embed] })
    }
}