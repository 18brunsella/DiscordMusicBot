

// Skip Command Export 
// Skips the current song to the next song in the queue if there is any 
module.export = {
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
      return message.channel.send('❌ | Nothing to skip. Use -play to play a song!')
    }

    try{
      queue.skip();
      
    } catch {

    }
  }
}
