module.exports = {
  ping: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;

    await interaction.reply("Pong!");
  }
};
