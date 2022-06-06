module.exports = {
  name: "prev",
  description: "Plays the previous song (the song that was just played from current)",
  async execute(client, message, args){
    // If user who sent the messsage is not in a voice channel, the command will not execute 
    if(!message.member.voice.channelId) return message.channel.send('❌ | You need to be in a channel to execute the command!')
  
    // Get current queue 
    let queue = player.getQueue(message.guild.id);
    // Checks if there is even a queue
    if(!queue) return message.channel.send('❌ | No Queue. Use -play to play a song!')

    // See if there is a voice connection
    if (!queue.connection){
      return message.channel.send('❌ | The bot is not connected to the voice channel')
    }

    // Checks if there were previous tracks 
    if(queue.previousTracks.length === 1 || queue.previousTracks.length === 0){
      return message.channel.send('❌ | No previous song!')
    }

    // Try and catch block for going back to a song
    try {
      // Goes back to previous track 
      queue.back();
      // Reply to user that it successfully is going back 
      return await message.channel.send(':white_check_mark: | Going back to previous banger!')
    } catch {
      return await message.channel.send('❌ | Error in trying to go previous song')
    }
  }
}
