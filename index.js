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
const SQLite = require('sqlite')

var { createCanvas, loadImage } = require('canvas');
const token = process.env.token

const Client = new Discord.Client()

Client.on('ready', () => console.log('Bot Online!'))
Client.config = config

const Commands = []


// Command Handler
Client.on('message', message => {
    
    if(message.author.bot) return;
    if(message.content.indexOf("!") !== 0) return;
    if(message.channel.type == 'dm') return;
    
    const args = message.content.slice(1).trim().split(" ")
    const command = args.shift()

    if(Commands.find(c => c.name == command)) Commands.find(c => c.name == command).run(Client, message, args)



    if(command == "register") {

        let name = args.join(' ')
        if (message.channel.name !== 'register') return message.reply('**You must Register your social club name in the register chat**').then(message => message.delete(6000));
    
        if(!name) return message.reply("You need to provide your Social Club nickname")
    
        SQLite.open('./userData.sqlite')
        .then(async sql => {
            let user = await sql.get(`SELECT * FROM users WHERE id = ${message.author.id}`)
            if(user) return message.reply("You are already registered!")
            sql.run(`INSERT INTO users (id, social) VALUES ('${message.author.id}', '${name}')`)
            .then(() => {
                message.member.addRole("594185059968221188")
                message.member.removeRole("594185021389144066")
                let logsChannel = client.channels.get(client.config.logschannel)
                message.channel.send(`Successfully registered!`)
                .then(msg => msg.delete(5000))
               // logsChannel.send(`**[!]** ${message.author} was registered with \`${name}\` as his Social Club name `)
    
               let cnl = client.channels.get('594187400339783721');
                embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag}`)
                .setColor("#42f45c")
               .addField('Social Club:', ` \`${name}\``)
                .setThumbnail(message.author.displayAvatarURL)
               cnl.send({embed})
    
                .catch(e => logger.error(e))
    
                let verifyEmbed = new Discord.RichEmbed()
                .setAuthor(message.member.displayName, message.author.displayAvatarURL)
            .setDescription('Your account has been successfully Registered.')
               .setColor('#36393f')
            message.channel.send(verifyEmbed);
    
                let embed77 = new Discord.RichEmbed()
                .setColor('#36393f')
                .setDescription(`The Social Club Name You Registered With is **\`${name}\`** If it is not Right just do **>unregister** in the unregister chat and register with the right social club name\n\nNow that you are registered, please be sure to read the rules and how to join. Other than that, enjoy your time in the server and do not be afraid to ask any questions you may have\n\nThe money Dropper Sc name is **Batman_456** he will not add you it is up to you to add the money Dropper\n\nHow to join the money drop lobby\n\nWhen you register you will get the sc of the money dropper you have to add him when you did add him. he will add you when he starts a money drop then you just join his lobby just if he says he is doing a money drop\n`);
                message.author.send(embed77);
    
                let data = JSON.parse(fs.readFileSync('./tempRegs.json'))
                let found = data.findIndex(d => d.id == message.author.id) 
                if(found !== -1) {
                    data.splice(found, 1)
                    fs.writeFileSync('./tempRegs.json', JSON.stringify(data),null,2)
                }
            })
            .catch((e) => {
                console.log(e)
                message.reply('Oops, there was an error trying to save your info!')
            })
        })
    }
    if(command == "unregister")

    SQLite.open('./userData.sqlite')
    .then(async sql => {
        let user = await sql.get(`SELECT * FROM users WHERE id = ${message.author.id}`)
        if(!user) return message.reply("You are not registered!")
        sql.run(`DELETE FROM users WHERE id = ${message.author.id}`)
        .then(() => {
            message.member.addRole("594185021389144066")
            message.member.removeRole("594185059968221188")
            let logsChannel = client.channels.get(client.config.logschannel)
            message.channel.send(`Successfully unregistered!`)
            .then(msg => msg.delete(5000))
            logsChannel.send(`**[!]** ${message.author} was unregistered!`)
    
            let data = JSON.parse(fs.readFileSync('./tempRegs.json'))
            data.push({time : +new Date() , id: message.member.id})
            fs.writeFileSync('./tempRegs.json', JSON.stringify(data,null,2))
        })
        .catch((e) => {
            console.log(e)
            message.reply('Oops, there was an error trying to delete your info!')
        })
    })
    
    if (command == "userinfo")
    
    if(message.mentions.members.first()) var member = message.mentions.members.first()
    else var member = message.member
    
    let sql = await SQLite.open('./userData.sqlite')
    let user = await sql.get(`SELECT social FROM users WHERE id = ${member.id}`)
    
    if(!user) var nick = '**NOT REGISTERED**'
    else var nick = user.social
    
    let embed = new Discord.RichEmbed()
    .setThumbnail(member.user.displayAvatarURL)
    .setAuthor(member.user.tag)
    .addField('Account Creation', member.user.createdAt.toDateString(), true)
    .addField('Joined Server', member.joinedAt.toDateString())
    .addField('Social Club Name', nick)
    .setFooter(`Member ID : ${member.id}`)
    .setColor(0x66b3ff)
    
    message.channel.send(embed)

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