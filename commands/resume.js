// Get the audio player from the handlers  
const { player } = require('../handlers/player')
// Get the audio player status from the Discord Voice API  
const { AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice')
// Get the message embed from the Discord API 
const { MessageEmbed } = require('discord.js')

// Resume Command Export 
// Resumes any song if it was initially stopped 
module.exports = {
  name : 'resume',
  description : 'Resumes the song that was being stopped',
  async execute(client, message, args){
    // The user needs to be in the same voice channel as the bot 
    if(!message.member.voice.channelId) return message.channel.send('You need to be in a channel to execute the command!')

    // Gets bots voice connection 
    const result = getVoiceConnection(message.guild.id);
    // If the bot has no connection, send a message to user
    if(!result) return message.channel.send('Nothing to stop. Bot is not in a channel')

    // Checks the audio player status
    // If it was paused, then resume the song 
    if(AudioPlayerStatus.Paused){
      player.unpause();

      // Create a embed message showing that the music should be played 
      const resumeMusic = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`Music is back on`)

      // Reply to the user 
      await message.reply({embeds : [resumeMusic]})
    }else{
      // Create a embed message showing an error message
      const errorResumeMusic = new MessageEmbed()
        .setColor("RED")
        .setDescription(`There ain't no music playing right now`)

      // Reply to the user with error message 
      await message.reply({embeds : [errorResumeMusic]})
    }
  }
}
