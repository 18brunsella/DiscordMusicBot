const fs = require('node:fs');
const { Client, Collection, Intents} = require('discord.js')
const { token } = require('./config.json');
const {queueConstructor} = require("../handlers/player");

const client = new Client(clientSettingsObject())
const prefix = '-';

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Lets play some music');
})

client.on('messageCreate', async message => {
	if(!message.content.startsWith(prefix) || message.author.bot) return; 

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!command) return;
	
	try {
		client.commands.get(command).execute(client, message, args);
	} catch (error) {
		console.error(error);
		await message.channel.send('There was an error while executing this command!');
	}
	
})

client.login(token).then(_ => {
  console.log("Successful login to the client");
  queueConstructor.songs = null;
  queueConstructor.nowPlaying = null;
  queueConstructor.songNames = null;
})


function clientSettingsObject() {
  return {
    shards: "auto",
    allowedMentions: {
      parse: ["roles", "users", /* "everyone" */],
      repliedUser: false, //set true if you want to ping the bot on reply messages
    },
    failIfNotExists: false,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [ 
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
}
}
