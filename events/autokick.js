module.exports = member => {

setTimeout(() => {
 if(member.roles.get('594185021389144066')) member.sendMessage(`**Please, To get in you have to register your Social Club name on this server by doing **>register Then your social club name** in the #register chat, if you dont in the next minutes you will be kicked**`)
}, 30000);


setTimeout(() => {
  if(member.roles.get('594185021389144066')) member.kick('')
  member.guild.channels.get("594183922049482778").send(`${member.user.tag} has been Kicked from the server Because he didnt register his Social Club Name`);
  member.sendMessage(`**You have been Kicked in **Gta Money Drop**\n**Reason**: Didnt Register Social Club Name On The Server\n**`)
}, 60000);

}