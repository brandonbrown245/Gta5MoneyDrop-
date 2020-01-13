const Discord = require('discord.js')

module.exports = async (client, message, args) => {

    message.delete();
function checkDays(date) {
let now = new Date();
let diff = now.getTime() - date.getTime();
let days = Math.floor(diff / 86400000);
return days + (days == 1 ? " day" : " days") + " ago";
};
let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
let region = {
"eu-west": "Western Europe",
};
const embed = new Discord.RichEmbed()
.setColor("#32CD32")
.setAuthor(message.guild.name)
.addField("Name", message.guild.name, true)
.addField("ID", message.guild.id, true)
.addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
.addField("Region", region[message.guild.region], true)
.addField("Total | Humans | Bots", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
.addField("Verification Level", verifLevels[message.guild.verificationLevel], true)
.addField("Channels", message.guild.channels.size, true)
.addField("Roles", message.guild.roles.size, true)
.addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} 
(${checkDays(message.channel.guild.createdAt)})`, true)
message.channel.send({embed});

}