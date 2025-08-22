//Node.js imports
global._ = require("underscore");
global.Canvas = require("canvas");
global.command_handler = require("@discordjs/builders");
global.diacriticless = require("diacriticless");
console.time(`Loading "discord.js" ..`);
global.Discord = require("discord.js");
console.timeEnd(`Loading "discord.js" ..`);
global.fs = require("fs");
global.opus = require("opusscript");
global.path = require("path");
global.REST = require("@discordjs/rest");
global.Routes = require("discord-api-types/v9");
global.voice = require("@discordjs/voice");

//Import Core Framework
const FileManager = require("./core/file_manager");

//Import Core Functions
//Automated Backup and Restoration System (ABRS)
FileManager.import("./ABRS");

//Event handlers - these handle interactions such as buttons/select menus, and slash commands
FileManager.import("./discord/button_handler");
FileManager.import("./discord/command_handler");
FileManager.import("./discord/reaction_handler");
FileManager.import("./discord/select_handler");

//Command files
FileManager.import("./commands/developer_commands");
FileManager.import("./commands/moderation_commands");
FileManager.import("./commands/starboard_commands");
FileManager.import("./commands/status_commands");

//Base JS QOL functions
FileManager.import("./framework/arrays");
FileManager.import("./framework/channels");
FileManager.import("./framework/colours");
FileManager.import("./framework/log");
FileManager.import("./framework/numbers");
FileManager.import("./framework/strings");
FileManager.import("./framework/users");

//Framework files - these contain all the main bot functions, and parsers for common/
FileManager.import("./framework/data/command_framework");
FileManager.import("./framework/data/customs_framework");
FileManager.import("./framework/data/daily_topic_framework");
FileManager.import("./framework/data/embed_framework");
FileManager.import("./framework/data/global_initialisation");
FileManager.import("./framework/data/localisation_framework");
FileManager.import("./framework/data/starboard_framework");
FileManager.import("./framework/data/user_initialisation");

//UI files - these contain the UI functions
FileManager.import("./framework/ui/ui_framework");

//Declare config loading order
global.config = {};
global.localisation = {};
global.load_order = {
  load_directories: [
    "common",
    "gfx",
    "localisation"
  ],
  load_files: [
    ".config_backend.js"
  ]
};
FileManager.loadConfig();
FileManager.loadFile("settings.js");

//Initialise Discord.js client and related instance variables
var intents = new Discord.Intents(Discord.Intents.NON_PRIVILEGED);
  intents.add("GUILDS");
  intents.add("GUILD_MEMBERS");
  intents.add("GUILD_BANS");
  intents.add("GUILD_EMOJIS_AND_STICKERS");
  intents.add("GUILD_INTEGRATIONS");
  intents.add("GUILD_WEBHOOKS");
  intents.add("GUILD_INVITES");
  intents.add("GUILD_VOICE_STATES");
  intents.add("GUILD_PRESENCES");
  intents.add("GUILD_MESSAGES");
  intents.add("GUILD_MESSAGE_REACTIONS");
  intents.add("GUILD_MESSAGE_TYPING");
  intents.add("GUILD_SCHEDULED_EVENTS");

global.backup_loaded = false;
global.client = new Discord.Client({ intents: intents });
global.interfaces = {};

client.login(settings.bot_token);

//Load DB from JSON
loadBackupArray();
loadCommands();
loadMostRecentSave();

//Cache all users
setTimeout(function(){
  //Cache all guilds
  var guilds = client.guilds.cache.map(guild => guild.id);

  for (var i = 0; i < guilds.length; i++)
    client.guilds.cache.get(guilds[i]).members.fetch();

  //Cache all starboard messages
  if (main.starboard)
    if (main.starboard.starred_messages)
      for (var i = 0; i < main.starboard.starred_messages.length; i++) {
        var message_array = main.starboard.starred_messages[i].split("-");

        if (returnChannel(message_array[0]))
          returnChannel(message_array[0]).messages.fetch(message_array[1]);
      }
}, 1000);

//Global error handling
process.on("unhandledRejection", (error) => {
  log.error(`Unhandled promise rejection. ${error.toString()}`);
  console.log(error);
});

//Command handling
client.on("interactionCreate", async (interaction) => {
  buttonHandler(interaction);
  commandHandler(interaction);
  selectHandler(interaction);
});

//Reaction handling
client.on("messageReactionAdd", async (reaction, user) => {
  reactionHandler(reaction, user);
});
client.on("messageReactionRemove", async (reaction, user) => {
  removeReactionHandler(reaction, user);
});

//Content handling
client.on("messageCreate", async (message) => {
  //Fetch local parameters
  username = message.author.username;
  user_id = message.author.id;
  input = message.content;

  //Check output
  log.info(`
    Author: ${username}

    Original Content: ${input}
  `);
});

//Join/Leave handling
client.on("guildMemberAdd", async (member) => {
  sendWelcomeMessage(member);
});
client.on("guildMemberRemove", async (member) => {
  //Check if user is banned
  try {
    returnChannel(settings.departure_channel).guild.bans.fetch(member.id)
      .catch(sendDepartureMessage(member))
      .then(() => {
        sendDepartureMessage(member, true);
      });
  } catch {}
});

//Logic loops, 1-second logic loop
setInterval(function(){
  //Initialise variables before anything else
  initGlobal();

  //ABRS - Save backups!
  var current_date = new Date().getTime();
  var time_difference = current_date - main.last_backup;

  //Backup processing
  if (time_difference > settings.backup_timer*1000) {
    main.last_backup = current_date;
    writeSave({ file_limit: settings.backup_limit });
  }

  //Daily topics
  if (settings.daily_topic)
    dailyTopicCheck();

  //Write to database.js
  try {
    fs.writeFile("database.js", JSON.stringify(main), function (err, data) {
      if (err) return log.console.warn();(err);
    });
  } catch (e) {
    log.error(`Ran into an error whilst attempting to save to database.js! ${e}.`);
    console.log(e);
  }
}, 1000);
