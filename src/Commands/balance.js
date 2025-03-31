module.exports = {
    name: 'balance',
    description: 'Check balance.',
    execute(message, args, userData) {
        const user = message.author.id;
        const balance = userData[user].balance;
        message.channel.send(`${message.author.username}, you have ${balance} coins.`);
    }
};
