const { MessageEmbed } = require('discord.js');
const Schema = require('../../db/models/antiswear-schema')

module.exports = {
    name: 'antiswear',
    async execute(message, args, client) {
        if(!message.member.permissions.has('ADMINSTRATOR')) return;

        const query = args[0]?.toLowerCase()
        const guild = message.guild.id
        if(query === 'add') {
            const word = args[1]?.toLowerCase()
            if(!word) return message.channel.send('Please specify a word')
            Schema.findOne({ GuildId: message.guild.id }, async(err, data) => {
                if(data) {
                    if(data.Words.includes(word)) return message.channel.send('This word is already save in the database.')
                    data.Words.push(word)
                    data.save()
                    client.words.get(message.guild.id).push(word)
                } else {
                    new Schema ({
                        GuildId: guild,
                        Words: word
                    }).save()
                   

                    client.words.set(message.guild.id, [ word ])
                }
                message.reply(`${word} has been blacklisted!`)
            })
        } else if(query === 'remove') {
            const word = args[1]?.toLowerCase()
            if(!word) return message.channel.send('Please specify a word')

            Schema.findOne({ GuildId: message.guild.id }, async (err, data) => {
                if(!data) return message.channel.send('This server has no data!')

                if(!data.Words.includes(word)) return message.channel.send('That word does not exist in the database.')

                const filtered = data.Words.filter((target) => target !== word)

                await Schema.findOneAndUpdate(guild, {
                    GuildId: message.guild.id,
                    Words: filtered,
                })

                const collek = client.words.get(message.guild.id).filter((target) => target !== word)

                console.log(collek)

                client.words.set(message.guild.id, filtered)
            })
            message.reply('Word has been removed.')
        } else if(query === 'display') {
            Schema.findOne({ GuildId: message.guild.id}, async (err, data) => {
                if(!data) return;
                let embed = new MessageEmbed()
                .setTitle('Blacklisted Words')
                .setDescription(data.Words.join(', '))

                message.channel.send({ embeds: [embed] })
            })
        } else if(query === 'collection') {
            const getCollection = client.words.get(message.guild.id)
            if(getCollection) return message.channel.send({ content: getCollection.toString(), code: 'js'})
            message.channel.send('No data.')
        } else {
            return message.channel.send('That query does not exist!')
        }
    }
}