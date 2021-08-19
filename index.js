
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const Discord = require('discord.js')
const client = new Discord.Client({
	intents: 32767
})

require('dotenv').config()
//const config = require('./config.json')
client.on('ready', () => {
	console.log('Ready')
})




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


const slashCommands = [];



const clientId = '871040665243512843';
const guildId = '825004828647227393';
//Slash commands!
const slashcommandFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));



for (const slashfile of slashcommandFiles) {
	const slashCommand = require(`./slash/${slashfile}`)
	slashCommands.push(slashCommand.data.toJSON())
	client.slashcommands.set(slashCommand.data.name, slashCommand)

	
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);






(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: slashCommands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();





//Connects to MongoDB database.
mongoose.init()


client.login(process.env.TOKEN)
















