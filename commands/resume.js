const { player } = require('../handlers/player') 
const { AudioPlayerStatus } = require('@discordjs/voice')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name : 'resume',
  description : 'Resumes the song that was being played',
  async execute(client, message, args){
    if(!message.member.voice.channelId) return message.channel.send('You need to be in a channel to execute the command!')
    if(AudioPlayerStatus.Paused){
      player.unpause();

      const resumeMusic = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(`Music is back on`)

      await message.reply({embed : [resumeMusic]})
    }else{
      const errorResumeMusic = new MessageEmbed()
      .setColor("RED")
      .setDescription(`There ain't no music playing right now`)

      await message.reply({embed : [errorResumeMusic]})
    }
  }
}
