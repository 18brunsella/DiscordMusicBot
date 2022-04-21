const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus} = require("@discordjs/voice");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
  name : 'play',
  description: 'Plays the song with attached URL',
  async execute(client, message, args){
    if(!message.member.voice.channelId) return message.channel.send('You need to be in a channel to execute the command!')
    
    const voiceChannel = message.member.voice.channel;
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if(!permissions.has('CONNECT')) return message.channel.send('You do not have the correct permissions');
    if(!permissions.has('SPEAK')) return message.channel.send('You do not have the correct permissions');
    if(!args.length) return message.channel.send('Please provide a youtube URL')

    if (ytdl.validateURL(args[0])){
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
      });

      const info = await ytdl.getInfo(args[0]);
      const songTitle = info.videoDetails.title;
      
      // Get the stream object
      const musicStream = await ytdl(args[0], { filter: "audioonly" });
      // AudioPlayer and AudioResource objects 
      const player = createAudioPlayer();
      let resource = createAudioResource(musicStream);
      
      connection.subscribe(player);
      
      player.play(resource);

      await message.reply(`Now Playing ***${songTitle}***`) 
      
      player.on(AudioPlayerStatus.Idle, () => {
        connection.disconnect();
      });
    }else{
      return message.channel.send('Not a valid link bro');
    }
  }
}
