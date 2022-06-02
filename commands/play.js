// Retrieving the MessageEmbed utility class 
const { MessageEmbed } = require('discord.js');
// Retrieves the audio player from handlers directory (player.js)
const { player, songQueue } = require('../handlers/player');
// Discord's Voice API 
const { joinVoiceChannel, createAudioResource, AudioPlayerStatus} = require("@discordjs/voice");
// PlayDl -> alternative to ytdl-core * has even soundcloud as well 
const playdl = require('play-dl');

// Play Command Export 
// Plays the song, replaces any song that is currently playing 
module.exports = {
  name : 'play',
  description: 'Plays the song with attached URL. Will replace any current playing song.',
  async execute(client, message, args){
    // If user who sent the messsage is not in a voice channel, the command will not execute 
    if(!message.member.voice.channelId) return message.channel.send('You need to be in a channel to execute the command!')
    
    // Gets the users voice channel 
    const voiceChannel = message.member.voice.channel;
    // Gets the permissions for the client (or the bot) for the voice channel
    const permissions = voiceChannel.permissionsFor(message.client.user);
    // The bot needs to be able to connect and "speak" or have the ability to play the music 
    if(!permissions.has('CONNECT')) return message.channel.send('You do not have the correct permissions');
    if(!permissions.has('SPEAK')) return message.channel.send('You do not have the correct permissions');
    // Needs a URL link if there are no other arguments 
    if(!args.length) return message.channel.send('Please provide a youtube URL')

    // Validate that it is a youtube URL (check if it starts with https and it is a video, not a search)
    if (args[0].startsWith('https') && playdl.yt_validate(args[0]) == 'video'){
      // Have the bot join the voice channel if its not in a channel
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
      });

      // Get the information of the youtube video 
      let info = await playdl.video_info(args[0]);

      // Retrieve the song title
      const songTitle = info.video_details.title;
      // Retrieve the length of the video
      let songDuration = info.video_details.durationInSec;
      // Format the song duration into HH:MM:SS
      const formattedDuration = new Date(songDuration * 1000).toISOString().slice(11, 19);
      
      // Get the audio stream
      let stream = await playdl.stream_from_info(info);
      // Create audio resource
      let resource = createAudioResource(stream.stream, {
        inputType: stream.type
      })
      
      // Subscribe the connection to the audio player 
      connection.subscribe(player);
      // Have the resource play the youtube URL 
      player.play(resource);

      // Have a embed message to print out 
      const songPlaying = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(` \`${songTitle}\` is now playing - \`${formattedDuration}\` \n Requested by: ${message.author}`)

      // Reply to the user with the embed message 
      await message.reply({embeds : [songPlaying]})
      
      // Have the bot disconnect if it goes idle after playing 
      player.on(AudioPlayerStatus.Idle, () => {
        connection.disconnect();
      });
    }else{
      // Error message (embed message )
      const errorPlayMusic = new MessageEmbed()
        .setColor("RED")
        .setDescription(`\`${args[0]}\` is not a valid link bro`)

      // Send the error message to channel 
      await message.channel.send({embeds : [errorPlayMusic]});
    }
  }
}
