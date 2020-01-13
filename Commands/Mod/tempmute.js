const ms = require("ms")
const moment = require('moment')
const fs = require('fs')


module.exports = async (client, message, args) => {

    let usu = message.mentions.members.first()

    let time = args.slice(1, 2).join(' ')
    let reason = args.slice(2).join(' ')
    let muterole = message.guild.roles.get(client.config.muterole)

    if(!message.member.roles.get(client.config.modRole)) return message.channel.send("You don't have the permissions to use this command!")
    
    if (!usu) return message.channel.send('You have to mention someone')

    if (!time) return message.channel.send('Bad formatting')
  
    if(!reason) return message.reply('You need to provide a reason')

    if (!time.endsWith("h") && !time.endsWith("d") && !time.endsWith("m") && !time.endsWith("s")) return message.channel.send('Bad formatting')

    if (!muterole) message.channel.send('Couldn\'t find the Mute role!')

    await usu.addRole(muterole)

    message.delete()
    
    let logsChannel = client.channels.get(client.config.logschannel)
    message.channel.send(`**[!]** ${usu} was muted **${time}** by ${message.author} with the reason: \`${reason}\``)
    logsChannel.send(`**[!]** ${usu} was muted **${time}** by ${message.author} with the reason: \`${reason}\``)

    let jsonData = JSON.parse(fs.readFileSync('./Data/mutes.json'))
    jsonData.push({
      time : +moment(new Date()).add(ms(time), 'ms').toDate(),
      id : usu.id
    })

    fs.writeFileSync('./Data/mutes.json', JSON.stringify(jsonData,null,2))

}