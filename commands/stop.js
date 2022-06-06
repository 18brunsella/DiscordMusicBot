const { getVoiceConnection } = require('@discordjs/voice');

// Stop Command Export 
// Stops the current song completly 
module.exports = {
  name : 'stop',
  description : 'Stops the song currently playing',
  async execute(client, message, args){
    // The user needs to be in the same voice channel as bot to execute command
    if(!message.member.voice.channelId) return message.channel.send('❌| You need to be in a channel to execute the command!')

    // Get current queue 
    let queue = player.getQueue(message.guild.id);
    // There is no existing queue currently
    if(!queue) return message.channel.send('❌ | Nothing is playing ...')

    // If there is no connection, send error message
    if (!queue.connection){
      return message.channel.send('❌ | Nothing to stop!')
    }

    // If the player is playing something 
    if(queue.playing){
      // Set Paused to true on the queue
      queue.setPaused(true);

      return await message.channel.send(':pause_button: | Paused the music...')
    }else{
      // Reply back to the user 
      return await message.channel.send(`❌ | Nothing playing right now`)
    }
  }
}
