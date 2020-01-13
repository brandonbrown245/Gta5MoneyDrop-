const SQLite = require('sqlite')
const Discord = require('discord.js')

module.exports = async (client, message, args) => {

    if(!message.member.roles.get(client.config.modRole)) return message.channel.send("You don't have the permissions to use this command!")
    
    let member = message.mentions.members.first()

    if(!member) return message.reply('You need to mention a valid member')

    SQLite.open('./Data/userData.sqlite')
    .then(sql => {

        sql.all(`SELECT * FROM warns WHERE id = ${member.id}`)
        .then(async rows => {
            if(rows.length == 0) return message.reply('The user has no warns')
            let send = rows.map(r => `${new Date(Math.floor(r.date)).toJSON().slice(0,10).split('-').reverse().join('/')} - ${r.reason}`)
            let embed = new Discord.RichEmbed()
            .setAuthor('WARNS OF ' + member.user.tag, member.user.displayAvatarURL)
            .setDescription(send)
            message.channel.send(embed)
        })

    })
    .catch(() => message.reply('There was an error trying to save the data'))

}