const { MessageEmbed } = require('discord.js')
const { player, queueConstructor } = require('../handlers/player')
const { joinVoiceChannel, createAudioResource} = require("@discordjs/voice");
const ytdl = require('ytdl-core');

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
      let songDuration = info.videoDetails.lengthSeconds;
      const formattedDuration = new Date(songDuration * 1000).toISOString().slice(11, 19);
      // Get the stream object
      const musicStream = await ytdl(args[0], { filter: "audioonly" });
      // AudioResource objects 
      let resource = createAudioResource(musicStream);
      
      connection.subscribe(player);
      
      player.play(resource);

      const songPlaying = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(` \`${songTitle}\` is now playing - \`${formattedDuration}\` \n Requested by: ${message.author}`)

      await message.reply({embeds : [songPlaying]})
      
      player.on(AudioPlayerStatus.Idle, () => {
        connection.disconnect();
      });
    }else{
      const errorPlayMusic = new MessageEmbed()
      .setColor("RED")
      .setDescription(`Not a valid link bro`)

      return message.channel.send({embed : [errorPlayMusic]});
    }
  }
}
