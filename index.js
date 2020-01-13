// Deps
const Discord = require('discord.js')
const client = new Discord.Client();
const fs = require('fs')
const config = require('./config.json')
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
const Enmap = require('enmap');
var util = require("./handlers")
var Canvas = require(`canvas`);
var db = require("quick.db");
var ytdl = require('ytdl-core');
var { createCanvas, loadImage } = require('canvas');
const token = process.env.token

const Client = new Discord.Client()

Client.on('ready', () => console.log('Bot Online!'))
Client.config = config

const Commands = []


// Get all general commands
fs.readdir('./Commands/', (err, files) => {
    files.forEach(f => {
        let func = require('./Commands/' + f)
        Commands.push({name : f.slice(0, -3), run : func})
    })
})


// Command Handler
Client.on('message', message => {
    
    if(message.author.bot) return;
    if(message.content.indexOf("!") !== 0) return;
    if(message.channel.type == 'dm') return;
    
    const args = message.content.slice(1).trim().split(" ")
    const command = args.shift()

    if(Commands.find(c => c.name == command)) Commands.find(c => c.name == command).run(Client, message, args)
})

Client.on('guildMemberAdd', member => {
    member.addRole(config.unregistered)
    member.user.send(config.newmember)
    .catch(() => {})
    let data = JSON.parse(fs.readFileSync('./Data/tempRegs.json'))
    data.push({time : +new Date() , id: member.id})
    fs.writeFileSync('./Data/tempRegs.json', JSON.stringify(data),null,2)
})


// Timed muted handler 

setInterval( async () => {
    let data = JSON.parse(fs.readFileSync('./Data/mutes.json'))
    if(data.length > 0){
        data.forEach((m,i) => {
            let hoy = new Date()
            let warn = new Date(m.time)
            if(hoy > warn) {
                let guild = Client.guilds.get('664135583462981642')
                let member = guild.member(m.id)
                if(member) member.removeRole(config.muterole)
                data.splice(i,1)
                fs.writeFileSync('./Data/mutes.json', JSON.stringify(data),null,2)
            }
        })
    }
}, 60000)


// Kick handler 
setInterval( async () => {
    let data = JSON.parse(fs.readFileSync('./Data/tempRegs.json'))
    if(data.length > 0){
        data.forEach(async (m,i) => {
            let hoy = +new Date()
            if((hoy - m.time) > 1.8e+6) {
                let guild = Client.guilds.get('664135583462981642')
                let member = guild.member(m.id)
                if(member.roles.get(config.unregistered)) {
                    await member.user.send(config.unregister_kick)
                    .catch(() => {})
                    member.kick()
                }
                data.splice(i,1)
                fs.writeFileSync('./Data/tempRegs.json', JSON.stringify(data),null,2)
            }
        })
    }
}, 60000)


// Livestream Notification

var request = require("node-superfetch");

setInterval(() => {
  request.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCuYQmyVoKwqEnoM1gaDD9Kg&type=video&eventType=live&key=${config.youtubeapi}`)
  .then(data => {
    let search = data.body.items
    if(search.length > 0) {
        let temps = JSON.parse(fs.readFileSync('./Data/tempLive.json'))
        if(temps.includes(search[0].id.videoId)) return;
        else {
            Client.channels.get(config.livechannel).send(`${config.livemessage} https://www.youtube.com/watch?v=${search[0].id.videoId}`)
            temps.push(search[0].id.videoId)
            fs.writeFileSync('./Data/tempLive.json', JSON.stringify(temps))
        }

    }
})
  
}, 15000)

setTimeout(() => {
  fs.writeFileSync('./Data/tempLive.json', JSON.stringify([]))
}, 7.2e+7)

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

    });


Client.login(token)