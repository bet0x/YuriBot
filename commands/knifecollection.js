// Gets a random picture of a... knife? :|
var chatOptions = [
    "I like the colors on this one in particular!",
    "Uu, I wish I had a more normal hobby...",
    "Please be careful, it's extremely sharp.",
    "Do NOT touch test it again.",
    "I wish I could share this with Natsuki and Monika, but I can already imagine the looks I'd get...",
    "It's nice to share what I like with someone.",
    "Knives aren't just weird; they're practical, too. Having excellent kitchen knives is a must if you cook a lot.",
    "This one isn't really my style, but it was on sale, so...",
    "This is one of my favorites. Be careful - the edge is super dangerous.",
    "Why do I like them? I don't know what it is... The combination of craftsmanship and feeling of danger, maybe?",
    "I suppose I could use these knives for some form of art or creation, but I wouldn't even know where to begin...",
];

module.exports = {
	name: 'knife',
	description: "The thing is, I'm kind of into knives... Would you like to see one of mine?",
    	aliases: ['knifeyuri', 'knifepicture', 'knifephoto', 'knifepic'],
	args: false,
	cooldown: 60,
	execute(msg, args) {
        var randomChatNum = randomIntFromInterval(0, chatOptions.length-1);
        var randomKnifeNum = randomIntFromInterval(0, knifeFiles.length-1);

  	    if (chatOptions[randomChatNum]) {
	          msg.channel.send(chatOptions[randomChatNum], {
   			    files: [{
      				attachment: '/app/cool knife photos/' + knifeFiles[randomKnifeNum],
      				name: knifeFiles[randomKnifeNum]
   				  }]
			  });
	}
	else {
	    msg.channel.send("I think I messed up the script again...");
	}
    },
};
