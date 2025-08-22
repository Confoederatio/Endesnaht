module.exports = {
  commandHandler: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;

    //Guard clause to throw out non-slash commands
    if (!interaction.isCommand()) return;

    //Developer commands
    {
      if (interaction.commandName == "console")
        consoleCommand(interaction);
      if (interaction.commandName == "initialise-embeds")
        initialiseEmbedsCommand(interaction);
    }

    //Moderation commands
    {
      if (interaction.commandName == "ban")
        ban(interaction);
      if (interaction.commandName == "kick")
        kick(interaction);
      if (interaction.commandName == "unban")
        unban(interaction);
    }

    //Starboard commands
    {
      if (interaction.commandName == "star-leaderboard")
        printStarLeaderboard(interaction);
      if (interaction.commandName == "star-scoreboard")
        printStarScoreboard(interaction);
    }

    //Status commands
    {
      if (interaction.commandName == "ping")
        ping(interaction);
    }
  }
};
