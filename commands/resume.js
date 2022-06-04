// Resume Command Export 
// Resumes any song if it was initially stopped 
module.exports = {
  name : 'resume',
  description : 'Resumes the song that was being stopped',
  async execute(client, message, args){
    // The user needs to be in the same voice channel as the bot 
    if(!message.member.voice.channelId) return message.channel.send('❌ | You need to be in a channel to execute the command!')

    // Get current queue 
    let queue = player.getQueue(message.guild.id);
    if(!queue) return message.channel.send('❌ | No song currently playing. Use -play to play a song!')

    // If there is no connection, send error message
    if (!queue.connection){
      return message.channel.send('❌ | Nothing to resume. Use -play to play a song!')
    }

    // Try and catch block to set paused to false
    try{
      // Resume the song (empty parameters just means it takes the first song in the queue)
      queue.setPaused(false);
      // Reply to the user 
      return await message.channel.send(`🎶 | Music is back on`)
    } catch {
      // Reply to the user with error message 
      return await message.channel.send(`❌ | There ain't no music playing right now`)
    }
  }
}
