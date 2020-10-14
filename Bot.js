import { getToken } from "./Token.js";
import Discord from "discord.js";

const token = getToken();
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
})

client.login(token);

