// Get the audio player from handlers 
const { player } = require('../handlers/player')
// Get the AudioPlayerStatus from Discord Voice API  
const { AudioPlayerStatus } = require("@discordjs/voice");
// Get the Message Embed from Discord API 
const { MessageEmbed } = require('discord.js')

// Stop Command Export 
// Stops the current song completly 
module.exports = {
  name : 'stop',
  description : 'Stops the song currently playing',
  async execute(client, message, args){
    // The user needs to be in the same voice channel as bot to execute command
    if(!message.member.voice.channelId) return message.channel.send('You need to be in a channel to execute the command!')

    // Gets bots voice connection 
    const result = getVoiceConnection(message.guild.id);
    // If the bot has no connection, send a message to user
    if(!result) return message.channel.send('Nothing to stop. Bot is not in a channel')
    
    // If the player is playing something 
    if(AudioPlayerStatus.Playing){
      // Stop the player 
      player.pause();

      // Create an embed message of the stoping the song 
      const stopMusic = new MessageEmbed()
        .setColor("RED")
        .setDescription(`We stopped the music mate`)

      // Reply back to the user 
      await message.reply({embeds : [stopMusic]})
    }else{
      // Create an embed message of the error saying that there is nothing playing 
      const errorStopMusic = new MessageEmbed()
        .setColor("RED")
        .setDescription(`Nothing playing right now`)

      // Reply back to the user 
      await message.reply({embeds : [errorStopMusic]})
    }
  }
}
