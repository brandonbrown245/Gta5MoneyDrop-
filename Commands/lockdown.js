module.exports = async (client, message, args) => {

    if(!message.member.roles.get(client.config.modRole)) return message.channel.send("You don't have the permissions to use this command!")
    
    let perms = message.channel.permissionsFor(message.guild.id)
    let hasPerm = perms.has('SEND_MESSAGES')
    if(hasPerm) {
        message.channel.overwritePermissions(message.guild.id , {SEND_MESSAGES : false})
        .then(() => {
            message.channel.send('This channel is now temporarily **Locked**')
        })
        .catch(() => {
            message.channel.send('Could not lockdown the channel!')
        })
    }else {
        message.channel.overwritePermissions(message.guild.id , {SEND_MESSAGES : null})
        .then(() => {
            message.channel.send('The lockdown has been removed!')
        })
        .catch(() => {
            message.channel.send('Could not remove the lockdown for this channel!')
        })
    }

}