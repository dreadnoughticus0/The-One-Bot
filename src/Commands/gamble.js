module.exports = {
    name: 'gamble',
    description: 'Gamble your money for a chance to win or lose.',
    execute(message, args, userData, { hasCooldown, setCooldown, saveUserData }) {
        const user = message.author.id;
        const amount = parseInt(args[0], 10);

        // Set the cooldown time for the command (e.g., 1 minute = 60,000 milliseconds)
        const cooldownTime = 60 * 1000; // 1 minute cooldown

        // Check if the user is on cooldown for this command
        if (hasCooldown(user, 'gamble')) {
            return message.reply('You are on cooldown. Please wait before gambling again.');
        }

        // Ensure valid amount is provided
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Please specify a valid amount to gamble.');
        }

        // Ensure the user has enough balance to gamble
        if (userData[user].balance < amount) {
            return message.reply('You do not have enough money to gamble that amount.');
        }

        // Simulate the gamble outcome (50% chance to win or lose)
        const gambleResult = Math.random() < 0.5 ? 'win' : 'lose';

        if (gambleResult === 'win') {
            userData[user].balance += amount; // User wins and gains the amount
            message.channel.send(`${message.author.username}, you won ${amount} coins!`);
        } else {
            userData[user].balance -= amount; // User loses and loses the amount
            message.channel.send(`${message.author.username}, you lost ${amount} coins.`);
        }

        saveUserData(); // Save user data

        // Set a cooldown for the user on this command
        setCooldown(user, 'gamble', cooldownTime);
    }
};