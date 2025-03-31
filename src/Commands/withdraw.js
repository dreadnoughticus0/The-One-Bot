module.exports = {
    name: 'withdraw',
    description: 'Withdraw money from your bank.',
    execute(message, args, userData, { saveUserData }) {
        const user = message.author.id;
        const amount = parseInt(args[0], 10);

        if (isNaN(amount) || amount <= 0) {
            return message.reply('Please specify a valid amount to withdraw.');
        }

        // Check if the user has enough money in the bank
        if (userData[user].bank < amount) {
            return message.reply('You do not have enough money in the bank to withdraw that amount.');
        }

        // Withdraw the amount from the bank and add it to the user's balance
        userData[user].bank -= amount;
        userData[user].balance += amount;

        saveUserData(); // Save the updated user data

        return message.reply(`You have successfully withdrawn ${amount} coins. Your new balance is ${userData[user].balance} coins, and your bank balance is ${userData[user].bank} coins.`);
    }
};
