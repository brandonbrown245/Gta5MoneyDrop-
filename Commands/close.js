const Discord = require('discord.js')

module.exports = async (client, message, args) => {

message.delete();
if(!message.member.roles.find(r => r.name == "Money Dropper")) return message.reply("You can't use this command").then(message => message.delete(6000));
if(!Active[0]) return message.channel.send("There is no Drop in progress").then(message => message.delete(6000));
if(Active[1].id !== message.author.id) return message.channel.send("Only " + Active[1] + " can finish the current Drop").then(message => message.delete(6000));
Active = [false , false];
Queue = new Array();
message.channel.send(`**<@&594185059968221188> Money Drop Has Stopped**`)
message.guild.channels.get(config.QLOGS).send(util.sendEmbed(message, `The current Drop by ${message.author} has been stopped`));

}