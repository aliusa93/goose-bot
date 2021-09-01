module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (!message.guild || message.author.bot) return;

        const splittedMsgs = message.content.split(' ')

        let deleting = false;

        await Promise.all(
            splittedMsgs.map((content) => {
                if(client.words.get(message.guild.id)?.includes(content.toLowerCase())) deleting = true
            })
        )

        if(deleting === true) {
            message.delete()
            message.channel.send('That word is not allowed to be said in that server!')
        }
    }
}