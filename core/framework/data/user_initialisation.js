module.exports = {
  initUser: function (arg0_user) {
    //Convert from parameters
    var user_id = arg0_user;

    //Declare undefined variables
    if (!main.users[user_id]) main.users[user_id] = {};

    //Declare local instance variables
    var usr = main.users[user_id];

    //Declare local tracker variables
    if (!usr.id) usr.id = user_id;

    if (!usr.starboard) usr.starboard = {};
      if (!usr.starboard.stars_given) usr.starboard.stars_given = {};
      if (!usr.starboard.stars_received) usr.starboard.stars_received = {};
  }
};
