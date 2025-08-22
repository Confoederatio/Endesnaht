config.embeds.roles = {
  //First layer embed

  role_selection: {
    channel: "685045136425746460",
    type: "single_message",
    visible: true,

    embed_banner: {
      colour: "f6b26b",
      image: {
        url: "https://media.discordapp.net/attachments/977843834576846899/977844068346392586/roles.jpg"
      }
    },
    embed_role_selection: {
      title: "Role Selection.",
      colour: "f6b26b",

      description: [
        "━━━━",
        "",
        "What’s that? You want roles?? Of course you can have roles!",
        "",
        "Take a look at some of these categories and see what’s right for you. Remember to click on green buttons to add roles, and red ones to remove them! You can also check your profile to see which ones you have.",
        "",
        "Okay, that’s all I have to say for now.",
        "",
        "━━━━"
      ]
    },

    buttons: {
      button_activities: {
        title: "Activities",
        icon: "hamburger_menu_no_chevron",
        colour: "blue",

        effect: {
          trigger: "activities"
        }
      },
      button_mature_discussion: {
        title: "Mature/Personal Discussion",
        icon: "open_door",
        colour: "blue",

        effect: {
          trigger: "mature_discussion"
        }
      },
      button_systems_design: {
        title: "Systems Design",
        icon: "scroll_with_pen",
        colour: "blue",

        effect: {
          trigger: "systems_design"
        }
      },
      button_i_want_to_be_staff: {
        title: "I Want To Be Staff!",
        icon: "desk_with_minister",
        colour: "grey",

        effect: {
          trigger: "staff_application",
          must_be_verified: true,
        }
      }
    }
  },

  //Second Layer Embeds

  activities: {
    channel: "685045136425746460",
    type: "ephemeral_message",
    visible: false,

    embed_banner: {
      colour: "f6b26b",
      image: {
        url: "https://media.discordapp.net/attachments/977843834576846899/977844021638610994/role_info_header.png"
      }
    },
    embed_activites: {
      title: "Activities.",
      colour: "f6b26b",

      description: [
        "━━━━",
        "",
        "Activities are things you can do! Channels you can access whenever you’re just feeling bored or you want to take a look around.",
        "",
        "Um. We have art? Counting? A grand-strategy game on Discord? The second saddest museum on Earth? Whatever your cup of milk is - curdled or pasteurised, we’ll be sure to have something for you! Or at least try!",
        "",
        "━━━━"
      ]
    },

    buttons: {
      button_archives: {
        title: "Archives",
        colour: "green",
        icon: "open_book",

        toggle: true,
        effect: {
          apply_role: "1167194126140313670",
          must_be_verified: true
        }
      },
      button_austral_museum: {
        title: "Austral Museum",
        colour: "green",
        icon: "column_icon",

        toggle: true,
        effect: {
          apply_role: "962247170742964246",
          must_be_verified: true
        }
      },
      button_counting: {
        title: "Counting",
        colour: "green",
        icon: "one",

        toggle: true,
        effect: {
          apply_role: "877503844110729228",
          must_be_verified: true
        }
      },
      button_daily_topic: {
        title: "Daily Topic",
        colour: "green",
        icon: "question_mark",

        toggle: true,
        effect: {
          apply_role: "685059191412752390",
          must_be_verified: true
        }
      },
      button_development_projects: {
        title: "Development Projects",
        colour: "green",
        icon: "programming",

        toggle: true,
        effect: {
          apply_role: "1126782233714364507",
          must_be_verified: true
        }
      },
      button_partner_alerts: {
        title: "Partner Alerts",
        colour: "green",
        icon: "ships",

        toggle: true,
        effect: {
          apply_role: "782447435020369940",
          must_be_verified: true
        }
      },
      button_triumph_and_tragedy_alerts: {
        title: "T&T Alerts",
        colour: "green",
        icon: "warning",

        toggle: true,
        effect: {
          apply_role: "700158364822405190",
          must_be_verified: true
        }
      }
    }
  },

  mature_discussion: {
    channel: "685045136425746460",
    type: "ephemeral_message",
    visible: false,

    embed_banner: {
      colour: "f6b26b",
      image: {
        url: "https://media.discordapp.net/attachments/977843834576846899/977844021638610994/role_info_header.png"
      }
    },
    embed_mature_discussion: {
      title: "Mature Discussion.",
      colour: "f6b26b",

      description: [
        "━━━━",
        "",
        "Need a safe place to vent out your frustrations, or offer support? Sensitive and personal discussions are cordoned off in this channel. You can simply opt-out by coming back here at any time.",
        "",
        "━━━━"
      ]
    },

    buttons: {
      button_opt_in: {
        title: "Opt-in.",
        colour: "green",

        trigger: {
          not_role: "877503367180615752"
        },
        effect: {
          apply_role: "877503367180615752",
          must_be_verified: true
        }
      },
      button_opt_out: {
        title: "Opt-out.",
        colour: "red",

        trigger: {
          has_role: "877503367180615752"
        },
        effect: {
          remove_role: "877503367180615752",
          must_be_verified: true
        }
      }
    }
  },

  systems_design: {
    channel: "685045136425746460",
    type: "ephemeral_message",
    visible: false,

    embed_banner: {
      colour: "f6b26b",
      image: {
        url: "https://media.discordapp.net/attachments/977843834576846899/977844021638610994/role_info_header.png"
      }
    },
    embed_systems_design: {
      title: "Systems Design.",
      colour: "f6b26b",

      description: [
        "━━━━",
        "",
        "Systems Design refers to the designing and processing of complex systems - ‘both historical and present-day interaction and modelling of geoeconomics, demography, logistics/tactics, military hardware, political science, technology, geopolitics, and mathematics. In short, how the world works’.",
        "",
        "We don’t really care about any qualifications, though! As long as you have some expertise you can bring to the table or you know a thing or two, welcome aboard! But expect to be pinged frequently if you have this role .. we like to ping it for advice/research.",
        "",
        "━━━━"
      ]
    },

    buttons: {
      button_econ_demography: {
        title: "Econ/Demography",
        colour: "green",
        icon: "germany_nineteenthirtythree",

        toggle: true,
        effect: {
          apply_role: "962208637420441610",
          must_be_verified: true
        }
      },
      button_game_design: {
        title: "Game Design",
        colour: "green",
        icon: "grand_strategy",

        toggle: true,
        effect: {
          apply_role: "962208756396068875",
          must_be_verified: true
        }
      },
      button_graphic_design: {
        title: "Graphic Design.",
        colour: "green",
        icon: "parliamentary_chart",

        toggle: true,
        effect: {
          apply_role: "962208771302645881",
          must_be_verified: true
        }
      },
      button_historical: {
        title: "Historical.",
        colour: "green",
        icon: "judicial_wig",

        toggle: true,
        effect: {
          apply_role: "962208773567561819",
          must_be_verified: true
        }
      }
    }
  },

  staff_application: {
    channel: "685045136425746460",
    type: "ephemeral_message",
    visible: false,

    embed_banner: {
      colour: "f6b26b",
      image: {
        url: "https://media.discordapp.net/attachments/977843834576846899/977844021638610994/role_info_header.png"
      }
    },
    embed_staff_application: {
      title: "Systems Design.",
      colour: "f6b26b",

      description: [
        "━━━━",
        "",
        "Cool! If you want to be staff though, you’ll have to prove your experience, skills or activity first. One or more, obviously.",
        "",
        "Regardless, if you want to get started with the staff application process, you can check it out here: https://forms.gle/UNXQqRvXF5Lna4QE7",
        "",
        "━━━━"
      ]
    }
  }
};
