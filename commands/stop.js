const { player } = require('../handlers/player') 
const { AudioPlayerStatus } = require("@discordjs/voice");
const { MessageEmbed } = require('discord.js')

module.exports = {
  name : 'stop',
  description : 'Stops the song currently playing',
  async execute(client, message, args){
    if(!message.member.voice.channelId) return message.channel.send('You need to be in a channel to execute the command!')
    if(AudioPlayerStatus.Playing){
      player.pause();

      const stopMusic = new MessageEmbed()
      .setColor("RED")
      .setDescription(`We stopped the music mate`)

      await message.reply({embed : [stopMusic]})
    }else{
      const errorStopMusic = new MessageEmbed()
      .setColor("RED")
      .setDescription(`Nothing playing right now`)

      await message.reply({embed : [errorStopMusic]})
    }
  }
}
