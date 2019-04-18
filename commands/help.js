module.exports = {
	name: 'yuri',
	description: "This is the easiest way to find out what I can do for you.",
	aliases: ['commandsyuri', 'helpyuri', 'helpmeyuri', 'yurihelp', 'yuricommands'],
	usage: '[command name]',
	cooldown: 5,
	execute(msg, args) {
	    const data = [];
    	    const { commands } = msg.client;

    	    if (!args.length) {
	        data.push('Here\'s a list of all my commands:\n');
      		data.push(commands.map(command => command.name).join('\n'));
      		data.push("\nYou can send \' " + prefix + "yuri [command name]\' to get info on a specific command!");

      		return msg.author.send(data, { split: true })
	        	.then(() => {
		          if (msg.channel.type === 'dm') return;
		          msg.reply('I\'ve sent you a DM with all my commands!');
	        	})
	        	.catch(error => {
		            console.error("Could not send help DM to " + msg.author.tag + ".\n", error);
		            msg.reply("It seems like I can\'t DM you, " + msg.author.tag + "! Do you have DMs disabled?");
	        	});
	    }

    	    const name = args[0].toLowerCase();
    	    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
    	    if (!command) {
	        return msg.reply("Sorry... that\'s not a valid command.");
    	    }
    	    data.push("Name: " + command.name + "\n");
            if (command.aliases) data.push("Aliases: " + command.aliases.join(', ') + "\n");
            if (command.description) data.push("Description: " + command.description + "\n");
            if (command.usage) data.push("Usage: " + prefix + command.name + " " + command.usage + "\n");

	    if (command.cooldown) {
 	        data.push("Cooldown: " + command.cooldown + " second(s)");
	    }
	    else {
	        data.push("Cooldown: 3 second(s)");
	    }

            msg.channel.send(data, { split: true });
	},
};
