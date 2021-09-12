module.exports = {
    name: 'queue',
    description: 'SHows queue for the server!',
    async execute(message, args, client) {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
        const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
        message.channel.send(`**Server Queue**\n${q}`)
    }
}