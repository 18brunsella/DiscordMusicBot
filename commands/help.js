// MessageEmbed from Discord API 
const { MessageEmbed } = require('discord.js')

// Help Command Export 
// Gives a list of options the end user can use
module.exports = {
  name : 'help',
  description: 'Prints out the list of options available',
  async execute(client, message, args){
    // The embed message for the list of options
    const helpMessage = new MessageEmbed()
      .setColor('BLUE')
      .setTitle('Lets Play Some Bangers! Bot Command List :musical_note:')
      .setDescription(` You can ONLY play songs from Youtube (not compatible for Youtube playlists either) 	:notes: \n
                        \`-play YOUTUBEURL\` can only play youtube links / urls. Song would be in the queue if there is a song playing currently.\n 
                        \`-stop\` stops the current song \n
                        \`-resume\` turns the song back on if stopped \n
                        \`-skip\` skips the current song and goes to next song in queue \n
                        \`-disconnect\` removes the bot from the voice channel \n
                        \`-queue YOUTUBEURL\` adds the song into queue \n
                        \`-showqueue\` shows songs on the queue \n
                        \`-help\` shows all of the command options \n
                        \`-clear\` clears the queue \n
                        \`-prev\` goes to the previous song (the song that was just played) \n
                        \`-nowplaying\` shows the current song track playing \n`)

    // Reply to the user with the list above 
    await message.reply({embeds : [helpMessage]})
  }
}
