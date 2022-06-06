// Disconnect Command Export 
// Disconnects the audio player from the voice channel
module.exports = {
  name : 'disconnect',
  description : 'Disconnects the bot from the channel',
  async execute(client, message, args){
    // The end user needs to be in the same channel to execute command
    if(!message.member.voice.channelId) return message.channel.send('❌| You need to be in a channel to execute the command!')
    
    // Get current queue 
    let queue = player.getQueue(message.guild.id);

    // If there is no connection, send error message
    if (!queue || !queue.connection){
      return message.channel.send('❌ | No bot is a voice channel to disconnect!')
    }

    // Destroys the queue and disconnects from voice channel
    queue.destroy();

    // Return a message to tell user that bot was disconnected 
    return await message.channel.send(`Bot was disconnected. Goodbye! :hand_splayed:`);
  }
}
