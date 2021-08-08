const Discord = require("discord.js");
const fetch = require("node-fetch");
require("dotenv").config();
// const Database = require("@replit/database");

const client = new Discord.Client();
// const db = new Database();

const sadWord = [
  "sad",
  "bad",
  "depressed",
  "unhappy",
  "tired",
  "angry",
  "fed up",
  "hi",
  "hello",
];

const encouragements = [
  "Selim is coming soon",
  "Selim is there wait a moment",
  "You are looking good",
  "You are fantastic guy",
  "How are you today",
  "You are a great person please click this link and enjoy a moment feel free to join with me https://www.facebook.com/nafim96",
];

// db.get("encouragements").then((encouragements) => {
//   if (!encouragements || encouragements.length < 1) {
//     db.set("encouragements", starterEncouragements);
//   }
// });

// function updateEncouragements(encouragingMessage) {
//   db.get("encouragements").then((encouragements) => {
//     encouragements.push([encouragingMessage]);
//     db.set("encouragements", encouragements);
//   });
// }

// function deleteEncouragements(index) {
//   db.get("encouragements").then((encouragements) => {
//     if (encouragements.length > index) {
//       encouragements.splice(index, 1);
//       db.set("encouragements", encouragements);
//     }
//   });
// }

const getQuote = () => {
  return fetch("https://zenquotes.io/api/random")
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      return data[0]["q"] + " -" + data["a"];
    });
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.author.bot) return;

  if (msg.content === "$inspire") {
    getQuote().then((quote) => msg.channel.send(quote));
  }

  if (sadWord.some((word) => msg.content.includes(word))) {
    // db.get("encouragements").then((encouragements) => {
    // });
    const encouragement =
      encouragements[Math.floor(Math.random() * encouragements.length)];
    msg.reply(encouragement);
  }

  // if (msg.content.startsWith("$new")) {
  //   encouragingMessage = msg.content.split("$new ")[1];
  //   updateEncouragements(encouragingMessage);
  //   msg.channel.send("New Encouraging Message Added");
  // }
  // if (msg.content.startsWith("$del")) {
  //   index = parseInt(msg.content.split("$del ")[1]);
  //   deleteEncouragements(index);
  //   msg.channel.send("New Encouraging Message Deleted");
  // }
});

client
  .login(process.env.TOKEN)
  .then((success) => {
    console.log(`successfully login (${success})`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => {
      console.log("finally result show");
    }, 2000);
  });
