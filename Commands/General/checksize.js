const fs = require('fs')
module.exports = (client, message, args) => {
    var stats = fs.statSync("./Data/userData.sqlite")
    console.log(stats)
}