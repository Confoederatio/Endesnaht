module.exports = {
  selectHandler: async function (arg0_interaction) {
    //Convert from parameters
    var interaction = arg0_interaction;

    //Guard clause to throw out non-select interactions
    if (!interaction.isSelectMenu()) return;

    //Declare local instance variables
    var option_obj = getOption(interaction.values[0]);

    //Effect parser
    if (option_obj.effect)
      applyEffect(interaction, option_obj.effect, option_obj.toggle);
  }
};
