const SQLite = require('sqlite')
const fs = require('fs')
module.exports = (client, message, args) => {

    let name = args.join(' ')
    if(!name) return message.reply("You need to provide your Social Club nickname")

    SQLite.open('./Data/userData.sqlite')
    .then(async sql => {
        let user = await sql.get(`SELECT * FROM users WHERE id = ${message.author.id}`)
        if(user) return message.reply("You are already registered!")
        sql.run(`INSERT INTO users (id, social) VALUES ('${message.author.id}', '${name}')`)
        .then(() => {
            message.member.addRole(client.config.registered)
            message.member.removeRole(client.config.unregistered)
            let logsChannel = client.channels.get(client.config.logschannel)
            message.channel.send(`Successfully registered!`)
            .then(msg => msg.delete(5000))
            logsChannel.send(`**[!]** ${message.author} was registered with \`${name}\` as his Social Club name `)

            let data = JSON.parse(fs.readFileSync('./Data/tempRegs.json'))
            let found = data.findIndex(d => d.id == message.author.id) 
            if(found !== -1) {
                data.splice(found, 1)
                fs.writeFileSync('./Data/tempRegs.json', JSON.stringify(data),null,2)
            }
        })
        .catch((e) => {
            console.log(e)
            message.reply('Oops, there was an error trying to save your info!')
        })
    })

}