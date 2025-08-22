module.exports = {
  createPageMenu: function (arg0_message_obj, arg1_options) {
    //Convert from parameters
    var msg = arg0_message_obj;
    var options = arg1_options;

    //Declare local instance variables
    var starting_page = (options.starting_page) ? options.starting_page - 1 : 0;
      starting_page = (starting_page < 0) ? 0 : starting_page;
      if (starting_page > options.embed_pages.length - 1)
        starting_page = options.embed_pages.length - 1;

    if (options.embed_pages) {
      if (options.user) {
        //Add to interface
        global.interfaces[msg.id] = {};
        var ui_obj = interfaces[msg.id];

        ui_obj.type = "page_menu";
        ui_obj.embed_array = options.embed_pages;
        ui_obj.page = (starting_page) ? starting_page : 0;
        ui_obj.user = options.user;

        var add_buttons = [];

        //Create first embed
        if (ui_obj.embed_array.length > 1)
          if (starting_page == 0) {
            add_buttons = ["next_page"];
          } else if (starting_page == options.embed_pages[options.embed_pages.length - 1]) {
            add_buttons = ["last_page"];
          } else {
            add_buttons = ["last_page", "next_page"];
          }

        //Add buttons to embed
        var pagination_row = new Discord.MessageActionRow();

        for (var i = 0; i < add_buttons.length; i++)
          if (add_buttons[i] == "next_page") {
            pagination_row.addComponents(
              new Discord.MessageButton()
                .setCustomId("next_page_btn")
                .setLabel("Next Page")
                .setStyle("PRIMARY")
            );
          } else if (add_buttons[i] == "last_page") {
            pagination_row.addComponents(
              new Discord.MessageButton()
                .setCustomId("last_page_btn")
                .setLabel("Last Page")
                .setStyle("PRIMARY")
            );
          }

        //Edit embed
        msg.edit({
          components: (add_buttons.length > 0) ? [pagination_row] : undefined,
          embeds: [options.embed_pages[starting_page]]
        });
      } else {
        log.error("createPageMenu() encountered an error: 'user' object was not defined!");
      }
    } else {
      log.error("createPageMenu() encountered an error: 'embed_pages' was not defined!");
    }
  },

  formatEmbed: function (arg0_embed_key, arg1_all_embeds, arg2_page_ending, arg3_options) {
    //Convert from parameters
    var local_embed = arg0_embed_key;
    var all_embeds = arg1_all_embeds;
    var page_ending = arg2_page_ending;
    var options = arg3_options;

    //Modify embed
    if (options.footer)
      (Array.isArray(options.footer)) ?
        local_embed.setFooter(options.footer[all_embeds.length]) :
        local_embed.setFooter(options.footer);
    if (options.set_timestamp) local_embed.setTimestamp();
    if (options.thumbnail)
      (Array.isArray(options.thumbnail)) ?
        local_embed.setThumbnail(options.thumbnail[all_embeds.length]) :
        local_embed.setThumbnail(options.thumbnail);
    if (options.title)
      (Array.isArray(options.title)) ?
        local_embed.setTitle(`**${options.title[all_embeds.length]} ${page_ending}**\n${localisation.divider}`) :
        local_embed.setTitle(`**${options.title} ${page_ending}**\n${localisation.divider}`);

    if (options.fixed_width) local_embed.setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

    all_embeds.push(local_embed);
  },

  splitEmbed: function (arg0_array, arg1_options) {
    //Convert from parameters
    var array_string = arg0_array;
    var options = arg1_options;

    //Declare local instance variables
    var all_embeds = [];
    var is_fixed_width = (options.fixed_width);
    var local_array_string = [];
    var maximum_characters_per_embed = (options.maximum_characters) ? options.maximum_characters : 3500;
    var total_page_count = 0;

    //Maximum fields reduction
    if (options.maximum_fields && options.table_width != 2)
      options.maximum_fields--;

    //Error trapping
    try {
      //Split by fields if requested
      if (options.maximum_fields) {
        //Split embeds based on fields
        if (options.fields)
          for (var i = 0; i < options.fields.length; i++) {
            if (options.table_width == 2)
              if ((i + 1) % 2 == 0)
                local_array_string.push({ name: '\u200b', value: '\u200b', inline: true });

            local_array_string.push(options.fields[i]);

            if (i != 0 || options.fields.length == 1)
              if (i % (options.maximum_fields + 1) == 0 || i == options.fields.length-1) {
                total_page_count++;

                //Initialise page embed
                var local_embed = new Discord.MessageEmbed()
                  .setColor(settings.bot_colour)
                  .setDescription(array_string.join("\n"));

                //Declare local options variables
                var page_ending = (options.title && options.title_pages) ? `(Page ${all_embeds.length+1} of ${total_page_count}):` : "";

                formatEmbed(local_embed, all_embeds, page_ending, options);

                //Add fields
                for (var x = 0; x < local_array_string.length; x++)
                  local_embed.addFields(local_array_string[x]);

                local_array_string = [];
              }
          }
      } else {
        //Split by lines if maximum_lines argument is specified, but split by characters otherwise
        if (!options.maximum_lines) {
          var current_character_count = 0;

          //Fetch total page count
          for (var i = 0; i < array_string.length; i++) {
            local_array_string.push(array_string[i]);
            current_character_count += array_string[i].length;

            if (i != 0 || array_string.length == 1)
              if (
                current_character_count >= maximum_characters_per_embed || i == array_string.length-1 &&

                //Check to see that string is not empty
                local_array_string.join("\n").length > 0
              ) {
                total_page_count++;
                current_character_count = 0;
                local_array_string = [];
              }
          }

          //Reset variables
          current_character_count = 0;
          local_array_string = [];

          //Split embeds based on characters
          for (var i = 0; i < array_string.length; i++) {
            local_array_string.push(array_string[i]);
            current_character_count += array_string[i].length;

            if (i != 0 || array_string.length == 1)
              if (
                //Check if page requirements are met
                current_character_count >= maximum_characters_per_embed || i == array_string.length-1 &&

                //Check to see that string is not empty
                local_array_string.join("\n").length > 0
              ) {
                //Initialise page embed
                var local_embed = new Discord.MessageEmbed()
                  .setColor(settings.bot_colour)
                  .setDescription(
                    ((options.description) ?
                      "\n" + options.description.join("\n") :
                      "") +
                    local_array_string.join("\n")
                  );

                //Declare local options variables
                var page_ending = (options.title && options.title_pages) ? `(Page ${all_embeds.length+1} of ${total_page_count}):` : "";

                formatEmbed(local_embed, all_embeds, page_ending, options);
                current_character_count = 0;
                local_array_string = [];
              }
          }
        } else {
          //Split embeds based on lines
          for (var i = 0; i < array_string.length; i++) {
            local_array_string.push(array_string[i]);

            if (i != 0 || array_string.length == 1)
              if (i % options.maximum_lines == 0 || i == array_string.length-1) {
                //Initialise page embed
                var local_embed = new Discord.MessageEmbed()
                  .setColor(settings.bot_colour)
                  .setDescription(local_array_string.join("\n"));

                //Declare local options variables
                var page_ending = (options.title && options.title_pages) ? `(Page ${all_embeds.length+1} of ${total_page_count}):` : "";

                formatEmbed(local_embed, all_embeds, page_ending, options);
                local_array_string = [];
              }
          }
        }
      }

      //Return statement
      return all_embeds;
    } catch (e) {
      log.error(`Ran into an error whilst parsing embed at splitEmbed(): ${e}`);
      console.log(e);
    }
  },

  sendPlainEmbed: async function (arg0_interaction, arg1_contents, arg2_options) {
    //Convert from parameters
    var interaction = arg0_interaction;
    var contents = arg1_contents;
    var options = (arg2_options) ? arg2_options : { ephemeral: true };

    //Parse options
    if (!options.ephemeral)
      options.ephemeral = true;

    //Send simple embed if contents are valid
    if (typeof contents == "string" || typeof contents == "number") {
      const embed_simple = new Discord.MessageEmbed()
        .setColor(settings.bot_colour)
        .setDescription(contents);

      await interaction.reply({ embeds: [embed_simple], ephemeral: options.ephemeral });
    }
  }
};
