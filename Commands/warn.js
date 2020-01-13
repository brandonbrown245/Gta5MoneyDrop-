const SQLite = require('sqlite')
const fs = require('fs')
const moment = require('moment')

module.exports = async (client, message, args) => {

    if(!message.member.roles.get(client.config.modRole)) return message.channel.send("You don't have the permissions to use this command!")
    
    let member = message.mentions.members.first()
    let reason = args.slice(1).join(' ')
    if(!member) return message.reply('You need to mention a valid member')
    if(!reason) return message.reply('You need to provide a reason')
    message.delete()
    SQLite.open('./Data/userData.sqlite')
    .then(sql => {
        sql.run(`INSERT INTO warns (id ,tag , mid, mtag, date, reason) VALUES ('${member.id}', '${member.user.tag}', '${message.author.id}', '${message.author.tag}', '${+new Date()}', '${reason}')`)
        .then(async () => {
            let logsChannel = client.channels.get(client.config.logschannel)
            message.channel.send(`**[!]** ${member} was warned by ${message.author} with the reason: \`${reason}\``)
            logsChannel.send(`**[!]** ${member} was warned by ${message.author} with the reason: \`${reason}\``)

            sql.all(`SELECT * FROM warns WHERE id = ${member.id}`)
            .then(async rows => {
                if(rows.length == 2) {
                    await member.user.send(`You were muted **2h** from **${message.guild.name}** for reaching a total of 2 warnings`)
                    .catch(() => {})
                    member.addRole(client.config.muterole)
                    logsChannel.send(`**[!]** ${member} was muted for reaching a total of 2 warns`)
                    let jsonData = JSON.parse(fs.readFileSync('./Data/mutes.json'))

                    jsonData.push({
                      time : +moment(new Date()).add(60000, 'ms').toDate(),
                      id : member.id
                    })

                    fs.writeFileSync('./Data/mutes.json', JSON.stringify(jsonData,null,2))
                }else if (rows.length == 3) {
                    await member.user.send(`You were banned from **${message.guild.name}** for reaching a total of 3 warnings`)
                    .catch(() => {})
                    member.ban('3 warns ban')
                    .catch(() => message.channel.send("Could't ban the user!"))
                    logsChannel.send(`**[!]** ${member} was banned for reaching a total of 3 warns`)
                }
            })
        })
        .catch(() => message.reply('There was an error trying to save the data'))
    })
    .catch(() => message.reply('There was an error trying to get the users data!'))
}