// Skip Command Export 
// Skips the current song to the next song in the queue if there is any 
module.exports = {
  name: "skip",
  description: "Skips the current song to the next song in the queue",
  async execute(client, message, args){
    // If user who sent the messsage is not in a voice channel, the command will not execute 
    if(!message.member.voice.channelId) return message.channel.send('❌ | You need to be in a channel to execute the command!')

    // Get current queue 
    let queue = player.getQueue(message.guild.id);
    if(!queue) return message.channel.send('❌ | No Queue. Use -play to play a song!')
    
    // See if there is a voice connection
    if (!queue.connection){
      return message.channel.send('❌ | Bot has no connection to voice channel! Use -play to get it in here!')
    }

    // If there is no other songs in the queue, tell user that skipping will end it
    if (queue.tracks.length === 0){
      return message.channel.send('❌ | There is no more songs in the queue if you skip! Add more songs using -queue!')
    }

    // Try and catch block for skipping the song
    try{
      queue.skip();
      
      return await message.channel.send(':white_check_mark: | Skipping song...')
    } catch {
      return await message.channel.send('❌ | Error trying in skipping song.')
    }
  }
}
