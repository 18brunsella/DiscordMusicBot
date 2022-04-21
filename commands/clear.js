module.exports = {
  name : 'clear',
  description : 'Clears all messages',
  async execute(interaction, args){
    await interaction.reply("Clearing Messages")
  }
}
