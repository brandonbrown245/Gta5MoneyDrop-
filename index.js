// Deps
const Discord = require('discord.js')
const Client = new Discord.Client()
const fs = require('fs')
var config = require("./config.json");
var request = require("node-superfetch");
var moment = require("moment");
var randomPuppy = require('random-puppy');
var member = ('member')
var find = ('find')
var role = ('role')
var m = require("moment-duration-format");
let cpuStat = require("cpu-stat")
var superagent = require('superagent')
var ms = require('ms');
var id = ('id');
var roles = ('roles');
let os = require('os');
var rn = require('random-number');
var { RichEmbed } = require('discord.js');
var ms = require("ms")
const Enmap = require('enmap');
var util = require("./handlers")
var Canvas = require(`canvas`);
var db = require("quick.db");
var ytdl = require('ytdl-core');
var { createCanvas, loadImage } = require('canvas');
var path = require("path")
var user = user


const Commands = []

function nums(i) {
var j = i % 10,
k = i % 100;
if (j == 1 && k != 11) {
return i + "st";
}
if (j == 2 && k != 12) {
return i + "nd";
}
if (j == 3 && k != 13) {
return i + "rd";
}
return i + "th";
}

fs.readdir('./events/', (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });

  });


var Queue = new Array();
var Active = [false, false]

client.on("ready", () => console.log("I'm onlin and ready!"));

client.on("message", async message  => {

if(message.author.bot) return;
if(!message.content.startsWith(config.PREFIX)) return;
if(message.channel.type == "dm") return;

var prefix = config.PREFIX;
var args = message.content.slice(prefix.length).trim().split(/ +/g);
var command = args.shift().toLowerCase()

if(Commands.find(c => c.name == command)) Commands.find(c => c.name == command).run(Client, message, args)

let Clogs = message.guild.channels.find(x => x.name == "logs");

if(command == "unregister") {
message.delete();
if (message.channel.name !== 'unregister') return message.reply('**You must Unregister in the unregister chat**').then(message => message.delete(6000));
let socialName = args.join(" ")
if(!socialName) return message.reply("Please specify your Social Club username after the command").then(message => message.delete(6000));

message.member.addRole("594185021389144066")
message.member.removeRole("594185059968221188")

let cnl = client.channels.get('662680373276311585');
let verifyEmbed = new Discord.RichEmbed()
.setAuthor(message.member.displayName, message.author.displayAvatarURL)
.setDescription(`Social Club: ${args}`)
.setColor('#36393f')
cnl.send(verifyEmbed);

let embed79 = new Discord.RichEmbed()
.setColor('#36393f')
.setDescription(`Your account has been successfully Unregistered\n\nYou will get kicked from the server in 24 hours if you do not Register your Social Club Name\n\nYou will also get unfriened on social club as well\n\n Here is a Discord invite link if you would like to join back again\n\n**https://discord.gg/FPxpTjn**`);
message.author.send(embed79);

}
    
if(command == "roleinfo") {
message.delete();
let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name === args[0]);
if (!role) role = message.member.highestRole;
const embed = new RichEmbed()
.setColor(role.hexColor)
.setTitle(`Role: ${role.name}`)
.addField('Members', role.members.size, true)
.addField('Hex', role.hexColor, true)
.addField('Creation Date', role.createdAt.toDateString(), true)
.addField('Editable', role.editable.toString(), true)
.addField('Managed', role.managed.toString(), true)
.addField('ID', role.id, true);
return message.channel.send({ embed: embed

});

}
    
if(command =="start") {
message.delete();
if(Active[0]) return message.channel.send("There is already a Drop in progress by " + Active[1]).then(message => message.delete(6000));
if(!message.member.roles.find(r => r.name == "Money Dropper")) return message.reply("You can't use this command").then(message => message.delete(6000));
Active = [true , message.member];
message.channel.send(`**<@&594185059968221188> Money Drop Has Started**`)
message.guild.channels.get(config.QLOGS).send(util.sendEmbed(message, `A new Drop has been created by ${message.author}`));

}

if(command == "close") {
message.delete();
if(!message.member.roles.find(r => r.name == "Money Dropper")) return message.reply("You can't use this command").then(message => message.delete(6000));
if(!Active[0]) return message.channel.send("There is no Drop in progress").then(message => message.delete(6000));
if(Active[1].id !== message.author.id) return message.channel.send("Only " + Active[1] + " can finish the current Drop").then(message => message.delete(6000));
Active = [false , false];
Queue = new Array();
message.channel.send(`**<@&594185059968221188> Money Drop Has Stopped**`)
message.guild.channels.get(config.QLOGS).send(util.sendEmbed(message, `The current Drop by ${message.author} has been stopped`));


}

if(command == "addrole") {
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


if(command == "stats") {
message.delete();
let cpuLol;
cpuStat.usagePercent(function(err, percent, seconds) {
if (err) {
return console.log(err);
    
}

const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
let embed2 = new Discord.RichEmbed()
.setTitle("***BOT STATS***")
.setColor("RANDOM")
.addField("• Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
.addField("• Uptime ", `${duration}`, true)
.addField("• Users", `${client.users.size.toLocaleString()}`, true)
.addField("• Servers", `${client.guilds.size.toLocaleString()}`, true)
.addField("• Channels ", `${client.channels.size.toLocaleString()}`, true)
.addField("• Node", `${process.version}`, true)
message.channel.send(embed2)
    
});

}
  
if(command == "serverinfo"){
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

if(command == "purge"){
message.delete();
const deleteCount = parseInt(args[0], 10);
if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, but you do not have the **Manage Messages** permissions!")  .then(message => message.delete(6000));
if(!deleteCount || deleteCount < 2 || deleteCount > 100)
return message.channel.send("Please provide a number between 2 and 100 for the number of messages to delete.").then(message => message.delete(6000));
const fetched = await message.channel.fetchMessages({limit: deleteCount});
message.channel.bulkDelete(args[0])
.then(messages => message.channel.send(`**Successfully deleted \`${messages.size}/${args[0]}\` messages**`)    
.then(message => message.delete(3000)))
}

});

client.on("guildMemberRemove", async member => {
let Clogs = member.guild.channels.find(x => x.name == "mod-logs");
 let data = JSON.parse(fs.readFileSync("./userdata.json"), "utf8");
if(!data[member.user.id]) return;
delete data[member.user.id]
fs.writeFileSync("./userdata.json", JSON.stringify(data, null, 2))

let embed2 = new Discord.RichEmbed()
.setTitle("MEMBER LEFT")
.setColor("RANDOM")
.setDescription(`${member.user.tag} has left the server!`)
Clogs.send(embed2)

})

client.on("guildMemberAdd", async (member , message , ) => {

let Clogs = member.guild.channels.find(x => x.name == "mod-log")
let embed2 = new Discord.RichEmbed()
.setTitle("MEMBER JOINED")
.setColor("RANDOM")
.setDescription(`${member.user.tag} has joined the server!`)
Clogs.send(embed2)
    
const data = await request.get("https://i.imgur.com/LxRGbpx.png")
let base = data.body
let base1 = await loadImage(base)
const canvas = createCanvas(base1.width, base1.height);
const ctx = canvas.getContext('2d');
ctx.drawImage(base1, 0, 0);
    
const background = await Canvas.loadImage(`./images.jpg`);
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

let color = '#FFFFFF'
ctx.font = "20px arial"
ctx.fillStyle = color;
ctx.textAlign = "left"; 
ctx.fillText(`Welcome `, 185,70);
ctx.fillText(`${member.user.tag}`, 185,110);
ctx.fillText(`You are the ${nums(member.guild.memberCount)} user`, 185,150);

ctx.strokeStyle = '#74037b';
ctx.beginPath();
ctx.arc(109,99,51.5, 0, 2 * Math.PI);
ctx.clip()
member.sendMessage(`Welcome to **Gta Money Drop**, ${member}! This is a free money drop discord server where you can get free money drops on GTA V Online PC \n\nTo get in the free money drop lobby's you have to register your Social Club name on this server by doing **>register Then your social club name** in the #register chat\nafter that you will get the Registered role and info on how to join the money drop lobby's`)

member.guild.channels.get("594183892651737108").send(`Welcome to **Gta Money Drop**, ${member}! You are the ${nums(member.guild.memberCount)} user`)
let avatar1 = await request.get(member.user.displayAvatarURL)
let avatar = await loadImage(avatar1.body);
await ctx.drawImage(avatar, 52,46,114,104)
member.guild.channels.get("594183892651737108").send({files : [await canvas.toBuffer()]}) 


});

client.on("guildMemberUpdate", async (oldMember, newMember) => {

Array.prototype.diff = function(a) {
return this.filter(function(i) {
return a.indexOf(i) < 0;
});

};
 
let Clogs = newMember.guild.channels.find(x => x.name == "mod-log")
const log = await newMember.guild.fetchAuditLogs({type:'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first())

if (oldMember._roles.diff(newMember._roles).length == 0) {


var roldado = newMember._roles.diff(oldMember._roles)
var rol = newMember.guild.roles.get(roldado.toString())

let embed2 = new Discord.RichEmbed()
.setAuthor("ROLE UPDATED")
.setColor("RANDOM")
.setDescription(`${log.executor.username}#${log.executor.discriminator} gave the role **${rol.name}** to ${newMember.user.tag}`)
Clogs.send(embed2)

}
    
else if (oldMember._roles.diff(newMember._roles).length == 1) {

var rolsacado = oldMember._roles.diff(newMember._roles)
var rol = newMember.guild.roles.get(rolsacado.toString())
let embed2 = new Discord.RichEmbed()
.setAuthor("ROLE UPDATED")
.setColor("RANDOM")
.setDescription(`${log.executor.username}#${log.executor.discriminator} removed the role **${rol.name}** from ${newMember.user.tag}`)
Clogs.send(embed2)
    
}

if(oldMember.nickname !== newMember.nickname){
let embed2 = new Discord.RichEmbed()
.setAuthor("NAME UPDATED")
.setColor("RANDOM")
.setDescription(`${oldMember.nickname} is now ${newMember.nickname}`)
Clogs.send(embed2)
    
}
})


Client.login(config.token)