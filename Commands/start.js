const Discord = require('discord.js')

module.exports = async (client, message, args) => {

    message.delete();
if(Active[0]) return message.channel.send("There is already a Drop in progress by " + Active[1]).then(message => message.delete(6000));
if(!message.member.roles.find(r => r.name == "Money Dropper")) return message.reply("You can't use this command").then(message => message.delete(6000));
Active = [true , message.member];
message.channel.send(`**<@&594185059968221188> Money Drop Has Started**`)
message.guild.channels.get(config.QLOGS).send(util.sendEmbed(message, `A new Drop has been created by ${message.author}`));

}