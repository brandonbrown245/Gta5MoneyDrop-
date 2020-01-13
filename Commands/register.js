const SQLite = require('sqlite')
const fs = require('fs')
module.exports = (client, message, args) => {

    let name = args.join(' ')
    if (message.channel.name !== 'register') return message.reply('**You must Register your social club name in the register chat**').then(message => message.delete(6000));

    if(!name) return message.reply("You need to provide your Social Club nickname")

    SQLite.open('./userData.sqlite')
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
            //logsChannel.send(`**[!]** ${message.author} was registered with \`${name}\` as his Social Club name `)

            let cnl = client.channels.get('594187400339783721');
            let embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag}`)
            .setColor("#42f45c")
            .addField('Social Club:', ` \`${name}\``)
            .setThumbnail(message.author.displayAvatarURL)
            cnl.send({embed})

            .catch(e => logger.error(e))

            let verifyEmbed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL)
            .setDescription('Your account has been successfully Registered.')
            .setColor('#36393f')
            message.channel.send(verifyEmbed);

            let embed77 = new Discord.RichEmbed()
            .setColor('#36393f')
            .setDescription(`The Social Club Name You Registered With is **\`${name}\`** If it is not Right just do **>unregister** in the unregister chat and register with the right social club name\n\nNow that you are registered, please be sure to read the rules and how to join. Other than that, enjoy your time in the server and do not be afraid to ask any questions you may have\n\nThe money Dropper Sc name is **Batman_456** he will not add you it is up to you to add the money Dropper\n\nHow to join the money drop lobby\n\nWhen you register you will get the sc of the money dropper you have to add him when you did add him. he will add you when he starts a money drop then you just join his lobby just if he says he is doing a money drop\n`);
            message.author.send(embed77);

            let data = JSON.parse(fs.readFileSync('./tempRegs.json'))
            let found = data.findIndex(d => d.id == message.author.id) 
            if(found !== -1) {
                data.splice(found, 1)
                fs.writeFileSync('./tempRegs.json', JSON.stringify(data),null,2)
            }
        })
        .catch((e) => {
            console.log(e)
            message.reply('Oops, there was an error trying to save your info!')
        })
    })

}

