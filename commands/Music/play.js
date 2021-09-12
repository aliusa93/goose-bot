module.exports = {
    name: 'play',
    description: 'Plays something from youtube in a VC!',
    async execute(message, args, client) {

        const { distube } = client;
        const string = args.join(" ")
        if (!string) return message.channel.send(`Please enter a song url or query to search.`)
        try {
            distube.play(message, string)
        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}