
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const Discord = require('discord.js')
const client = new Discord.Client({
	intents: 32767
})

const Schema = require('./db/models/antiswear-schema')
const path = require('path')

require('dotenv').config()
const DisTube = require('distube')

client.distube = new DisTube.default(client, { searchSongs: 1, emitNewSongOnly: true, leaveOnFinish: true, leaveOnStop: false})





const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
        client.distube
		.on('playSong', (queue, song) =>
		queue.textChannel.send(
			`Playing \`${song.name}\` - \`${
				song.formattedDuration
			}\`\nRequested by: ${song.user}\n${status(queue)}`,
		))
	.on('addSong', (queue, song) =>
		queue.textChannel.send(
			`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
		))
	.on('addList', (queue, playlist) =>
		queue.textChannel.send(
			`Added \`${playlist.name}\` playlist (${
				playlist.songs.length
			} songs) to queue\n${status(queue)}`,
		))
	// DisTubeOptions.searchSongs = true
	.on('searchResult', (message, result) => {
		let i = 0
		message.channel.send(
			`**Choose an option from below**\n${result
				.map(
					song =>
						`**${++i}**. ${song.name} - \`${
							song.formattedDuration
						}\``,
				)
				.join(
					'\n',
				)}\n*Enter anything else or wait 30 seconds to cancel*`,
		)
	})
	// DisTubeOptions.searchSongs = true
	.on('searchCancel', message => message.channel.send(`Searching canceled`))
	.on('searchInvalidAnswer', message =>
		message.channel.send(`searchInvalidAnswer`))
	.on('searchNoResult', message => message.channel.send(`No result found!`))
	.on('error', (textChannel, e) => {
		console.error(e)
		textChannel.send(`An error encountered: ${e.slice(0, 2000)}`)
	})
	.on('finish', queue => queue.textChannel.send('Finish queue!'))
	.on('finishSong', queue => queue.textChannel.send('Finish song!'))
	.on('disconnect', queue => queue.textChannel.send('Disconnected!'))
	.on('empty', queue => queue.textChannel.send('Empty!'))





client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slashcommands = new Discord.Collection()
client.words = new Discord.Collection()



const mongoose = require('./db/mongoose')


//Economy npm init
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
CurrencySystem.cs.on('debug', (debug, error) => {
    console.log(debug);
    if (error) console.error(error);
});
//sets mongo url
cs.setMongoURL(process.env.mongoPath);
cs.setDefaultWalletAmount(100)
//sets default bank amount when ever new user is created.
cs.setDefaultBankAmount(1000)



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
const guildId = ['825004828647227393', '823293748392755200'];
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
			Routes.applicationCommands(clientId),
			{ body: slashCommands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();


client.on('ready', () => {
	const { getCommands } = require('./utils/index')
	const clientDetails = {
		guilds: client.guilds.cache.size,
		users: client.users.cache.size,
		channels: client.channels.cache.size
	}
	console.log(`${client.user.tag} is online!`)

	Schema.find().then(((data) => {
		data.forEach((val) => {
			client.words.set(val.GuildId, val.Words)
		})
	}))
	const express = require('express')
	const app = express()
	const port = process.env.PORT || 3001;

	app.set("view engine", "ejs")

	app.get("/", (req, res) => {
		res.status(200).sendFile(path.join(__dirname, 'pages', 'landingPage.html'))
	})

	app.get("/commands", (req, res) => {
		const commands = getCommands()
		res.status(200).render('commands', { commands })
	})

	app.get("/info", (req, res) => {
		res.status(200).send(clientDetails)
		
	})

	app.get("/premium", (req, res) => {
		res.status(200).send('Coming Soon')
		
	})

	app.listen(port)
})




//Connects to MongoDB database.
mongoose.init()


client.login(process.env.TOKEN)
















