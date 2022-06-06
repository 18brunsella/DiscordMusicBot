// Enalbes interacting with the file system (to get commands directory)
const fs = require('node:fs');
// Discord API wrapper 
const { Client, Collection, Intents} = require('discord.js');
// File that contains token
// Commented out due to hosting 
// const { token } = require('./config.json');

// Get Player from discord-player
const { Player } = require('discord-player');

// New Discord Client Object 
const client = new Client(clientSettingsObject())
// New Discord Player Object 
global.player = new Player(client);

// Command prefix
const prefix = '-';

// Utility class (Collection): it is a extension of Javascripts native Map (key : value); 
client.commands = new Collection();
// Gets all the file names that end with .js in the commands directory
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

// Iterate through each command file name, and set the accomodating file with the command name
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Once ready, send console message 
client.once('ready', () => {
    console.log('We are ready! Lets play some music');
    client.user.setActivity({
      name: "SOME BANGERS",
      type: "LISTENING"
    }),
    client.user.setAvatar('./avatar/discord-music-bot-avatar.jpg')
})

require('./src/events');

// If message is created by end user
client.on('messageCreate', async message => {
  // Ignores if its any other message 
	if(!message.content.startsWith(prefix) || message.author.bot) return; 

  // Slices the prefix 
	const args = message.content.slice(prefix.length).split(/ +/);
  
  // Gets the command name
	const command = args.shift().toLowerCase();

	if (!command) return;
	
	try {
    // Executes the command 
		client.commands.get(command).execute(client, message, args);
	} catch (error) {
    // Sends error message to user if there was any error
		await message.channel.send('There was an error while executing this command! Use -help to see the list of commands');
	}
	
})

// Login with token
client.login(process.env.DJS_TOKEN).then(_ => {
  console.log("Successful login to the client");
})

// Settings for the client 
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
