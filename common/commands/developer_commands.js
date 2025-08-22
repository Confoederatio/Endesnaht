config.commands.developer = {
  console: {
    name: "console",
    description: "Executes a developer-level console command.",
    options: [
      {
        name: "code",
        description: "The JS code to execute.",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
      }
    ],
    
    defaultPermission: false
  },

  initialise_embeds: {
    name: "initialise-embeds",
    description: "Reinitialises all server information channels.",
    defaultPermission: false
  }
};
