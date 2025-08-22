module.exports = {
  buttonHandler: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;

    //Guard clause to throw out non-button interactions
    if (!interaction.isButton()) return;

    //Declare local instance variables
    var button_obj = getButton(interaction.customId);
    var clear_components = false;
    var ui_obj = interfaces[interaction.message.id];
    var user_id = interaction.user.id;
    var user_obj = interaction.guild.members.cache.find(user => user.id == interaction.user.id);

    //Effect parser
    if (button_obj.effect)
      applyEffect(interaction, button_obj.effect, button_obj.toggle);

    //UI object parser
    if (ui_obj)
      if (ui_obj.user == user_id)
        //Page menu handling
        if (ui_obj.type == "page_menu") {
          var current_page = ui_obj.page;

          switch (interaction.customId) {
            case "last_page":
              //Check if page is valid
              ui_obj.page = (current_page - 1 >= 0) ? ui_obj.page - 1 : ui_obj.page;

              //Recursive call
              createPageMenu(interaction.message, {
                embed_pages: ui_obj.embed_array,
                starting_page: ui_obj.page,
                user: ui_obj.user
              });

              break;
            case "next_page":
              //Check if page is valid
              ui_obj.page = (ui_obj.embed_array[current_page + 1]) ? ui_obj.page + 1 : ui_obj.page;

              //Recursive call
              createPageMenu(interaction.message, {
                embed_pages: ui_obj.embed_array,
                starting_page: ui_obj.page,
                user: ui_obj.user
              });

              break;
          }
        }

    //Resolve button interaction successfully
    await interaction.update({ components: (clear_components) ? [] : interaction.message.components });
  }
};
