module.exports = {
  //getCommands() - Returns object list of all commands
  getCommands: function () {
    //Declare local instance variables
    var all_command_categories = Object.keys(config.commands);
    var all_commands = [];

    //Iterate through all_command_categories
    for (var i = 0; i < all_command_categories.length; i++) {
      var local_category = config.commands[all_command_categories[i]];
      var all_commands_in_category = Object.keys(local_category);

      for (var x = 0; x < all_commands_in_category.length; x++)
        all_commands.push(local_category[all_commands_in_category[x]]);
    }

    //Return statement
    return all_commands;
  },

  loadCommands: async function () {
    //Declare local instance variables
    var all_command_categories = Object.keys(config.commands);

    //Initialise commands
    var guild_check = setInterval(function(){
      if (client.guilds.cache) {
        var local_guild = client.guilds.cache.get(settings.guild_id);
        var commands = (local_guild) ? local_guild.commands : client.application.commands;

        //Iterate through all_command_categories
        for (var i = 0; i < all_command_categories.length; i++) {
          var local_category = config.commands[all_command_categories[i]];
          var all_commands_in_category = Object.keys(local_category);

          for (var x = 0; x < all_commands_in_category.length; x++) {
            var local_command = local_category[all_commands_in_category[x]];

            commands.create(local_command).then(async (cmd) => {
              log.info(`Initialised ${cmd.name} command!`);

              global.initialised_commands++;
            });
          }
        }

        //All commands initialised!
        clearInterval(guild_check);
        log.info(`Initialised commands for ${local_guild.name}!`);
      }
    }, 3000);
  }
};
