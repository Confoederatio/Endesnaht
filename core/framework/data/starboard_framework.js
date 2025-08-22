module.exports = {
  getStarboardColour: function (arg0_stars) {
    //Convert from parameters
    var stars = arg0_stars - config.starboard.star_threshold;

    //Declare local instance variables
    var colour_differences = [
      config.starboard.maximum_yellow[0] - config.starboard.base_yellow[0],
      config.starboard.maximum_yellow[1] - config.starboard.base_yellow[1],
      config.starboard.maximum_yellow[2] - config.starboard.base_yellow[2]
    ];
    var current_colour = (stars >= config.starboard.star_threshold) ? [
      config.starboard.base_yellow[0] + (colour_differences[0]/100)*config.starboard.colour_increment*stars,
      config.starboard.base_yellow[1] + (colour_differences[1]/100)*config.starboard.colour_increment*stars,
      config.starboard.base_yellow[2] + (colour_differences[2]/100)*config.starboard.colour_increment*stars
    ] : config.starboard.base_yellow;

    //Return current colour
    return RGBToHex(current_colour[0], current_colour[1], current_colour[2]);
  },

  getStarboardIcon: function (arg0_stars) {
    //Convert from parameters
    var stars = arg0_stars;

    //Declare local instance variables
    var all_icon_keys = Object.keys(config.starboard.star_icons);
    var icon = config.starboard.starboard_reaction;

    //Process current icon based on number of stars
    for (var i = 0; i < all_icon_keys.length; i++)
      if (stars >= parseInt(all_icon_keys[i]))
        icon = config.starboard.star_icons[all_icon_keys[i]];

    //Return statement
    return icon;
  },

  getStarScoreboard: function () {
    //Declare local instance variables
    var star_matrix = {};
    var starred_messages = module.exports.getStarLeaderboard();

    //Iterate through all starred messages and append to array after fetching original message
    for (var i = 0; i < starred_messages.length; i++) {
      //Fetch original message author
      var author_id = main.starboard.author_map[starred_messages[i][0]];

      //Add to score in star matrix
      star_matrix[author_id] = (star_matrix[author_id]) ?
        star_matrix[author_id] + starred_messages[i][1] :
        starred_messages[i][1];
    }

    //Convert star_matrix to descending order array
    star_matrix = Object.keys(star_matrix).map((key) => [key, star_matrix[key]]);

    star_matrix.sort((a, b) => b[1] - a[1]);

    //Return statement
    return star_matrix;
  },

  getStarLeaderboard: function () {
    //Declare local instance variables
    var all_starred_messages = Object.keys(main.starboard.scoreboard);
    var starred_array = [];

    //Iterate through all starred messages and append to array
    for (var i = 0; i < all_starred_messages.length; i++)
      starred_array.push([all_starred_messages[i], main.starboard.scoreboard[all_starred_messages[i]]]);

    //Sort array from largest to least (descending order)
    starred_array.sort((a, b) => b[1] - a[1]);

    //Return statement
    return starred_array;
  },

  getStars: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Initialise user object if not defined
    if (!main.users[user_id])
      initUser(user_id);

    //Return statement
    return getSum(main.users[user_id].starboard.stars_received);
  },

  getStarsGiven: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Initialise user object if not defined
    if (!main.users[user_id])
      initUser(user_id);

    //Return statement
    return getSum(main.users[user_id].starboard.stars_given);
  },

  giveStars: function (arg0_user, arg1_author, arg2_stars) {
    //Convert from parameters
    var user_id = arg0_user;
    var author_id = arg1_author;
    var stars = (arg2_stars) ? parseInt(arg2_stars) : 1;

    //Declare local instance variables
    var ot_user = main.users[author_id];
    var usr = main.users[user_id];

    //Add stars if possible
    if (!usr.starboard.stars_given[author_id])
      usr.starboard.stars_given[author_id] = 0;
    usr.starboard.stars_given[author_id] += stars;
    if (!ot_user.starboard.stars_received[user_id])
      ot_user.starboard.stars_received[user_id] = 0;
    ot_user.starboard.stars_received[user_id] += stars;
  },

  postStarboardMessage: async function (arg0_message) {
    //Convert from parameters
    var message_obj = arg0_message;

    //Declare local instance variables
    var star_objects = message_obj.reactions.cache.get(config.starboard.starboard_reaction);

    //Check if message_obj has enough stars
    var message_id = `${message_obj.channel.id}-${message_obj.id}`;
    var reaction_user_cache = [];
    try {
      reaction_user_cache = [...star_objects.users.cache];
    } catch {}
    var self_starred = false;
    var stars = 0;
    try {
      stars = star_objects.count;
    } catch {}

    //Check if message_obj was self-starred
    for (var i = 0; i < reaction_user_cache.length; i++)
      if (reaction_user_cache[i][1].id == message_obj.author.id)
        self_starred = true;

    if (!config.starboard.count_self_stars)
      stars--;

    //Push to main.starboard.starred_messages if not already done
    if (!main.starboard.starred_messages.includes(message_id))
      main.starboard.starred_messages.push(message_id);

    //If the message is over the threshold, post the message to the starboard channel
    var message_attachments = [...message_obj.attachments];
    var message_colour = module.exports.getStarboardColour(stars);
    var message_link = `https://discord.com/channels/${message_obj.channel.id}/${message_obj.id}`;
    var star_icon = module.exports.getStarboardIcon(stars);
    var star_string = `${star_icon} **${parseNumber(stars)}** ¦ <#${message_obj.channel.id}>`;
    var user_avatar = message_obj.author.avatarURL({ dynamic: true });

    //Format embed
    var starboard_embed = new Discord.MessageEmbed()
      .setColor(message_colour)
      .setAuthor({ name: message_obj.author.username, iconURL: user_avatar });

    //Description
    (message_obj.content.length > 0) ?
      starboard_embed.setDescription(`${star_string}\n\n${message_obj.content}`) :
      starboard_embed.setDescription(star_string);
    //Image
    if (message_attachments.length > 0)
      starboard_embed.setImage(message_attachments[0].url);
    //Source
    starboard_embed.addField(`Source`, `[Jump!](${message_link})`);

    //Post embed
    var old_id = main.starboard.star_map[message_obj.id];

    //Track score
    main.starboard.author_map[message_id] = message_obj.author.id;
    main.starboard.scoreboard[message_id] = stars;

    if (stars >= config.starboard.star_threshold) {
      //Determine whether to edit or post a new starboard message
      if (!main.starboard.star_map[message_obj.id]) {
        returnChannel(config.starboard.starboard_channel).send({ embeds: [starboard_embed] }).then((new_message) => {
          main.starboard.star_map[message_obj.id] = new_message.id;
        });
      } else
        returnChannel(config.starboard.starboard_channel).messages.fetch(old_id).then((message) => {
          message.edit({ embeds: [starboard_embed] });
        });
    } else {
      //Delete starboard message now that it went under threshold
      if (main.starboard.star_map[message_obj.id]) {
        returnChannel(config.starboard.starboard_channel).messages.fetch(old_id).then((message) => {
          message.delete();
          delete main.starboard.star_map[message_obj.id];
        });
      }

      //Tombstone caching if all stars have been removed
      if (stars == 0) {
        delete main.starboard.author_map[message_id];
        delete main.starboard.scoreboard[message_id];
      }
    }
  },

  removeStars: function (arg0_user, arg1_author, arg2_stars) {
    //Convert from parameters
    var user_id = arg0_user;
    var author_id = arg1_author;
    var stars = (arg2_stars) ? parseInt(arg2_stars) : 1;

    //Declare local instance variables
    var ot_user = main.users[author_id];
    var usr = main.users[user_id];

    //Remove stars if possible
    if (usr.starboard.stars_given[author_id])
      usr.starboard.stars_given[author_id] += stars;
    if (usr.starboard.stars_given[author_id] <= 0)
      delete usr.starboard.stars_given[author_id];
    if (ot_user.starboard.stars_received[user_id])
      ot_user.starboard.stars_received[user_id] += stars;
    if (ot_user.starboard.stars_received[user_id] <= 0)
      delete ot_user.starboard.stars_received[user_id];
  }
};
