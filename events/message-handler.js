
const Discord = require('discord.js')
const custom = require('../db/models/commands-schema')

module.exports = {
	name: 'messageCreate',
	async execute(message, client) {


		
		






		const Guild = require('../db/models/guild-schema')

		if(message.guild) {
			let guildProfile = await Guild.findOne({
				guildId: message.guild.id
			})
			if (!guildProfile) {
				guildProfile = await new Guild({
					guildId: message.guild.id
				})
				await guildProfile.save().catch(err => console.error(err))
			}
	
			client.prefix = guildProfile.prefix 
		}


	


		//If you did not want guild prefixes using a database, you would just say that client.prefix = "your prefix here"

		


		if (message.author.bot) return;

		


		//Args system
		const args = message.content.slice(client.prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		if (!client.commands.has(commandName)) return;
		//Using command aliases
		const command = client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) || client.commands.get(commandName)
		

		

		
		//Making permissions property
		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.permissions.has(command.permissions)) {
				return message.reply('You can not do this!');
			}
		}

		if (command.ownerOnly && message.author.id !== '435592949137539093') return message.channel.send('Only the bot owner can run this command!')

		//Guild only property!
		if (command.guildOnly && message.channel.type === 'DM') {
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
		const {
			cooldowns
		} = client;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 0) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		
			try {
				command.execute(message, args, client)
			} catch (error) {
				console.error(error)
				message.channel.send('There was an error executing this command!')
			}
	

		
		



	},
};