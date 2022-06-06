const playdl = require('play-dl');
const { QueryType } = require('discord-player');

// Queue Command Export 
// Adds the youtube URL to the queue so it will be played next 
module.exports = {
  name : 'queue',
  description: 'Adds a song to the queue',
  async execute(client, message, args){
    // If user who sent the messsage is not in a voice channel, the command will not execute 
    if(!message.member.voice.channelId) return message.channel.send('❌ | You need to be in a channel to execute the command!')
    
    // Gets the users voice channel 
    const voiceChannel = message.member.voice.channel;
    // Gets the permissions for the client (or the bot) for the voice channel
    const permissions = voiceChannel.permissionsFor(message.client.user);
    // The bot needs to be able to connect and "speak" or have the ability to play the music 
    if(!permissions.has('CONNECT')) return message.channel.send('❌ | The bot does not have the correct permissions');
    if(!permissions.has('SPEAK')) return message.channel.send('❌| The bot does not have the correct permissions');
    // Needs a URL link if there are no other arguments 
    if(!args.length) return message.channel.send('❌| Please provide a youtube URL')

    // Look for a queue 
    let queue = player.getQueue(message.guild.id);
  
    if(!queue){
      // Create a queue
      queue = await player.createQueue(message.guild.id, {
        initialVolume: 90, 
        metadata : {
          channel: message.channel,
        },
        async onBeforeCreateStream(track, source, _queue) {
          if(source === "youtube"){
            return (await playdl.stream(track.url, {discordPlayerCompatibility : true})).stream;
          }
        }, 
      });
    }

    // Validate that it is a youtube URL (check if it starts with https and it is a video, not a search)
    if (args[0].startsWith('https') && playdl.yt_validate(args[0]) == 'video'){
      // Verify voice channel connection
      try {
        if (!queue.connection) await queue.connect(message.member.voice.channel);
      } catch {
        queue.destroy();
        return await message.reply({ content: "Could not join your voice channel!", ephemeral: true });
      }

      // Search for song using the URL (using the search function from Player object)
      const track = await player.search(args[0], {
        requestedBy: message.member,
        searchEngine: QueryType.AUTO
      });

      if(!queue.playing){
        // Get song title of the youtube audio
        const songTitle = await (await playdl.video_info(args[0])).video_details.title;
        // Loading Track Message
        await message.channel.send({ content: `⏱️ | Loading track **${songTitle}**!` });
        // Play function takes a Track object 
        // Grabs the first track from search
        await queue.play(track.tracks[0]);
      }else{
        // Add track to the queue
        await queue.addTrack(track.tracks[0]);
      }
    }else{
      // Send the error message to channel 
      await message.channel.send(`❌ | \`${args[0]}\` is not a valid link bro`);
    }
  }
}
