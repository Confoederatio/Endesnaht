module.exports = {
  ban: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;

    //Declare local instance variables
    var target = interaction.options.getMember("user");
    var reason = interaction.options.getString("reason");
    var days = interaction.options.getNumber("days"); //Must be between 0-7

    //Ban user from guild
    if (target.bannable) {
      try {
        target.ban({
          reason,
          days: days
        });

        await sendPlainEmbed(interaction, `<@${target.id}> was successfully banned from the server.`);
      } catch (e) {
        await sendPlainEmbed(interaction, `<@${target.id}> could not be banned from the server due to the following reason(s): \n\`\`\`${e}\`\`\``);
      }
    } else {
      await sendPlainEmbed(interaction, `<@${target.id}> could not be banned from the server as they were too high up in the role hierarchy.`);
    }
  },

  kick: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;

    //Declare local instance variables
    var target = interaction.options.getMember("user");
    var reason = interaction.options.getString("reason");

    //Kick user from guild
    if (target.kickable) {
      try {
        (reason) ?
          target.kick(reason) :
          target.kick();

        await sendPlainEmbed(interaction, `<@${target.id}> was successfully kicked from the server.`);
      } catch (e) {
        await sendPlainEmbed(interaction, `<@${target.id}> could not be kicked from the server due to the following reason(s): \n\`\`\`${e}\`\`\``);
      }
    } else {
      await sendPlainEmbed(interaction, `<@${target.id}> could not be kicked from the server as they were too high up in the role hierarchy.`);
    }
  },

  unban: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;

    //Declare local instance variables
    var target = interaction.options.getString("user");
    var reason = interaction.options.getString("reason");

    interaction.guild.bans.fetch(target.id).then(async () => {
      try {
        (reason) ?
          interaction.guild.members.unban(target, reason) :
          interaction.guild.members.unban(target);

        await sendPlainEmbed(interaction, `<@${target}> was unbanned from the server.`);
      } catch (e) {
        await sendPlainEmbed(interaction, `<@${target}> could not be unbanned due to the following reason(s): \n\`\`\`${e}\`\`\``);
      }
    }).catch(async () => {
      await sendPlainEmbed(interaction, `<@${target}> is not banned from this server!`);
    });
  }
};
