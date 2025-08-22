module.exports = {
  sendDepartureMessage: async function (arg0_user, arg1_banned) {
    //Convert from parameters
    var guild_user = arg0_user;
    var banned = arg1_banned;

    //Declare local instance variables
    var guild_obj = returnChannel(settings.departure_channel).guild;

    var banned_footers = getList(localisation.customs.banned_footer);
    var banned_messages = getList(localisation.customs.banned_message);
    var banned_titles = getList(localisation.customs.banned_title);
    var departure_footers = getList(localisation.customs.departure_footer);
    var departure_messages = getList(localisation.customs.departure_message);
    var departure_titles = getList(localisation.customs.departure_title);
    var user = guild_user;

    //Localisation template
    var departure_localisation = {
      scopes: {
        server_name: guild_obj.name.toString(),
        user: user.user.username,
        user_mention: `<@${user.id}>`
      }
    };

    //Check if customs are enabled
    if (settings.customs) {
      //Fetch user avatar, colour, join date, and other data
      var user_avatar = user.user.avatarURL({ dynamic: true });
      var user_colour = user.displayHexColor;
      var user_joined = user.joinedAt;

      var user_roles = guild_user.roles.cache
        .filter((roles) => roles.id != returnChannel(settings.departure_channel).guild.id)
        .map((role) => role.toString());

      //Format embed
      var departure_embed = new Discord.MessageEmbed()
        .setColor(user_colour)
        .setThumbnail(user_avatar)
        .addFields(
          {
            name: `User ID:`,
            value: user.id,
            inline: true
          },
          {
            name: `Joined Server:`,
            value: user_joined.toUTCString(),
            inline: true
          },
          {
            name: `Roles:`,
            value: (user_roles.length > 0) ? user_roles.join("\n") : `_No Roles_`,
            inline: true
          }
        )
        .setTimestamp();

      //Check if user was banned
      if (!banned) {
        departure_embed
          .setTitle(parseLocalisation(randomElement(departure_titles), departure_localisation))
          .setDescription(parseLocalisation(randomElement(departure_messages), departure_localisation));

        if (departure_footers.length > 0)
          departure_embed.setFooter(randomElement(departure_footers));
      } else {
        departure_embed
          .setTitle(parseLocalisation(randomElement(banned_titles), departure_localisation))
          .setDescription(parseLocalisation(randomElement(banned_messages), departure_localisation));

        if (banned_footers.length > 0)
          departure_embed.setFooter(randomElement(banned_footers));
      }

      //Send embed
      returnChannel(settings.departure_channel).send({ embeds: [departure_embed] }).then(() => {
        //Removing redundant message
        if (banned)
          returnChannel(settings.departure_channel).messages.fetch({ limit: 2 }).then((messages) => {
            var last_message = [...messages.values()][1];

            last_message.delete();
          });
      });
    }
  },

  sendWelcomeMessage: async function (arg0_user) {
    //Convert from parameters
    var user = arg0_user.user;

    //Declare local instance variables
    var welcome_footers = getList(localisation.customs.welcome_footer);
    var welcome_messages = getList(localisation.customs.welcome_message);
    var welcome_titles = getList(localisation.customs.welcome_title);

    //Check if customs are enabled
    if (settings.customs) {
      //Fetch random title/message
      var current_message = randomElement(welcome_messages);
      var current_title = randomElement(welcome_titles);

      var welcome_embed = new Discord.MessageEmbed()
        .setColor(settings.bot_colour)
        .setTitle(`❗ ${current_title}`)
        .setDescription(parseLocalisation(current_message, {
          scopes: {
            server_name: returnChannel(settings.welcome_channel).guild.name.toString(),
            user: user.username,
            user_mention: `<@${user.id}>`
          }
        }))
        .setTimestamp();

      if (welcome_footers.length > 0)
        welcome_embed.setFooter(randomElement(welcome_footers));

      //Send embed
      returnChannel(settings.welcome_channel).send({ content: `<@${user.id}>`, embeds: [welcome_embed] });
    }
  }
};
