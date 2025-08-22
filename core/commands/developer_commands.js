module.exports = {
  consoleCommand: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;

    //Declare local instance variables
    var exec_code = interaction.options.getString("code");

    //Execute code
    eval(exec_code);

    await interaction.reply("Console command executed. Warning! This command can be highly unstable if not used correctly.").then((message) => {
      setTimeout(function(){
        try {
          message.delete();
        } catch {}
      }, 10000);
    });
  },

  initialiseEmbedsCommand: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;

    //Declare local instance variables
    var all_embed_names = getEmbeds({ return_names: true });

    //Iterate over all embeds to post them
    for (var i = 0; i < all_embed_names.length; i++)
      postEmbed(all_embed_names[i]);

    //Send reply
    await sendPlainEmbed(interaction, `All server embeds have been successfully reloaded!`);
  }
};
