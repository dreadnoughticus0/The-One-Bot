module.exports = {
    name: 'rank',
    description: 'Check your current rank and level.',
    execute(message, args, userData, { ensureUser }) {
        const user = message.author.id;
        ensureUser(user);
        
        const rank = userData[user].rank;
        const level = userData[user].level;

        message.channel.send(`${message.author.username}, you are currently level ${level} and your rank is ${rank}.`);
    }
};
