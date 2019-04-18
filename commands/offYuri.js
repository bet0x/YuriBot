module.exports = {
	name: 'offyuri',
	description: "This means you must not want to talk to me for a while. Sorry...",
	args: false,
	cooldown: 300,
	execute(msg, args) {
	    if (typeof randomMessage !== 'undefined') {
          	clearTimeout(randomMessage);
          	msg.channel.send("Sorry for bothering you...");
      	    }
            else {
                msg.channel.send("...");
      	    }
	},
};
