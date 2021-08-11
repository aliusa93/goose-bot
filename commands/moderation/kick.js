module.exports = {
	name: 'kick',
	description: 'Kick a user from the server.',
	guildOnly: true,
	permissions: 'KICK_MEMBERS',
	execute(message, args, client) {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if(!target) {
			message.reply('Please mention someone to kick!')
			return;
		}

		if(!target.kickable) {
			message.reply('I cannot kick this member!')
			return
		}

		if(target.id === message.author.id) {
			message.reply('You cannot kick yourself!')
			return
		 }

	args.shift();
    const reason = args.join(' ');

    target.kick({ reason }).catch(err => console.error(err))

    message.reply(`Kicked ${target}!`);

		
	},
};