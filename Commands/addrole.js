const Discord = require('discord.js')

module.exports = async (client, message, args) => {

message.delete();
if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel("You dont have `MANAGE_ROLES` permissions.**").then(message => message.delete(6000));
let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!rMember) return message.channel.send("That user cannot be found!**").then(message => message.delete(6000));
let role = args.join(" ").slice(22);
if(!role) return message.channel.send("Please specify a role without @**").then(message => message.delete(6000));
let gRole = message.guild.roles.find(`name`, role);
if(!gRole) return message.channel.send("Couldn't find that role.**").then(message => message.delete(6000));
  
if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.**").then(message => message.delete(6000));
await(rMember.addRole(gRole.id));
message.channel.send(`${rMember} has been given the ${gRole.name} role.`).then(message => message.delete(6000));

}