config.commands.starboard = {
  printStarLeaderboard: {
    name: "star-leaderboard",
    description: "Shows a list of the most starred messages.",
    options: [
      {
        name: "starting_page",
        description: "Which page do you want to start at?",
        required: false,
        type: Discord.Constants.ApplicationCommandOptionTypes.INTEGER,
        min_value: 1
      }
    ]
  },

  printStarScoreboard: {
    name: "star-scoreboard",
    description: "Shows a list of the funniest people!",
    options: [
      {
        name: "starting_page",
        description: "Which page do you want to start at?",
        required: false,
        type: Discord.Constants.ApplicationCommandOptionTypes.INTEGER,
        min_value: 1
      }
    ]
  }
};
