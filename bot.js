var Discord = require('discord.js');
var bot = new Discord.Client();
var randomMessage;
var randOn = false;
var responseArray = [ //add more messages here
  "I guess there's a little devil inside all of us, isn't there?",
  "...",
  "Sigh...",
  "You must have a lot of determination.",
  "The world is full of meaning, often hidden deep beneath plain sight. And there are many untold mysteries behind every person, no matter how well you may know them.",
  "If we want our event to succeed, then we need to appropriately distribute our resources.",
  "I'm sorry...for being dumb. I'm going to do my best.",
  "I have a bad habit of overthinking these sorts of things...",
  "Well, 'excited' may not be the right word... But I suppose I'm looking forward to it a little bit.",
  "I want to help take our guests to a faraway place. Although many will stop by just out of curiosity... And for...cupcakes, I guess... I'm determined to provide an experience that will leave them wanting more.",
  "I just like when I can spend time with one other person... Even if it's something simple, like reading - it doesn't even matter if we don't talk much. Just having a friend next to me makes things feel a little bit nicer. I think that's all it takes for me to be happy.",
  "The light flickers. I flicker back.",
  "That was, I believe, the first time I noticed my strange tendencies as an unordinary human.",
  "One can only build a sand castle where the sand is wet. But where the sand is wet, the tide comes. Will it gently lick at your foundations until you give in? Or will a sudden wave send you crashing down in the blink of an eye? Either way, the outcome is the same. Yet we still build sand castles.",
  "My heart is amber.",
  "I'm really glad that you're such an understanding person... And I'm really glad that you joined this club.",
  "My heart...just won't stop pounding, for some reason..."
];
var prefix = "!";
var timer = [7200, 21600]; //set min and max in seconds for random messages
 
bot.on("ready", () => {
    console.log("Bot online and ready on " + bot.guilds.size + " server(s).");
});
 
bot.on('message', (msg) => {
  if (msg.content.startsWith(prefix + "onYuri")) {
        if (randOn) {
            msg.channel.sendMessage("Sorry... I sometimes struggle to put my thoughts into words.");
        }
        else {
            msg.channel.sendMessage("Y-you want to talk to... me?");
			randomMessage = setTimeout(function() {
                randMsg(msg.channel);
            }, 1000*timer[0]);
        }
  }
  else if (msg.content.startsWith(prefix + "offYuri")) {
        if (randOn) {
            clearTimeout(randomMessage);
            msg.channel.sendMessage("I mean... s-sorry...");
        }
        else {
			clearTimeout(randomMessage);
            msg.channel.sendMessage("I mean... s-sorry...");
        }
  }
});
 
bot.login(process.end.BOT_TOKEN);
 
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
 
function randMsg(msgChan) {
    console.log("callback");
    var interval = 1000*randomIntFromInterval(timer[0],timer[1]);
  var rand = randomIntFromInterval(0,responseArray.length-1);
  if(responseArray[rand]) {
    msgChan.sendMessage(responseArray[rand]);
  }
    randomMessage = setTimeout(function() {
        randMsg(msgChan);
    }, interval);
}
