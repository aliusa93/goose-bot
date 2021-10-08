module.exports = {
    name: 'ban',
    description: 'Bans a member!',
    args: true,
    usage: '<Target @> <Reason>',
    execute(message, args) {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if(!target) {
			message.reply('Please mention someone to ban')
			return;
		}

		if(!target.banable) {
			message.reply('I cannot ban this member!')
			return
		}

		if(target.id === message.author.id) {
			message.reply('You cannot ban yourself!')
			return
		 }

	args.shift();
    const reason = args.join(' ');

    target.ban({ reason }).catch(err => console.error(err))

    message.reply(`Banned ${target}!`);
    }
}
