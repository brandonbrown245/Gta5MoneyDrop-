const SQLite = require('sqlite')
const fs = require('fs')
module.exports = (client, message, args) => {

    SQLite.open('./userData.sqlite')
    .then(async sql => {
        let user = await sql.get(`SELECT * FROM users WHERE id = ${message.author.id}`)
        if(!user) return message.reply("You are not registered!")
        sql.run(`DELETE FROM users WHERE id = ${message.author.id}`)
        .then(() => {
            message.member.addRole(client.config.unregistered)
            message.member.removeRole(client.config.registered)
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
}