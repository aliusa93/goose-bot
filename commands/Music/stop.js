module.exports = {
    name: 'stop',
    description: 'Stops music that is playing!',
    async execute(message, args, client) {

        const { distube } = client;
        try {
            distube.stop(message)
        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}