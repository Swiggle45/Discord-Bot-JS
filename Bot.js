import { getToken } from "./Token.js";
import Discord from "discord.js";

const token = getToken();
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
})
client.login(token);

/* ------------------------------------------------------------------*/

function roller(message) {
    const errorMessage = "syntax: \'roll dn\' where n is the highest number on the dice";
    const start = "You rolled a ";
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
console.log(staticReply);

let dynamicReply = new Map();
dynamicReply['roll'] = roller;

let searchWords = new Map();



client.on('message', message => {
    if (message.author.bot) return;
    console.log(message.content);
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

