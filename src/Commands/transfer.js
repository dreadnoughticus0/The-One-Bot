module.exports = {
    name: 'transfer',
    description: 'Transfer money to your duo partner.',
    execute(message, args, userData, { ensureUser, saveUserData }) {
        const user = message.author.id;

        // Ensure the user exists in the userData
        ensureUser(user);

        const duoPartnerId = userData[user].duo;

        if (!duoPartnerId) {
            return message.channel.send('You are not in a duo! Use the `1duo` command to form a duo.');
        }

        // Ensure the duo partner exists in the userData
        ensureUser(duoPartnerId);

        const amount = parseInt(args[0]);

        // Validate amount
        if (isNaN(amount) || amount <= 0) {
            return message.channel.send('Please specify a valid amount to transfer.');
        }

        // Check if user has enough balance
        if (userData[user].balance < amount) {
            return message.channel.send('You do not have enough coins to make this transfer.');
        }

        // Process the transfer
        userData[user].balance -= amount;
        userData[duoPartnerId].balance += amount;

        saveUserData();

        message.channel.send(`${message.author.username} has transferred ${amount} coins to <@${duoPartnerId}>!`);
    }
};
