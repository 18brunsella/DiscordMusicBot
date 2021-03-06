// Clears the current queue of songs 
module.exports = {
  name: "clear",
  description: "Clears the queue of songs",
  async execute(client, message, args){
    // If user who sent the messsage is not in a voice channel, the command will not execute 
    if(!message.member.voice.channelId) return message.channel.send('❌ | You need to be in a channel to execute the command!')

    // Get current queue 
    let queue = player.getQueue(message.guild.id);
    // If there is no queue available
    if(!queue) return message.channel.send('❌ | No Queue. Nothing to clear!')

    // If there is no connection, send error message
    if (!queue.connection){
      return message.channel.send('❌ | Bot is not connected to voice channel!')
    }

    // If size of queue is zero
    if (queue.tracks.length === 0){
      return message.channel.send('❌ | There are no songs in the queue! It is already clear...')
    }
    
    // Try and catch block to clear the queue
    try{
      queue.clear();

      return await message.channel.send(':white_check_mark: | Queue cleared. Use -play to play a song!')
    }catch{
      return await message.channel.send('❌ | Error trying to clear out queue.')
    }
  }
}
