const { VoiceConnection, AudioPlayer, AudioPlayerStatus, getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  name : 'disconnect',
  description : 'Disconnects the bot from the channel',
  async execute(client, message, args){
    if(!message.member.voice.channelId) return message.channel.send('You need to be in a channel to execute the command!')
    if(AudioPlayerStatus.Playing) AudioPlayer.pause();
    const connection = getVoiceConnection(message.guild.id);
    connection.destroy();
    await message.reply("Goodbye!")
  }
}
