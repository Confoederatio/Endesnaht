config.starboard = {
  //Colours and cosmetics
  base_yellow: [255, 255, 200],
  colour_increment: 10, //Increments by this many % in terms of RGB difference per star
  maximum_yellow: [255, 255, 0],
  star_icons: {
    5: "🌟",
    7: "✨",
    10: "💫",
    20: "🌠"
  }, //At what star amounts should these star icons be applied? (starboard_reaction is taken as default)

  //General config
  count_self_stars: true,
  star_threshold: 2,
  starboard_channel: "588865553943494657",
  starboard_reaction: "⭐"
};
