// Queue Command Export 
// Adds the youtube URL to the queue so it will be played next 
module.exports = {
  name : 'queue',
  description: 'Adds a song to the queue',
  async execute(client, message, args){
    // If user who sent the messsage is not in a voice channel, the command will not execute 
    if(!message.member.voice.channelId) return message.channel.send('❌ | You need to be in a channel to execute the command!')
    
    
  
  }
}
