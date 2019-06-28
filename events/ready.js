module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`);
    const verify = client.channels.find(c => c.name === 'rules');

    const fetchedMessages = [verify];
    fetchedMessages.forEach(c => {
    });
};