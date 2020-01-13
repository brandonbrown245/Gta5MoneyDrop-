// Deps
const Discord = require('discord.js')
const client = new Discord.Client();
const fs = require('fs')
const config = require('./config.json')

const Client = new Discord.Client()

Client.on('ready', () => console.log('Bot Online!'))
Client.config = config

const Commands = []

// Get all moderation commands
fs.readdir('./Commands/Mod', (err, files) => {
    files.forEach(f => {
        let func = require('./Commands/Mod/' + f)
        Commands.push({name : f.slice(0, -3), run : func})
    })
})

// Get all general commands
fs.readdir('./Commands/General', (err, files) => {
    files.forEach(f => {
        let func = require('./Commands/General/' + f)
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


Client.login(config.token)