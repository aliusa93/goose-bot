

module.exports = {
    name: 'ping',
    description: 'A simple ping pong command!',
    async execute(interaction) {
        await interaction.reply('Pong!')
    }
}