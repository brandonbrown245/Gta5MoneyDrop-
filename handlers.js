var Discord = require("discord.js")
module.exports = {

    sendEmbed: (message, txt) => {
        let embed = new Discord.RichEmbed()
        .setColor("#363843")
        .setDescription(txt);
       return embed
    }

}