module.exports = {
    name: 'steal',
    description: 'Steal money from another user.',
    execute(message, args, userData, { saveUserData, hasCooldown, setCooldown }) {
        const targetUser = message.mentions.users.first();
        const user = message.author.id;

        if (!targetUser) {
            return message.channel.send('Please mention a user to steal from.');
        }

        if (targetUser.id === user) {
            return message.channel.send('You cannot steal from yourself!');
        }

        if (hasCooldown(user, 'steal')) {
            return message.channel.send('You are on cooldown for this command.');
        }

        const targetInventory = userData[targetUser.id]?.inventory || [];
        const shield = targetInventory.find(item => item.shield && item.shield.expires > Date.now());

        if (shield) {
            return message.channel.send(`${targetUser.username} is protected by a Shield. You cannot steal from them right now.`);
        }

        const stealAmount = Math.floor(Math.random() * 50) + 1; // Random amount between 1 and 50
        let boostedAmount = stealAmount;

        // Check if the user has a steal-booster in their inventory
        const userInventory = userData[user].inventory || [];
        const stealBoosterIndex = userInventory.findIndex(item => item["steal-booster"] !== undefined);

        if (stealBoosterIndex !== -1) {
            boostedAmount = Math.floor(stealAmount * 1.5); // Increase by 50%
            userInventory.splice(stealBoosterIndex, 1); // Remove the steal-booster after use
        }

        // Ensure target user has enough balance
        if (userData[targetUser.id].balance < boostedAmount) {
            return message.channel.send(`${targetUser.username} doesn’t have enough money to steal.`);
        }

        // Perform the transaction
        userData[targetUser.id].balance -= boostedAmount;
        userData[user].balance += boostedAmount;

        // Save data and set cooldown
        saveUserData();
        setCooldown(user, 'steal', 60000); // 1-minute cooldown

        message.channel.send(`${message.author.username} stole ${boostedAmount} coins from ${targetUser.username}!`);
    }
};