module.exports = {
	name : 'ping',
	description : 'Replies with Pong!',
	async execute(message, args) {
		return message.reply('Pong!');
	},
};
