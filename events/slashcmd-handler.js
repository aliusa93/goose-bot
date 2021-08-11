

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        if (!client.slashcommands.has(interaction.commandName)) return;

        try {
            await client.slashcommands.get(interaction.commandName).execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}
