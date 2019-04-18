module.exports = {
	name: 'quoteyuri',
	description: 'If you want to read or talk, this is the way to let me know.',
	args: false,
	aliases: ['yuriquote', 'quotey', 'yquote', 'yurispeak', 'speakyuri'],
	cooldown: 30,
	execute(msg, args) {
            var random = randomIntFromInterval(0,responseArray.length-1);
  	    if(responseArray[random]) {
                msg.channel.send(responseArray[random]);
	    }
	    else {
	        msg.channel.send("I think I messed up the script again...");
	    }
	},
};
