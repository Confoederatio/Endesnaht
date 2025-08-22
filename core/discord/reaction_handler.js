module.exports = {
  reactionHandler: async function (arg0_reaction, arg1_user) {
    //Convert from parameters
    var reaction = arg0_reaction;
    var user = arg1_user;

    //Declare local instance variables
    var is_admin = false;
    var is_moderator = false;
    var message = reaction.message;

    var member = message.guild.members.cache.find(member => member.id == user.id);
    var user_roles = member.roles.cache.map(role => role.id);

    var author_id = reaction.message.author.id;
    var user_id = user.id;

    initUser(author_id);
    initUser(user_id);

    var ot_user = main.users[author_id];
    var usr = main.users[user_id];

    //Fetch perms
    for (var i = 0; i < settings.administrator_roles.length; i++)
      is_admin = (user_roles.includes(settings.administrator_roles[i])) ? true : is_admin;
    for (var i = 0; i < settings.moderator_roles.length; i++)
      is_moderator = (user_roles.includes(settings.moderator_roles[i])) ? true : is_moderator;

    //Reaction handling

    //Admin reactions
    {
      if (!user.bot && (is_admin || is_moderator))
        if (reaction.emoji.name == "❌")
          reaction.message.delete();
    }

    //Starboard reactions
    {
      if (!user.bot)
        if (reaction.emoji.name == config.starboard.starboard_reaction) {
          postStarboardMessage(reaction.message);
          giveStars(user_id, author_id);
        }
    }
  },

  removeReactionHandler: async function (arg0_reaction, arg1_user) {
    //Convert from parameters
    var reaction = arg0_reaction;
    var user = arg1_user;

    //Declare local instance variables
    var author_id = reaction.message.author.id;
    var user_id = user.id;

    initUser(author_id);
    initUser(user_id);

    var ot_user = main.users[author_id];
    var usr = main.users[user_id];

    //Reaction handling

    //Starboard reactions
    {
      if (!user.bot)
        if (reaction.emoji.name == config.starboard.starboard_reaction) {
          postStarboardMessage(reaction.message);
          removeStars(user_id, author_id);
        }
    }
  }
};
