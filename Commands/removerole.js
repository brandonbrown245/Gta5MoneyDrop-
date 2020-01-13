
const Discord = require('discord.js')

module.exports = async (client, message, args) => {

if(command == "removerole") {
    message.delete();
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have `MANAGE_ROLES` permissions.").then(message => message.delete(6000));
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.channel.send("Couldn't find that user.").then(message => message.delete(6000));
    let role = args.join(" ").slice(22);
    if(!role) return message.channel.send("Specify a role without @").then(message => message.delete(6000));
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.channel.send("Couldn't find that role.").then(message => message.delete(6000));
    
    if(!rMember.roles.has(gRole.id)) return message.channel.send("They don't have that role.**").then(message => message.delete(6000));
    await(rMember.removeRole(gRole.id));
    message.channel.send(`RIP, ${rMember} you have lost the ${gRole.name} role!`)
  
}
}