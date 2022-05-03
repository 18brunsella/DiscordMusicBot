const { MessageEmbed } = require('discord.js')

module.exports = {
  name : 'help',
  description: 'Prints out the list of options available',
  async execute(client, message, args){
    const helpMessage = new MessageEmbed()
      .setColor('BLUE')
      .setTitle('Lets Play Some Bangers Bot Command List')
      .setDescription(` \`-play YOUTUBEURL\` can only play youtube links / urls. Song would immediately play even if there is one playing currently.\n 
                        \`-stop\` stops the current song \n
                        \`-skip\` skips the current song and goes to next song in queue \n
                        \`-disconnect\` removes the bot from the voice channel \n
                        \`-queue YOUTUBEURL\` adds the song into queue \n
                        \`-showqueue\` shows songs on the queue \n
                        \`-help\` shows all of the command options \n`)

      await message.reply({embeds : [helpMessage]})
  }
}
