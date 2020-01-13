const Discord = require('discord.js')

module.exports = async (client, message, args) => {

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