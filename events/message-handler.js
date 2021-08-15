const Levels = require('discord-xp')
const Discord = require('discord.js')

module.exports = {
	name: 'messageCreate',
	async execute(message, client) {










const Guild = require('../db/models/guild-schema')




let guildProfile = await Guild.findOne({ guildId: message.guild.id})
if(!guildProfile) {
	 guildProfile = await new Guild({
		guildId: message.guild.id
	})
	await guildProfile.save().catch(err => console.error(err))
}

client.prefix = guildProfile.prefix

const randomXP = Math.floor(Math.random() * 29) + 1; //1-30
const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP)
if(hasLeveledUp) {
	const user = await Levels.fetch(message.author.id, message.guild.id)
	message.channel.send(`You have proceeded to level ${user.level}. Continue sending messages to level up more!`)
}

//If you did not want guild prefixes using a database, you would just say that client.prefix = "your prefix here"


	if (!message.content.startsWith(client.prefix) || message.author.bot) return;


	//Args system
	const args = message.content.slice(client.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
	//Using command aliases
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	
		if (!command) return;

		//Making permissions property
		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply('You can not do this!');
			}
		}

		if(command.ownerOnly && message.author.id !== '435592949137539093') return message.channel.send('Only the bot owner can run this command!')

		//Guild only property!
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}
	//Automatic argument system!
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${client.prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
	//Cooldowns
	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


	//Tries to execute command, but if it finds an error, it will console error that error and complain to the user!

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}


	},
};