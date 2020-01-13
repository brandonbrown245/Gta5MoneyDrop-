
module.exports = async (client, message, args) => {

    let usu = message.mentions.members.first()

    let reason = args.slice(1).join(' ')

    let muterole = message.guild.roles.get(client.config.muterole)

    if(!message.member.roles.get(client.config.modRole)) return message.channel.send("You don't have the permissions to use this command!")
    
    if (!usu) return message.channel.send('You have to mention someone')
  
    if(!reason) return message.reply('You need to provide a reason')

    if (!muterole) message.channel.send('Couldn\'t find the Mute role!')

    await usu.addRole(muterole)

    message.delete()
    
    let logsChannel = client.channels.get(client.config.logschannel)
    message.channel.send(`**[!]** ${usu} was muted by ${message.author} with the reason: \`${reason}\``)
    logsChannel.send(`**[!]** ${usu} was muted by ${message.author} with the reason: \`${reason}\``)

}