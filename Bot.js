import { getToken } from "./Token.js";

const token = getToken();

const Discord = require("discord.js");
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
})

client.login(token);

