const {
    readdirSync
} = require('fs')

function getCommands() {
    let categories = []

    readdirSync('./commands/').forEach((dir) => {
        const directories = readdirSync(`./commands/${dir}`).filter((file) => file.endsWith('.js'))

        const value = []

        const commands = directories.map((command) => {
            const file = require(`../commands/${dir}/${command}`)

            value.push({
                name: file.name ? file.name : 'No command name specified.',
                description: file.description ? file.description : 'No description specified.',
                usage: file.usage ? file.usage : 'No usage specified.'
            })

        })
        let data = new Object()

        data = {
            name: dir.toUpperCase(),
            value,
        };

        categories.push(data)

    })
    return categories;
}

module.exports = {
    getCommands
}