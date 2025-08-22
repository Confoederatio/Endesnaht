module.exports = {
  dailyTopicCheck: function () {
    //Declare local instance variables
    var current_date = new Date().getTime();
    var time_difference = current_date - main.global.daily_topic.last_topic;

    if (time_difference > settings.daily_topic_time*60*60*1000)
      module.exports.sendDailyTopic();
  },

  pickDailyTopic: function () {
    //Declare local instance variables
    var all_topics = JSON.parse(JSON.stringify(config.data.daily_topics));

    //Eliminate topics that have already been used
    for (var i = 0; i < main.global.daily_topic.used_indexes.length; i++)
      removeElement(all_topics, config.data.daily_topics[main.global.daily_topic.used_indexes[i]]);

    //Return statement
    return randomElement(all_topics);
  },

  sendDailyTopic: function () {
    //Declare local instance variables
    var topics_left = config.data.daily_topics.length - main.global.daily_topic.used_indexes.length;

    //Send daily topic
    if (settings.daily_topic && topics_left > 0) {
      var selected_topic = module.exports.pickDailyTopic();
      var selected_topic_index = 0;

      //Fetch selected_topic_index
      for (var i = 0; i < config.data.daily_topics.length; i++)
        if (config.data.daily_topics[i] == selected_topic)
          selected_topic_index = i;

      //Format embed
      var daily_topic_embed = new Discord.MessageEmbed()
        .setColor(settings.bot_colour)
        .setTitle(`❔ Daily Topic`)
        .setDescription(selected_topic)
        .setTimestamp()
        .setFooter({ text: `${parseNumber(topics_left)} Questions Left` });

      //Send embed
      (settings.daily_topic_role.length > 0) ?
        returnChannel(settings.daily_topic_channel).send({ content: `<@&${settings.daily_topic_role}>`, embeds: [daily_topic_embed] }) :
        returnChannel(settings.daily_topic_channel).send({ embeds: [daily_topic_embed] });

      //Mark daily topic as used
      main.global.daily_topic.used_indexes.push(selected_topic_index);
      main.global.daily_topic.last_topic = new Date().getTime();
    }
  }
};
