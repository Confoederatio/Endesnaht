module.exports = {
  //This function prints a leaderboard of starred messages, in descending order
  printStarLeaderboard: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;

    //Declare local instance variables
    var starred_messages = getStarLeaderboard();
    var current_page = 0;
    try {
      current_page = interaction.options.getInteger("current_page");
    } catch {}

    //Format leaderboard_string
    var leaderboard_string = [];

    //Default message
    if (starred_messages.length == 0)
      leaderboard_string.push(`.. have you ever tried being funny for once? That's the only way you can get those sweet, sweet stars! You need at least **${parseNumber(config.starboard.star_threshold)}** ${config.starboard.starboard_reaction}'s to make it!`);

    for (var i = 0; i < starred_messages.length; i++) {
      var local_id = starred_messages[i][0].split("-");
      var local_value = starred_messages[i][1];

      if (local_value >= config.starboard.star_threshold)
        leaderboard_string.push(`${getStarboardIcon(local_value)} **${parseNumber(local_value)}** - <@${main.starboard.author_map[starred_messages[i][0]]}> ¦ [Jump!](https://discord.com/channels/${local_id[0]}/${local_id[1]})`);
    }

    //Send reply
    interfaces[`${interaction.id}_cache`] = {
      current_page: (current_page) ? current_page : 1,
      interaction: interaction,
      leaderboard_string: leaderboard_string
    };

    interaction.reply({ content: localisation.blank, fetchReply: true }).then((message) => {
      var local_cache = interfaces[`${interaction.id}_cache`];

      createPageMenu(message, {
        embed_pages: splitEmbed(local_cache.leaderboard_string, {
          title: `Star Leaderboard:`,
          title_pages: true,
          fixed_width: true
        }),
        starting_page: local_cache.current_page,
        user: interaction.user.id
      });
    });
  },

  printStarProfile: async function (arg0_interaction) { //[WIP]
    //Convert from parameters
    var interaction = arg0_interaction;

    //Declare local instance variables
    var user_id = interaction.user.id;
    var usr = main.users[interaction.user.id];

    var stars_given = getSum(usr.starboard.stars_given);
    var stars_received = getSum(usr.starboard.stars_received);

    //Top starred messages
    var starred_messages = getStarLeaderboard();
    var user_starred_messages = [];

    for (var i = 0; i < starred_messages.length; i++) {
      var message_id = starred_messages[i][0].split("-");

      
    }

    //Top enjoyers (Users who have starred you)


    //Most starred users (Users whom you have starred)
  },

  //This function prints a scoreboard of all users with starred messages, in descending order of total score
  printStarScoreboard: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;

    //Declare local instance variables
    var star_scoreboard = getStarScoreboard();
    var current_page = 0;
    try {
      current_page = interaction.options.getInteger("current_page");
    } catch {}

    //Format scoreboard string
    var scoreboard_string = [];

    //Default message
    if (star_scoreboard.length == 0)
      scoreboard_string.push(`Wow! It looks like this server isn't alive enough for anybody to have stars. That sucks.`);

    for (var i = 0; i < star_scoreboard.length; i++)
      scoreboard_string.push(`<@${star_scoreboard[i][0]}> - ${config.starboard.starboard_reaction} **${parseNumber(star_scoreboard[i][1])}**`);

    //Send reply
    interfaces[`${interaction.id}_cache`] = {
      current_page: (current_page) ? current_page : 1,
      interaction: interaction,
      scoreboard_string: scoreboard_string
    };

    interaction.reply({ content: localisation.blank, fetchReply: true }).then((message) => {
      var local_cache = interfaces[`${interaction.id}_cache`];

      createPageMenu(message, {
        embed_pages: splitEmbed(local_cache.scoreboard_string, {
          title: `Star Scoreboard:`,
          title_pages: true,
          fixed_width: true
        }),
        starting_page: local_cache.current_page,
        user: interaction.user.id
      });
    });
  }
};
