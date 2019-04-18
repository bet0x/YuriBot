module.exports = {
	name: 'onyuri',
	description: "This means you must want me to talk to you once in a while, right?",
	args: false,
	cooldown: 300,
	execute(msg, args) {
	    if (randOn) {
                msg.channel.send("...");
            }
            else {
	        // First msg sent is min value for wait period
                msg.channel.send("I'm excited to talk to you, if you want me to.");
		randomMessage = setTimeout(function() {
                    randMsg(msg.channel);
                }, 1000*timer[0]);
            }
	},
};
