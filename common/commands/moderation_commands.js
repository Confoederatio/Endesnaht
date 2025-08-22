config.commands.moderation = {
  ban: {
    name: "ban",
    description: "Bans a user from the server.",
    options: [
      {
        name: "user",
        description: "The user to ban.",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.USER
      },
      {
        name: "reason",
        description: "The reason for banning the user.",
        required: false,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: "days",
        description: "How many days to ban the user for if temp-banning.",
        required: false,
        type: Discord.Constants.ApplicationCommandOptionTypes.INTEGER,
        minValue: 1,
        maxValue: 7
      }
    ],

    defaultPermission: false
  },

  kick: {
    name: "kick",
    description: "Kicks a user from the server.",
    options: [
      {
        name: "user",
        description: "The user to kick.",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.USER
      },
      {
        name: "reason",
        description: "The reason for kicking the user.",
        required: false,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
      }
    ],

    defaultPermission: false
  },

  unban: {
    name: "unban",
    description: "Unbans an already banned user from the server.",
    options: [
      {
        name: "user",
        description: "The user to kick.",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: "reason",
        description: "The reason for kicking the user.",
        required: false,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
      }
    ],

    defaultPermission: false
  }
};
