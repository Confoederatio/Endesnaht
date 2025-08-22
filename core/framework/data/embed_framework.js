module.exports = {
  applyEffect: async function (arg0_interaction, arg1_effect_obj, arg2_toggle) {
    //Convert from parameters
    var interaction = arg0_interaction;
    var effect_obj = arg1_effect_obj;
    var toggle = arg2_toggle;

    //Declare local instance variables
    var all_effects = Object.keys(effect_obj);
    var meets_conditions = [true, ""]; //[meets_conditions, error_message];
    var user_id = interaction.user.id;
    var user_obj = interaction.guild.members.cache.find(user => user.id == interaction.user.id);

    //Parse effectual conditions
    for (var i = 0; i < all_effects.length; i++) {
      var local_value = getList(effect_obj[all_effects[i]]);

      //must_be_verified
      if (all_effects[i] == "must_be_verified")
        if (local_value[0])
          if (user_obj.roles.cache.has(settings.verification_role))
            meets_conditions = [true, ""];
        else
          if (!user_obj.roles.cache.has(settings.verification_role))
            meets_conditions = [false, `You must be verified first before you can perform this action!`];
    }

    //Parse effects
    if (meets_conditions[0]) {
      //Toggle switch
      if (toggle) {
        var new_effect_obj = JSON.parse(JSON.stringify(effect_obj));

        //apply_role toggle
        for (var i = 0; i < all_effects.length; i++) {
          var local_value = getList(effect_obj[all_effects[i]]);

          if (all_effects[i] == "apply_role") {
            var has_a_role = false;

            for (var x = 0; x < local_value.length; x++)
              if (user_obj.roles.cache.has(local_value[x]))
                has_a_role = true;

            if (has_a_role)
              new_effect_obj.remove_role = effect_obj.apply_role;
          }

          //remove_role toggle
          if (all_effects[i] == "remove_role") {
            var has_a_role = false;

            for (var x = 0; x < local_value.length; x++)
              if (user_obj.roles.cache.has(local_value[x]))
                has_a_role = true;

            if (has_a_role)
              new_effect_obj.apply_role = new_effect_obj.remove_role;
          }
        }

        //Refresh effect_obj
        effect_obj = new_effect_obj;
        all_effects = Object.keys(new_effect_obj);
      }

      //Parse regular keys
      for (var i = 0; i < all_effects.length; i++) {
        var local_value = getList(effect_obj[all_effects[i]]);

        //apply_role
        if (all_effects[i] == "apply_role")
          for (var x = 0; x < local_value.length; x++)
            user_obj.roles.add(local_value[x]);

        //trigger
        if (all_effects[i] == "trigger")
          for (var x = 0; x < local_value.length; x++) {
            var local_embed = module.exports.postEmbed(local_value[x], user_id);

            await interaction.reply({ embeds: local_embed.embeds, components: local_embed.components, ephemeral: true });
          }

        //remove_role
        if (all_effects[i] == "remove_role")
          for (var x = 0; x < local_value.length; x++)
            try {
              user_obj.roles.remove(local_value[x]);
            } catch {}

        //reply
        if (all_effects[i] == "reply") {
          const embed_simple = new Discord.MessageEmbed()
            .setColor(settings.interaction_colour)
            .setDescription(local_value[0]);

          await interaction.reply({ embeds: [embed_simple], ephemeral: true });
        }
      }

      //Reload buttons
      var new_embed = module.exports.postEmbed(
        module.exports.getEmbedFromButtonName(interaction.customId, { return_key: true }),
        user_id,
        true, //Don't post embed
        [interaction.customId]
      );

      interaction.update({ embeds: new_embed.embeds, components: new_embed.components });
    } else
      await interaction.reply({ content: meets_conditions[1], ephemeral: true });
  },

  /*
    getButton() - Returns a button key/object based on the provided name.
    options: {
      return_key: true/false - Whether or not to return a key or object. Defaults to false
    }
  */
  getButton: function (arg0_button_name, arg1_options) {
    //Convert from parameters
    var button_name = arg0_button_name.toLowerCase().trim();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var button_found = [false, ""]; //[button_found, button_obj];
    var embed_list = module.exports.getEmbeds();

    //Soft-match first
    for (var i = 0; i < embed_list.length; i++)
      if (embed_list[i].buttons) {
        var all_buttons = Object.keys(embed_list[i].buttons);

        for (var x = 0; x < all_buttons.length; x++)
          if (all_buttons[x].indexOf(button_name) != -1)
            button_found = [true, (!options.return_key) ? embed_list[i].buttons[all_buttons[x]] : all_buttons[x]];
      }

    //Hard-match second
    for (var i = 0; i < embed_list.length; i++)
      if (embed_list[i].buttons) {
        var all_buttons = Object.keys(embed_list[i].buttons);

        for (var x = 0; x < all_buttons.length; x++)
          if (all_buttons[x].toLowerCase().trim() == button_name)
            button_found = [true, (!options.return_key) ? embed_list[i].buttons[all_buttons[x]] : all_buttons[x]];
      }

    //Return statement
    return (button_found[0]) ? button_found[1] : undefined;
  },

  /*
    getEmbed() - Returns an embed key/object based on the provided name.
    options: {
      return_key: true/false - Whether or not to return a key or object. Defaults to false
    }
  */
  getEmbed: function (arg0_embed_name, arg1_options) {
    //Convert from parameters
    var embed_name = arg0_embed_name.toLowerCase();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_embed_categories = Object.keys(config.embeds);
    var embed_found = [false, ""]; //[embed_found, embed_obj];

    //Soft-match first
    for (var i = 0; i < all_embed_categories.length; i++) {
      var local_embed_category = config.embeds[all_embed_categories[i]];
      var local_embeds = Object.keys(local_embed_category);

      for (var x = 0; x < local_embeds.length; x++)
        if (local_embeds[x].indexOf(embed_name) != -1)
          embed_found = [true, (!options.return_key) ? local_embed_category[local_embeds[x]] : local_embeds[x]];
    }

    //Hard-match second
    for (var i = 0; i < all_embed_categories.length; i++) {
      var local_embed_category = config.embeds[all_embed_categories[i]];
      var local_embeds = Object.keys(local_embed_category);

      for (var x = 0; x < local_embeds.length; x++)
        if (local_embeds[x] == embed_name)
          embed_found = [true, (!options.return_key) ? local_embed_category[local_embeds[x]] : local_embeds[x]];
    }

    //Return statement
    return (embed_found[0]) ? embed_found[1] : undefined;
  },

  /*
    getEmbedFromButtonName() - Returns an embed key/object based on the button name.
    options: {
      return_key: true/false - Whether or not to return a key or object. Defaults to false
    }
  */
  getEmbedFromButtonName: function (arg0_button_name, arg1_options) {
    //Convert from parameters
    var button_name = arg0_button_name.toLowerCase().trim();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var embed_found = [false, ""]; //[embed_found, embed_obj];
    var embed_list = module.exports.getEmbeds();
    var embed_namelist = module.exports.getEmbeds({ return_names: true });

    //Soft-match first
    for (var i = 0; i < embed_list.length; i++)
      if (embed_list[i].buttons) {
        var all_buttons = Object.keys(embed_list[i].buttons);

        for (var x = 0; x < all_buttons.length; x++)
          if (all_buttons[x].indexOf(button_name) != -1)
            embed_found = [true, (!options.return_key) ? embed_list[i] : embed_namelist[i]];
      }

    //Hard-match second
    for (var i = 0; i < embed_list.length; i++)
      if (embed_list[i].buttons) {
        var all_buttons = Object.keys(embed_list[i].buttons);

        for (var x = 0; x < all_buttons.length; x++)
          if (all_buttons[x].toLowerCase().trim() == button_name)
            embed_found = [true, (!options.return_key) ? embed_list[i] : embed_namelist[i]];
      }

    //Return statement
    return (embed_found[0]) ? embed_found[1] : undefined;
  },

  /*
    getEmbeds() - Returns an array of keys/objects.
    options: {
      return_names: true/false - Whether or not to return the keys of the individual embeds
    }
  */
  getEmbeds: function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var all_embeds = [];
    var all_embed_categories = Object.keys(config.embeds);

    //Iterate over all categories and embeds in them
    for (var i = 0; i < all_embed_categories.length; i++) {
      var local_embed_category = config.embeds[all_embed_categories[i]];
      var local_embeds = Object.keys(local_embed_category);

      for (var x = 0; x < local_embeds.length; x++)
        all_embeds.push((!options.return_names) ? local_embed_category[local_embeds[x]] : local_embeds[x]);
    }

    //Return statement
    return all_embeds;
  },

  /*
    getOption() - Returns a select menu option key/object based on the provided name.
    options: {
      return_key: true/false - Whether or not to return a key or object. Defaults to false
    }
  */
  getOption: function (arg0_option_name, arg1_options) {
    //Convert from parameters
    var option_name = arg0_option_name.toLowerCase().trim();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var option_found = [false, ""]; //[option_found, option_obj];
    var embed_list = module.exports.getEmbeds();

    //Soft-match first
    for (var i = 0; i < embed_list.length; i++)
      if (embed_list[i].select_menus) {
        var all_select_menus = Object.keys(embed_list[i].select_menus);

        for (var x = 0; x < all_select_menus.length; x++) {
          var select_menu_obj = embed_list[i].select_menus[all_select_menus[x]];
          var all_options = Object.keys(select_menu_obj);

          for (var y = 0; y < all_options.length; y++)
            if (all_options[y].indexOf(option_name) != -1)
              option_found = [true, (!options.return_key) ? select_menu_obj[all_options[y]] : all_options[y]];
        }
      }

    //Hard-match second
    for (var i = 0; i < embed_list.length; i++)
      if (embed_list[i].select_menus) {
        var all_select_menus = Object.keys(embed_list[i].select_menus);

        for (var x = 0; x < all_select_menus.length; x++) {
          var select_menu_obj = embed_list[i].select_menus[all_select_menus[x]];
          var all_options = Object.keys(select_menu_obj);

          for (var y = 0; y < all_options.length; y++)
            if (all_options[y] == option_name)
              option_found = [true, (!options.return_key) ? select_menu_obj[all_options[y]] : all_options[y]];
        }
      }

    //Return statement
    return (option_found[0]) ? option_found[1] : undefined;
  },

  /*
    getSelectMenu() - Returns a select menu key/object based on the provided name.
    options: {
      return_key: true/false - Whether or not to return a key or object. Defaults to false
    }
  */
  getSelectMenu: function (arg0_select_menu_name, arg1_options) {
    //Convert from parameters
    var select_menu_name = arg0_select_menu_name.toLowerCase().trim();
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var select_menu_found = [false, ""]; //[menu_found, menu_obj];
    var embed_list = module.exports.getEmbeds();

    //Soft-match first
    for (var i = 0; i < embed_list.length; i++)
      if (embed_list[i].select_menus) {
        var all_select_menus = Object.keys(embed_list[i].select_menus);

        for (var x = 0; x < all_select_menus.length; x++)
          if (all_select_menus[x].indexOf(select_menu_name) != -1)
            select_menu_found = [true, (!options.return_key) ? embed_list[i].select_menus[all_select_menus[x]] : all_select_menus[x]];
      }

    //Hard-match second
    for (var i = 0; i < embed_list.length; i++)
      if (embed_list[i].select_menus) {
        var all_select_menus = Object.keys(embed_list[i].select_menus);

        for (var x = 0; x < all_select_menus.length; x++)
          if (all_select_menus[x] == select_menu_name)
            select_menu_found = [true, (!options.return_key) ? embed_list[i].select_menus[all_select_menus[x]] : all_select_menus[x]];
      }

    //Return statement
    return (select_menu_found[0]) ? select_menu_found[1] : undefined;
  },

  postEmbed: function (arg0_embed_name, arg1_user, arg2_do_not_post, arg3_updated_buttons) {
    //Convert from parameters
    var embed_name = arg0_embed_name;
    var user_id = arg1_user;
    var dont_post = arg2_do_not_post;
    var updated_buttons = (arg3_updated_buttons) ? arg3_updated_buttons : [];

    //Declare local instance variables
    var embed_array = [];
    var embed_obj = module.exports.getEmbed(embed_name);
    var guild_obj = returnChannel(embed_obj.channel).guild;
    var user_obj = (user_id) ? guild_obj.members.cache.find(user => user.id == user_id) : undefined;

    //Post embed, buttons and all
    var all_embeds = Object.keys(embed_obj);

    for (var i = 0; i < all_embeds.length; i++)
      if (all_embeds[i].startsWith("embed_")) {
        var local_embed_obj = embed_obj[all_embeds[i]];

        embed_array.push(module.exports.toEmbed(local_embed_obj));
      }

    //All buttons will always be visible, no matter conditions
    var component_rows = [];

    //Buttons
    if (embed_obj.buttons) {
      var all_buttons = Object.keys(embed_obj.buttons);

      for (var i = 0; i < all_buttons.length; i += 5) {
        var button_obj_array = [];
        var button_row = new Discord.MessageActionRow();
        var current_button_row = all_buttons.slice(i, i + 5);

        for (var x = 0; x < current_button_row.length; x++) {
          var button_obj = embed_obj.buttons[current_button_row[x]];
          var local_button_obj = new Discord.MessageButton()
            .setCustomId(current_button_row[x]);

          if (button_obj.colour)
            local_button_obj.setStyle(config.button_colours[button_obj.colour]);
          if (button_obj.icon)
            try {
              local_button_obj.setEmoji(stripNonNumerics(config.icons[button_obj.icon]));
            } catch {
              log.error(`Could not strip non-numerics!`);
              console.log(button_obj.icon);
              console.log(config.icons[button_obj.icon]);
            }
          if (button_obj.title)
            local_button_obj.setLabel(button_obj.title);

          //Check if button is disabled
          if (user_id)
            if (button_obj.trigger) {
              var all_checks = Object.keys(button_obj.trigger);
              var checks_passed = 0;

              for (var y = 0; y < all_checks.length; y++) {
                var local_value = getList(button_obj.trigger[all_checks[y]]);

                //Check each condition
                //has_role
                if (all_checks[y] == "has_role") {
                  var local_checks = 0;

                  for (var z = 0; z < local_value.length; z++)
                    if (user_obj.roles.cache.has(local_value[z]))
                      local_checks++;

                  if (local_checks >= local_value.length)
                    checks_passed++;
                }

                //not_role
                if (all_checks[y] == "not_role") {
                  var local_checks = 0;

                  for (var z = 0; z < local_value.length; z++)
                    if (!user_obj.roles.cache.has(local_value[z]))
                      local_checks++;

                  if (local_checks >= local_value.length)
                    checks_passed++;
                }
              }

              //Trigger resolved to false
              if (checks_passed < all_checks.length)
                local_button_obj.setDisabled(true);
            }

          //Check for toggle
          if (user_id)
            if (button_obj.toggle)
              if (button_obj.effect)
                if (button_obj.effect.apply_role) {
                  var local_value = getList(button_obj.effect.apply_role);
                  var role_checks = 0;

                  for (var y = 0; y < local_value.length; y++)
                    if (user_obj.roles.cache.has(local_value[y])) role_checks++;

                  //If it doesn't add up, set colour to red
                  if (updated_buttons.includes(current_button_row[x])) {
                    log.info(`Role Checks: ${role_checks}, Local Value: ${local_value.length}`);

                    if (role_checks < local_value.length)
                      local_button_obj.setStyle(config.button_colours[settings.toggle_negative_colour]);
                  } else
                    if (role_checks >= local_value.length)
                      local_button_obj.setStyle(config.button_colours[settings.toggle_negative_colour]);
                }

          button_obj_array.push(local_button_obj);
        }

        //Add new buttons to button_row
        button_row.addComponents(...button_obj_array);
        component_rows.push(button_row);
      }
    }

    //Select menus - must be on separate row from buttons
    if (embed_obj.select_menus) {
      var all_select_menus = Object.keys(embed_obj.select_menus);

      //Only one select menu per action row
      for (var i = 0; i < all_select_menus.length; i++) {
        var select_obj = embed_obj.select_menus[all_select_menus[i]];
        var select_options = [];
        var select_row = new Discord.MessageActionRow();

        var all_options = Object.keys(select_obj);

        for (var x = 0; x < all_options.length; x++)
          if (all_options[x].startsWith("option_")) {
            var local_option = { value: all_options[x] };
            var option_obj = select_obj[all_options[x]];

            if (option_obj.default)
              local_option.default = true;
            if (option_obj.description)
              local_option.description = option_obj.description;
            if (option_obj.icon)
              local_option.emoji = stripNonNumerics(config.icons[option_obj.icon]);
            if (option_obj.name)
              local_option.label = option_obj.name;

            select_options.push(local_option);
          }

        //Add all options to select menu
        var select_menu = new Discord.MessageSelectMenu()
          .setCustomId(all_select_menus[i])
          .setPlaceholder((select_obj.placeholder) ? select_obj.placeholder : "Choose an option ..")
          .addOptions(select_options);

        //Create component row and push
        select_row.addComponents(select_menu);
        component_rows.push(select_row);
      }
    }

    //Send message
    if (embed_obj.visible && !dont_post)
      returnChannel(embed_obj.channel).send({ embeds: embed_array, components: component_rows });

    //Return statement
    return { embeds: embed_array, components: component_rows };
  },

  toEmbed: function (arg0_embed_obj) {
    //Convert from parameters
    var embed_obj = arg0_embed_obj;

    //Declare local instance variables
    var local_embed = new Discord.MessageEmbed()
      .setImage("https://cdn.discordapp.com/attachments/722997700391338046/736141424315203634/margin.png");

    //Arguments and parameters
    if (embed_obj.author)
      local_embed.setAuthor(embed_obj.author);
    if (embed_obj.colour)
      local_embed.setColor(`#${embed_obj.colour}`);
    if (embed_obj.description)
      local_embed.setDescription(getList(embed_obj.description).join("\n"));
    if (embed_obj.fields)
      local_embed.addFields(...embed_obj.fields);
    if (embed_obj.footer)
      local_embed.setFooter(embed_obj.footer);
    if (embed_obj.image)
      if (embed_obj.image.url)
        local_embed.setImage(embed_obj.image.url);
    if (embed_obj.thumbnail)
      if (embed_obj.thumbnail.url)
        local_embed.setThumbnail(embed_obj.thumbnail.url);
    if (embed_obj.timestamp)
      local_embed.setTimestamp();
    if (embed_obj.url)
      local_embed.setURL(embed_obj.url);

    //Return statement
    return local_embed;
  },
};
