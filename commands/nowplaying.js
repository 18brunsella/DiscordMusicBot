module.exports = {
  name: 'nowplaying',
  description: 'Shows the title of the song currently playing',
  async execute(client, message, args){
    // If user who sent the messsage is not in a voice channel, the command will not execute 
    if(!message.member.voice.channelId) return message.channel.send('❌ | You need to be in a channel to execute the command!')

    // Get current queue 
    let queue = player.getQueue(message.guild.id);
    if(!queue) return message.channel.send('❌ | No Queue. Use -play to play a song!')

    // See if there is a voice connection
    if (!queue.connection){
      return message.channel.send('❌ | Bot is not here. Use -play to get it in here!')
    }

    if(queue.current){
      return await message.channel.send(`🎶 | Currently Playing Track: **${queue.current.title}**`)
    }else{
      return await message.channel.send(`❌ | No track currently playing!`)
    }
  }
}
