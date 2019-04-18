// Initial random statement code borrowed from Reddit user "Californ1a" and adapted

const fs = require('fs');
var Discord = require('discord.js');
var bot = new Discord.Client();
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

// array of all js files in the commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Associates each file's command with name
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}
//TODO: change these to be whatever pics yuri uses
global.knifeFiles = fs.readdirSync('./cool knife photos');
//global.catFiles = fs.readdirSync('./amazing cute kittens');

global.randomMessage; // holds msg
global.randOn = false; // to check if bot's random talking is on

// TODO: add lots of dialogue
global.responseArray = [
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

global.prefix = "!";
global.timer = [7200, 21600]; // set min and max in seconds for random messages

// Starts bot (should run once, change to once() instead of on() if problems)
bot.on("ready", () => {
    console.log("Bot ready on " + bot.guilds.size + " server(s).");
});

// Bot command code
bot.on('message', (msg) => {

  // return right away if needed
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  // cut off prefix ('!') and split rest by spaces
  const args = msg.content.slice(prefix.length).split(/ +/);

  //just lowercase to be less annoying
  const commandName = args.shift().toLowerCase();

  // Find command, or if it is an alias, use that
  const command = bot.commands.get(commandName)
      || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;


  // Each command's js file can specify args; if specified and there aren't args, explain problem
  // (may have to check arg count later as well, this could crash/cause problem if args are given but not enough of them)
  if (command.args && !args.length) {
      let reply = "You didn't provide any arguments, ${msg.author}!";
      if (command.usage) {
          reply += "\nThe proper usage would be: \'${prefix}${command.name} ${command.usage}\'";
      }
      return msg.channel.send(reply);
  }

  // Check for command being set in the cooldowns collection
  if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
  }

  // Get current time; check collection for timestamps/author stuff; make cooldown time (default 3secs)
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  // check if expired
  if (timestamps.has(msg.author.id)) {
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
      if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
	  return msg.reply("Uh.. I can't do that for " + timeLeft.toFixed(1) + " more second(s)...");
	}
  }
  // not in there? set to expire
  else {
      timestamps.set(msg.author.id, now);
      setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
  }
  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});
bot.login(process.env.BOT_TOKEN);

global.randomIntFromInterval=function(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

global.randMsg=function(msgChan) {
  var interval = 1000*randomIntFromInterval(timer[0],timer[1]);
  var rand = randomIntFromInterval(0,responseArray.length-1);
  if(responseArray[rand]) {
    msgChan.sendMessage(responseArray[rand]);
  }
  randomMessage = setTimeout(function() {
        randMsg(msgChan);
  }, interval);
};
