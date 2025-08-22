module.exports = {
  initGlobal: function () {
    //Declare objects
    if (!main.global) main.global = {};
      if (!main.global.daily_topic) main.global.daily_topic = {};
        if (!main.global.daily_topic.used_indexes) main.global.daily_topic.used_indexes = [];
        if (!main.global.daily_topic.last_topic) main.global.daily_topic.last_topic = new Date().getTime();
      if (!main.global.embeds) main.global.embeds = {};
      if (!main.global.settings) main.global.settings = {}; //Custom server settings

    //Declare tracker variables
    if (!main.last_backup) main.last_backup = new Date().getTime();
    if (!main.starboard) main.starboard = {};
      if (!main.starboard.author_map) main.starboard.author_map = {};
      if (!main.starboard.scoreboard) main.starboard.scoreboard = {};
      if (!main.starboard.star_map) main.starboard.star_map = {};
      if (!main.starboard.starred_messages) main.starboard.starred_messages = [];

    //Declare users object
    if (!main.users) main.users = {};
  }
};
