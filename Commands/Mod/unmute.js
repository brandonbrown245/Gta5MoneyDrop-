const fs = require('fs')

module.exports = async (client, message, args) => {

    let usu = message.mentions.members.first()

    if(!message.member.roles.get(client.config.modRole)) return message.channel.send("You don't have the permissions to use this command!")
    
    if (!usu) return message.channel.send('You have to mention someone')

    await usu.removeRole(client.config.muterole)
    message.delete()
    let logsChannel = client.channels.get(client.config.logschannel)
    message.channel.send(`**[!]** ${usu} was unmuted by ${message.author}`)
    logsChannel.send(`**[!]** ${usu} was unmuted by ${message.author}`)
}