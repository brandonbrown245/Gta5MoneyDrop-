module.exports = async (client, messageReaction, user) => {

    const message = messageReaction.message;
    const verifyChannel = message.guild.channels.find(c => c.name === 'rules');
    const member = message.guild.members.get(user.id);
    if (member.user.bot) return;

    const verify = message.guild.roles.get('576837526556377099');

    if (messageReaction.emoji.name === '✅' && message.channel.id === verifyChannel.id) {
    member.addRole(verify).catch(console.error);
    }

    if (['🇦', '🇧', '🇨'].includes(messageReaction.emoji.name) && message.channel.id === welcomeChannel.id) {
    switch (messageReaction.emoji.name) {
    case '🇦':
    member.addRole(a).catch(console.error);
    break;
    case '🇧':
    member.addRole(b).catch(console.error);
    break;
    case '🇨':
    member.addRole(c).catch(console.error);
    break;
    default:
    break;
    }
    return;
    }

};
module.exports.help = {
    name:"rule"
  }