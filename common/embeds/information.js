config.embeds.information = {
  //First Layer Embed

  information_hub: {
    channel: "549000552013496340",
    type: "single_message",
    visible: true,

    embed_banner: {
      colour: "e6e6e6",
      image: {
        url: "https://cdn.discordapp.com/attachments/723000409224118332/974325915968475147/midnaht_welcome_banner.jpg"
      }
    },
    embed_information: {
      title: "Information.",
      colour: "e6e6e6",

      description: [
        "━━━━",
        "# Hello;",
        "Welcome to **Midnight**!",
        "",
        "Some servers are just for talking. Boring, isn't it? Here at Midnight we specialise both in creating tools to create and recreational fun. Server-mandated, you might say.",
        "",
        "You're automatically verified. But please, click some of our buttons to give yourself more roles and find out more about us.",
        "",
        "━━━━"
      ]
    },

    buttons: {
      button_about_the_server: {
        title: "About The Server",
        icon: "hamburger_menu_no_chevron",
        colour: "blue",

        effect: {
          trigger: "about_the_server"
        }
      },
      button_faq: {
        title: "FAQ",
        icon: "question_mark",
        colour: "blue",

        effect: {
          trigger: "faq"
        }
      },
      button_our_games: {
        title: "Our Software",
        icon: "gamechanger_logo",
        colour: "blue",

        effect: {
          trigger: "our_software"
        }
      },
      button_role_information: {
        title: "Role Information",
        icon: "busts_in_silhouette",
        colour: "blue",

        effect: {
          trigger: "role_information"
        }
      }
    }
  },

  //Second Layer Embeds

  about_the_server: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_banner: {
      colour: "4e9082",
      image: {
        url: "https://media.discordapp.net/attachments/977843834576846899/977843899936698408/about.jpg"
      }
    },
    embed_about_the_server: {
      title: "About the Server.",
      colour: "4e9082",

      description: [
        "━━━━",
        "",
        "We’re a technocratic server that focuses on designing experiences for our members by pushing Discord to its limits through custom bots that can work wonders. So you can play entire desktop-level games right here, without ever leaving this server. Even on mobile! How cool’s that?",
        "",
        "Unfortunately, we only have one programmer right now. That means we need a lot more if we’re gonna get anywhere! If you have any coding skills - especially with JS, please get in touch. Or if you know anybody that might be interested in our projects, they’re all open-source!",
        "",
        "You can check <#588607960461082636> for more if you’re curious. And remember to check back here from time to time for something new!",
        "",
        "━━━━"
      ]
    },

    buttons: {
      button_austral_museum_page: {
        title: "Austral Museum",
        icon: "classical_building",
        colour: "blue",

        effect: {
          trigger: "austral_museum"
        }
      },
      button_socials: {
        title: "Socials",
        icon: "busts_in_silhouette",
        colour: "blue",

        effect: {
          trigger: "socials"
        }
      },
      button_staff_members: {
        title: "Staff Members",
        icon: "judicial_wig",
        colour: "blue",

        effect: {
          trigger: "staff_members"
        }
      }
    }
  },

  faq: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_banner: {
      colour: "4e9082",
      image: {
        url: "https://media.discordapp.net/attachments/977843834576846899/977843979154489354/faq_header.png"
      }
    },
    embed_faq: {
      title: "FAQ",
      colour: "4e9082",

      description: [
        "━━━━",
        "",
        "Hey, welcome to the Questions Corner! Um. Just click anything in that dropdown to ask a question and get your answer!",
        "",
        "━━━━"
      ]
    },

    select_menus: {
      select_menu_questions: {
        placeholder: "Choose a question ..",

        option_does_this_server_have_an_invite_link: {
          name: "Does this server have an invite link?",
          icon: "question_mark",

          effect: {
            trigger: "faq_does_this_server_have_an_invite_link"
          }
        },
        option_how_can_i_become_staff: {
          name: "How can I become staff?",
          icon: "question_mark",

          effect: {
            trigger: "faq_how_can_i_become_staff"
          }
        },
        option_how_can_i_mod_t_and_t: {
          name: "How can I mod T&T?",
          icon: "question_mark",

          effect: {
            trigger: "faq_how_can_i_mod_t_and_t"
          }
        },
        option_how_do_i_get_started_with_t_and_t: {
          name: "How do I get started with T&T?",
          icon: "question_mark",

          effect: {
            trigger: "faq_how_do_i_get_started_with_t_and_t"
          }
        },
        option_whats_there_to_do_on_this_server: {
          name: "What's there to do on this server?",
          icon: "question_mark",

          effect: {
            trigger: "whats_there_to_do_on_this_server"
          }
        },
        option_who_can_i_contact_for_help: {
          name: "Who can I contact for help?",
          icon: "question_mark",

          effect: {
            trigger: "who_can_i_contact_for_help"
          }
        }
      }
    }
  },

  our_software: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_banner: {
      colour: "4e9082",
      image: {
        url: "https://media.discordapp.net/attachments/977843834576846899/977844020850065408/our_games_header.png"
      }
    },
    embed_our_software: {
      title: "Our Software.",
      colour: "4e9082",

      description: [
        "━━━━",
        "",
        "Did you know we produce games and productive software? Including botgames that you can play right here on Discord? It’s true!",
        "",
        "You can explore our main games/projects here or ask around in <#588607960461082636> for more information.",
        "",
        "━━━━"
      ]
    },

    buttons: {
      button_balance_of_power: {
        title: "Balance of Power",
        icon: "pen_writing",
        colour: "blue",

        effect: {
          trigger: "balance_of_power"
        }
      },
      button_germany_1933: {
        title: "Naissance",
        icon: "coat_of_arms",
        colour: "blue",

        effect: {
          trigger: "naissance"
        }
      },
      button_triumph_and_tragedy: {
        title: "Triumph & Tragedy",
        icon: "triumph_and_tragedy",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy"
        }
      }
    }
  },

  role_information: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_banner: {
      colour: "4e9082",
      image: {
        url: "https://media.discordapp.net/attachments/977843834576846899/977844021638610994/role_info_header.png"
      }
    },
    embed_role_information: {
      title: "Role Information.",
      colour: "4e9082",

      description: [
        "Interested in what roles we have and what they do? Well, here’s the quick rundown for each of them.",
        "",
        "**Staff:**",
        "",
        "> <@&549011920863363073> - The owner of the server! Always friendly and willing to help.",
        "> ",
        "> <@&962206130233282600> - The most important staff members are here. They help develop bots for the server and advance technology!",
        "> <@&549011413843050529> - Active developers who expend blood, toil, tears, and sweat into their labour, all so you can taste their sweet, sweet fruit!",
        "> <@&805513391627436103> - The least important staff members are here. They’re lazy.",
        "> ",
        "> <@&706310763211653160> - Expected to spread the word. They also manage social media profiles and partnerships.",
        "> <@&805514039098212372> - Manages our social media presence.",
        "> <@&805514132749025281> - Manages Partnerships! If you’re looking for one, these are your guys to contact.",
        "> ",
        "> <@&549011283609911316> - Keeping the server clean! Squeaky!",
        "> <@&961809432210206783> - Helps provide advice to the owner and bot devs. Think of them as community ambassadors!",
        "",
        "-",
        "",
        "**Members:**",
        "",
        "> <@&962208533049401364> - These people are expected to know a lot, and are expected to know they’ll be pinged frequently for words of advice! To be precise, they help model **complex systems** through a system dynamics approach. Think of them as researchers for our botgames!",
        "> ",
        "> <@&962208637420441610> - These people are expected to know a lot about geodemographic economics. Wait, is that even a valid set of words?",
        "> <@&962208771302645881> - From gameplay balancing to intuitive deep complexity, these people should .. be able to .. hm, figure this .. out, right?",
        "> <@&962208773567561819> - If it’s your passion, it’s here! Okay, but seriously. We at least expect you to know about minimalism and period/experience-oriented design.",
        "> <@&962208773567561819> - These people study the operation of complex systems historically and help us model them! It’s not easy.",
        "> ",
        "> <@&549011259509440522> - Active pillars of the community.",
        "> <@&549011232133349376> - The Third Estate.",
        "> <@&583498984719515675> - Beep boop. Boop beep?",
        "",
        "Remember, if you want roles, head over to <#685045136425746460>. Eat ‘em up, eat ‘em up, eat ‘em up!"
      ]
    }
  },

  //Third Layer Embeds

  austral_museum: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_austral_museum: {
      title: "Austral Museum.",
      colour: "4e9082",

      description: [
        "━━━━",
        "",
        "The Austral Museum is a hodgepodge collection of art we make, history stuffs and writing, and anything else we’re proud of! Or at least mostly proud of.",
        "",
        "The Museum is currently split into three halls! The <#964504182625296415>, the <#964504257275494461>, and the <#964504158474494022>.",
        "",
        "Each one is subdivided into **Exhibits**, which are actually just threads. You can get around them by going into a central hub thread, or by clicking on the thread icon to the left of the bell.",
        "",
        "Make sure to check out <#685045136425746460> for your free admission!",
        "",
        "━━━━"
      ],
    }
  },

  balance_of_power: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_banner: {
      colour: "4e9082",
      image: {
        url: "https://media.discordapp.net/attachments/723000409224118332/1169708619814686802/Midnaht_Conceptual_Design3.png"
      }
    },
    embed_balance_of_power: {
      title: "Grand-strategy on Minecraft.",
      colour: "4e9082",
      description: [
        "━━━━",
        "",
        "You shouldn't be mining cobblestone for another hut in your city when you're playing as the leader of a great Minecraft empire.",
        "",
        "That's ridiculous. Here at Midnight, we're working on a planned Minecraft server to allow leaders to build massive, sprawling settlements city-builder style whilst commanding thousands of NPC troops and setting up complex supply chains.",
        "",
        "If you would like to help develop this server, please let either <@507021242663043082> or <@213287117017710593> know.",
        "",
        "━━━━"
      ]
    }
  },

  faq_does_this_server_have_an_invite_link: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_answer: {
      title: "Does this server have an invite link?",
      colour: "4e9082",
      description: [
        "**Of course!** We just have invites restricted to the <#549000552013496340> channel since we don’t want people seeing nonexistent channels or blank screens they can’t access since they aren’t verified yet.",
        "",
        "That invite link is <https://discord.gg/R9Q6xJb> by the way! Have fun inviting whomever you want!"
      ]
    }
  },

  faq_how_can_i_become_staff: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_answer: {
      title: "Does this server have an invite link?",
      colour: "4e9082",
      description: [
        "Anybody with some skills and activity can become staff! Just PM <@213287117017710593> or <@507021242663043082> and we’ll get right back to you, or sign up here on our form: https://forms.gle/UNXQqRvXF5Lna4QE7"
      ]
    }
  },

  faq_how_can_i_mod_t_and_t: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_answer: {
      title: "Does this server have an invite link?",
      colour: "4e9082",
      description: [
        "**Modding T&T is really simple!** You can check out our info page [here](https://canary.discord.com/channels/548994743925997570/964350431809634335/964436971067965490) if you want to know more about it.",
        "",
        "If you want to find out right here, though, you can visit our [GitHub repository](https://github.com/Australis-0/TriumphAndTragedy)! It comes with an installer for Windows devices, so simply download the .zip and double click `installer.bat` in the base directory! Everything should just go automatically."
      ]
    }
  },

  faq_how_do_i_get_started_with_t_and_t: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_answer: {
      title: "Does this server have an invite link?",
      colour: "4e9082",
      description: [
        "There’s no real tutorial, but you can start playing and learning the ropes by going down to <#700605207503044658> and typing `$play`!",
        "",
        "Yep. That’s the only command there is in the game. Everything else relies on a new UI system that should be pretty intuitive after a few minutes. Just remember that everything inside those [ ] can be typed!"
      ]
    }
  },

  faq_whats_there_to_do_on_this_server: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_answer: {
      title: "Does this server have an invite link?",
      colour: "4e9082",
      description: [
        "Try playing **Triumph & Tragedy**, of course! You can always go down to <#700605207503044658> and type `$play` to get started.",
        "",
        "Other than that, there’s just good old talking, and if you’re a JS programmer, please join us! It’d really help us in making more open-source botgames!"
      ]
    }
  },

  faq_who_can_i_contact_for_help: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_answer: {
      title: "Does this server have an invite link?",
      colour: "4e9082",
      description: [
        "You can always feel safe contacting me, <@507021242663043082>! I’m pretty active around here. I also keep all my PM’s private, so there’s that too.",
        "",
        "But if you’re looking for general server help, contacting our <@549011413843050529> or our sublime <@549011920863363073> never hurts! You can also ping most active people around here. They’ll be more than happy to respond to your questions!"
      ]
    }
  },

  naissance: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_banner: {
      colour: "4e9082",
      image: {
        url: "https://media.discordapp.net/attachments/723000409224118332/1169708525501558905/naissance_temp_banner.png"
      }
    },
    embed_naissance: {
      title: "Mapping for the modern world.",
      colour: "4e9082",
      description: [
        "━━━━",
        "",
        "Naissance is a sleek, WIP mapping tool designed to make creating interactive historical atlases and statistics on maps as accessible to regular laypeople as possible.",
        "",
        "This project is currently in pre-alpha. You can download it from GitHub [here](https://github.com/Australis-0/Naissance)",
        "",
        "━━━━"
      ]
    }
  },

  socials: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_banner: {
      colour: "4e9082",
      image: {
        url: "https://media.discordapp.net/attachments/977843834576846899/977844021940604928/socials_header.png"
      }
    },
    embed_socials: {
      title: "Socials.",
      colour: "4e9082",

      description: [
        "━━━━",
        "",
        "So, um. This is embarrassing. We don’t really have any official socials for the server, but you can always check out our personal ones to know what cool stuff we’re making!",
        "[DeviantArt (Aust/Vis)](https://www.deviantart.com/australiszero)",
        "[Discord (Aust)](https://discord.gg/J7WGbrpRvr)",
        "Discord: **You’re right here!**",
        "[GitHub](https://github.com/Australis-0)",
        "[Twitter (Production Account)](https://twitter.com/CatsAndVultures)",
        "[Twitter (Aust)](https://twitter.com/Australis__)",
        "[Twitter (Vis)](https://twitter.com/VisTacitvs)",
        "",
        "━━━━"
      ],
    }
  },

  staff_members: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_staff_members: {
      title: "Staff Members.",
      colour: "4e9082",

      description: [
        "Ooh! You’re interested in what sort of incompetent animals are running this rubbish heap that’s also on fire? At the back of an omnimarket having a clearance sale? Well. I’ll tell you.",
        "",
        "<@213287117017710593> - Prime Guarantor. Owner of the server.",
        "",
        "<@507021242663043082> - Main bot dev (JS).",
        "<@575281356393676801> - Inactive bot dev/Community Moderator (Python).",
        "",
        "<@878376647563313164> - Community Moderator",
        "",
        "<@638023953784242185> - Advertisement",
        "<@484763548334161939> - Advertisement",
        "<@707030152638365744> - Advertisement",
        "",
        "<@496739279805087800> - Community Advisor",
        "<@691176263032766495> - Community Advisor",
        "<@745995952430776380> - Community Advisor",
        "<@292824166204309506> - Community Advisor",
        "",
        "If you’d like to see your name on this list, staff applications are always open!"
      ]
    }
  },

  triumph_and_tragedy: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_banner: {
      colour: "4e9082",
      image: {
        url: "https://media.discordapp.net/attachments/977843834576846899/977844090647486534/triumph_and_tragedy.jpg"
      }
    },
    embed_triumph_and_tragedy: {
      title: "Triumph & Tragedy.",
      colour: "4e9082",

      description: [
        "━━━━",
        "",
        "Our flagship turn-based, grand-strategy botgame!",
        "",
        "-",
        "",
        "Throughout history, people have always claimed pieces of territory as their own. They called their place a nation.",
        "",
        "Now's your chance to claim a piece of land on earth and either rule or be ruled. You can lead your nation through a golden era, or see it collapse into a new dark age. Have your nation assert global and economic hegemony, or have it be partitioned and forced to obey the diktats of powerful neighbours. The choice is yours.",
        "",
        "-",
        "",
        "To play, simply head on over to <#700605207503044658> and type `$play` to get started! That’s the only command there is so you don’t need to know more.",
        "",
        "But if you want to know more, try pressing one of these buttons below!",
        "",
        "━━━━"
      ]
    },

    buttons: {
      button_modding_and_installation: {
        title: "Modding & Installation",
        icon: "programming",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_modding_and_installation"
        }
      },
      button_triumph_and_tragedy_roadmap: {
        title: "Roadmap",
        icon: "grand_strategy",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_roadmap"
        }
      },
      button_triumph_and_tragedy_tutorial: {
        title: "Tutorial",
        icon: "dots_icon",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_one"
        }
      }
    }
  },

  //Fourth Layer embeds

  triumph_and_tragedy_modding_and_installation: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_modding_and_installation: {
      title: "Modding & Installation.",
      colour: "4e9082",

      description: [
        "━━━━",
        "",
        "Modding and installation of **Triumph & Tragedy** is pretty simple! You can download Triumph & Tragedy from our [GitHub repository](https://github.com/Australis-0/TriumphAndTragedy) and run `installer.bat` on Windows devices, which should automatically install the bot!",
        "",
        "To mod Triumph & Tragedy, look inside the `common` folder and try editing different text files. To see your new changes, make sure to restart the bot! You can also create additional maps by making new SVG files.",
        "",
        "If you run into any issues, try contacting <@213287117017710593> or <@507021242663043082>! We’ll always be glad to help!",
        "",
        "━━━━"
      ]
    }
  },

  triumph_and_tragedy_tutorial_one: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_page: {
      title: "Page 1 - Founding A Nation.",
      colour: "6d96d9",

      description: [
        "━━━━",
        "",
        "Welcome to a new type of game! Welcome to Triumph & Tragedy!",
        "",
        "Okay, so I know you keep seeing signs pointing to <#1034751523269378078> and saying you need to type `$play` to get started, but there haven’t really been any signs about what you actually do once you get in the game.",
        "",
        "-",
        "",
        "The first thing, of course, is founding your nation. You can do this by typing on a nation name (which you can always change later), and scrolling/zooming around on the map for a province to settle.",
        "",
        "Remember! You can always open the map image in a separate tab to see the full thing if the numbers are too small. Each number represents a province. Simply type in the number located above where you want to settle, and you should be all ready!",
        "",
        "━━━━"
      ]
    },

    buttons: {
      button_page_one_1: {
        icon: "one",
        colour: "grey"
      },
      button_page_two_1: {
        icon: "two",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_two"
        }
      },
      button_page_three_1: {
        icon: "three",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_three"
        }
      },
      button_page_four_1: {
        icon: "four",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_four"
        }
      },
      button_page_five_1: {
        icon: "five",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_five"
        }
      }
    }
  },

  triumph_and_tragedy_tutorial_two: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_page: {
      title: "Page 2 - Getting Started.",
      colour: "6d96d9",

      description: [
        "━━━━",
        "",
        "OK! Once you’re done founding your nation, you’ll want to get started with your country screen.",
        "",
        "Each button you can ‘click on’ is typed out in bolded brackets, **[Like So]**. You can type out the text in between those brackets to ‘click’ on the button. Don’t worry, it’ll become intuitive soon!",
        "",
        "-",
        "",
        "First your nation is in **Anarchy**. This is bad, because you’re a nation. To fix this problem, simply type ‘set government’ and type the name of the government you wish to change your country’s ruling system to.",
        "",
        "The next thing you’ll notice is something called **Actions**. These basically just represent the output of your financial economy. You can use up these **Actions** by typing either ‘chop’, ‘quarry’, or ‘mine’.",
        "",
        "Chopping gives you wood, quarrying gives you stone, and mine gives you any other ore you need. You’ll usually want some mix of the three. You also gain **5** base actions per turn, even if you don’t have any **Industry** buildings constructed to give you them.",
        "",
        "-",
        "",
        "Next, you’ll want to head over to the **Colonisation** tab! Each country is assigned a random number of colonial units that you can use to claim more territory for your nation when you start out. Simply settle them all, and keep in mind to try and use the maximum number of provinces each unit can colonise!",
        "",
        "-",
        "",
        "Finally, you’ll want to found your capital city. Head over to the **Economy** tab and click on **View Cities** to found a new city. Simply follow the prompts from there, and you’ll be all set!",
        "",
        "> **Pro-Tip:** You can type ‘view [Armies/Cities/Army Name/City Name/Province ID]’ to quick jump between windows. You can also type out ‘colonisation’, ‘economy’, etc. to skip between the main window tabs.",
        "",
        "━━━━"
      ]
    },

    buttons: {
      button_page_one_2: {
        icon: "one",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_one"
        }
      },
      button_page_two_2: {
        icon: "two",
        colour: "grey"
      },
      button_page_three_2: {
        icon: "three",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_three"
        }
      },
      button_page_four_2: {
        icon: "four",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_four"
        }
      },
      button_page_five_2: {
        icon: "five",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_five"
        }
      }
    }
  },

  triumph_and_tragedy_tutorial_three: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_page: {
      title: "Page 3 - Basic Economics.",
      colour: "6d96d9",

      description: [
        "━━━━",
        "",
        "T&T is mostly about building up your country during the earlygame, securing your position during the midgame, (and with enough players remaining), duking it out in a massive final endgame war.",
        "",
        "-",
        "",
        "To do this, you’ll need to know a few things:",
        "",
        "> Actions are worth £2.500 each at 100% taxation. This is further modified by your **Tax Efficiency**. You can also gain money by selling goods through the **World Market**, and from **Trade** with other players.",
        "> ",
        "> Remember! You can use the auto-trade panel to send goods turnly to other players.",
        "",
        "> You’ll want to maximise wood/lumber and stone/iron production earlygame before focusing on producing other goods as you see fit. This is crucial to building more important buildings later on.",
        "",
        "> Population in a city only grows when housing in it exceeds current population. Rural provinces are capped between 130.000-150.000 people. National population shrinks if you don’t have enough food! (Hm, I wonder why)",
        "",
        "> Technology is crucial to your empire! Techs can be researched in the **Technology** tab, and only techs currently available to you are shown. Ahead-of-time penalties exist for techs farther in the future, and depend on Knowledge generation per turn.",
        "> ",
        "> Remember! You can queue up techs to keep researching while you sleep.",
        "",
        "> Research buildings cost money to upkeep.",
        "",
        "━━━━"
      ]
    },

    buttons: {
      button_page_one_3: {
        icon: "one",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_one"
        }
      },
      button_page_two_3: {
        icon: "two",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_two"
        }
      },
      button_page_three_3: {
        icon: "three",
        colour: "grey"
      },
      button_page_four_3: {
        icon: "four",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_four"
        }
      },
      button_page_five_3: {
        icon: "five",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_five"
        }
      }
    }
  },

  triumph_and_tragedy_tutorial_four: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_page: {
      title: "Page 4 - Making Friends.",
      colour: "6d96d9",

      description: [
        "━━━━",
        "",
        "Diplomacy, alliances, and intrigue are all conducted through the bot! Well, they would be if every other nation wasn’t headed by a player, too.",
        "",
        "You can view and interact with other nations through the **Diplomacy** tab .. and the **Military** tab too, if you happen to be at war with them. Remember, all your armies, trade routes, cities, etc. are on the map so it’s important to choose allies based on your tech level and proximity.",
        "",
        "-",
        "",
        "You can find out which player is in control of which nation by heading over to their Diplomatic View! It’s on the second page, along with other important details. Simply click the right and left arrow buttons to scroll between pages, like always.",
        "",
        "You can also talk to them in a specialised channel we have, <#700605147067187200>!",
        "",
        "━━━━"
      ]
    },

    buttons: {
      button_page_one_4: {
        icon: "one",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_one"
        }
      },
      button_page_two_4: {
        icon: "two",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_two"
        }
      },
      button_page_three_4: {
        icon: "three",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_three"
        }
      },
      button_page_four_4: {
        icon: "four",
        colour: "grey"
      },
      button_page_five_4: {
        icon: "five",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_five"
        }
      }
    }
  },

  triumph_and_tragedy_tutorial_five: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_page: {
      title: "Page 5 - What To Expect.",
      colour: "6d96d9",

      description: [
        "━━━━",
        "",
        "Few players? A boring game where you sit alone, sleep, eat, and build up your nation every once in a while.",
        "",
        "Loads of players? Strap in for a wild ride, power plays, intrigue, and massive climactic wars!",
        "",
        "That’s right, _you_ make all the difference to the gameplay! If the game seems a little inactive .. maybe try inviting somebody here?",
        "",
        "Our invite is __https://discord.gg/89kQY2KFQz__, feel free!",
        "",
        "-",
        "",
        "Triumph & Tragedy is still undergoing loads of changes - feel free to check our [planning document](https://docs.google.com/document/d/1BKCJqh4oHbGyzd0z3Zv7wa1ZYlJANipJ--YZat7OS98/edit?usp=sharing) and **Roadmap** for more information!",
        "",
        "━━━━"
      ]
    },

    buttons: {
      button_page_one_5: {
        icon: "one",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_one"
        }
      },
      button_page_two_5: {
        icon: "two",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_two"
        }
      },
      button_page_three_5: {
        icon: "three",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_three"
        }
      },
      button_page_four_5: {
        icon: "four",
        colour: "blue",

        effect: {
          trigger: "triumph_and_tragedy_tutorial_four"
        }
      },
      button_page_five_5: {
        icon: "five",
        colour: "grey"
      }
    }
  },

  triumph_and_tragedy_roadmap: {
    channel: "549000552013496340",
    type: "ephemeral_message",
    visible: false,

    embed_roadmap: {
      title: "Roadmap.",
      colour: "4e9082",

      description: [
        "━━━━",
        "",
        "Triumph & Tragedy II is on the distant, distant horizon! If you’d like to see what we currently have planned for it, check out [this planning sheet](https://docs.google.com/document/d/1BKCJqh4oHbGyzd0z3Zv7wa1ZYlJANipJ--YZat7OS98/edit?usp=sharing) for specifics.",
        "",
        "Future updates towards T&T II will be broken up into four main phases:",
        "",
        "• **Into Modernity** - _Economy, Population, and Trade_",
        "• **Proxy Cables** - _Diplomacy, Colonisation and Politics_",
        "• **Last Man Standing** - _Military Overhaul & Customisation_",
        "• **System Dynamics** - _Overhauled Modding API, In-Game Mod Creator, Singleplayer/Multiplayer Games, AI_",
        "",
        "━━━━"
      ]
    }
  }
};
