const { getVoiceConnection ,AudioPlayer, AudioPlayerStatus } = require("@discordjs/voice");

module.exports = {
  name : 'stop',
  description : 'Stops the song currently playing',
  async execute(client, message, args){
    if(!message.member.voice.channelId) return message.channel.send('You need to be in a channel to execute the command!')
    if(AudioPlayerStatus.Playing){
      const connection = getVoiceConnection(message.guild.id)
      connection.destroy();
    
      await message.reply("We stopped the music")
    }else{
      await message.reply("There ain't no music playing right now")
    }
  }
}
