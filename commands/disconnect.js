// Get the audio player from handlers
const { player } = require("../handlers/player");
// Get the audio player status and the current voice connection from Discord Voice API 
const { AudioPlayerStatus, getVoiceConnection } = require("@discordjs/voice");

// Disconnect Command Export 
// Disconnects the audio player from the voice channel
module.exports = {
  name : 'disconnect',
  description : 'Disconnects the bot from the channel',
  async execute(client, message, args){
    // The end user needs to be in the same channel to execute command
    if(!message.member.voice.channelId) return message.channel.send('You need to be in a channel to execute the command!')
    // If the player is playing something, have the player pause 
    if(AudioPlayerStatus.Playing) player.pause();
    // Get the current bot connection 
    const connection = getVoiceConnection(message.guild.id);
    // Disconnect / Destroy the connection 
    if(connection != null){
      connection.destroy();
    }
    // Have a goodbye message 
    await message.reply("Goodbye!")
  }
}
