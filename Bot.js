const fs = require('fs');
const { token } = require('./config.json');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
})

/* ------------------------------------------------------------------*/

function roller(message) {
    const errorMessage = "syntax: \'roll dn\' where n is the highest number on the dice\nExample: roll d20";
    const start = message.author.toString() + " You rolled: ";
    let m = message.content;
    if (RegExp("roll d").test(m) == false) {
        return errorMessage;
    }
    m = m.replace('roll d', '');
    if (m.length < 1) {
        return errorMessage;
    }
    if (RegExp("[^0-9]").test(m)) {
        let rand = Math.floor(Math.random() * m.length);
        return start + m.substring(rand, rand+1);
    }
    let answer = Math.floor(Math.random() * parseInt(m)) + 1;
    return start + answer;
}


let staticReply = new Map();
staticReply['ping'] = 'Pong!';
staticReply['hi'] = 'Hi!';
staticReply['hello'] = 'Hello!';
staticReply['lefty help'] = '';
staticReply['test'] = client;
//console.log(staticReply);

let dynamicReply = new Map();
dynamicReply['roll'] = roller;

let searchWords = new Map();


client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});


client.on('message', message => {
    if (message.author.bot) return;
    console.log(message.author.username + ': ' + message.content);
    for (const [key, value] of Object.entries(staticReply)) {
        if (message.content.startsWith(key)) {
            message.channel.send(value);
        }
    }
    for (const [key, value] of Object.entries(dynamicReply)) {
        if (message.content.startsWith(key)) {
            message.channel.send(value(message));
        }
    }
});

client.login(token);

