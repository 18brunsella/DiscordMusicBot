// MessageEmbed from Discord API 
const { MessageEmbed } = require('discord.js')

// ShowQueue Command Export 
// Shows the current queue of songs (just prints it out )
module.exports = {
  name : 'showqueue',
  description: 'Prints out the queue to the user',
  async execute(client, message, args){
    // If user who sent the messsage is not in a voice channel, the command will not execute 
    if(!message.member.voice.channelId) return message.channel.send('❌ | You need to be in a channel to execute the command!')
  
    // Look for a queue 
    let queue = player.getQueue(message.guild.id);
    if(!queue) return message.channel.send('❌ | There is nothing playing or no queue. Use -play or -queue to get a song to play.')

    // Start of queue list
    let msg = "";

    // This gets the queue size 
    let sizeOfQueue = queue.tracks.length;

    // If there is nothing in the queue
    if(sizeOfQueue === 0){
      return message.channel.send('❌ | The queue is currently empty...')
    }

    // If the size of the queue is more or equal to ten, we want a max of 10 songs 
    // to be shown in the messsage
    if(sizeOfQueue >= 10){
      sizeOfQueue = 10;
    }

    // Looping through the queue
    for(let i = 1; i <= sizeOfQueue; i++){
      if(i === 1){
        msg += "Up Next | **" + queue.tracks[i-1].title + "** \n";
      }else{
        msg += i-1 + " | **" + queue.tracks[i-1].title + "** \n";
      }
    }

    // Embed message for the queue list 
    const queueList = new MessageEmbed()
      .setColor('BLUE')
      .setTitle('Queue List | :musical_note:')
      .setDescription(msg)

    // Return the message 
    await message.channel.send({embeds : [queueList]});
  }
}
