module.exports = {
    name: 'deposit',
    description: 'Deposit money into the bank.',
    execute(message, args, userData, { saveUserData }) {
        const user = message.author.id;
        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount <= 0) {
            return message.channel.send('Please specify a valid amount.');
        }

        if (userData[user].balance < amount) {
            return message.channel.send('You don\'t have enough money.');
        }

        userData[user].balance -= amount;
        userData[user].bank += amount;
        saveUserData();

        message.channel.send(`${message.author.username}, you deposited ${amount} coins into your bank.`);
    }
};
