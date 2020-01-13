const SQLite = require('sqlite')
const Discord = require('discord.js')

module.exports = async (client, message, args) => {

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
}
