const fs = require('fs');
const Discord = require('discord.js')
const client = new Discord.Client({
	intents: 32767
})

const config = require('./config.json')
client.on('ready', () => {
	console.log('Ready')
})
const Levels = require('discord-xp')


Levels.setURL(config.mongoPath)

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slashcommands = new Discord.Collection()


const mongoose = require('./db/mongoose')


//Shows code which directory events go to!

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client)); 
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}


//Same thing as above, but with commands. 

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

//Slash commands!
const slashcommandFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));

for (const slashfile of slashcommandFiles) {
	const slashcommand = require(`./slash/${slashfile}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(slashcommand.name, slashcommand);
}







//Connects to MongoDB database.
mongoose.init()


client.login(process.env.TOKEN)
















