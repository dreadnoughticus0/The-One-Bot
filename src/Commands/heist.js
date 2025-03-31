const { MessageCollector } = require('discord.js');
const cooldown = 60 * 60 * 1000; // 1 hour in milliseconds

module.exports = {
    name: 'heist',
    description: 'Initiate a heist to steal money from another user\'s bank.',
    async execute(message, args, userData, { saveUserData, setCooldown, hasCooldown }) {
        const user = message.author.id;
        const targetUser = message.mentions.users.first();

        // Check if user provided a target
        if (!targetUser) {
            return message.reply('Please mention a user to target for the heist.');
        }

        const targetUserId = targetUser.id;

        // Ensure both the user and target have data
        if (!userData[user]) ensureUser(user); 
        if (!userData[targetUserId]) ensureUser(targetUserId);

        // Check cooldown for initiating user
        if (hasCooldown(user, 'heist')) {
            const timeLeft = Math.ceil((userData[user].cooldowns['heist'] - Date.now()) / 60000);
            return message.reply(`You must wait ${timeLeft} minutes before initiating another heist.`);
        }

        // Check if target has enough money in the bank
        if (userData[targetUserId].bank < 1000) {
            return message.reply('The target does not have enough money in their bank for a heist.');
        }

        // Set up collector for the second participant
        message.channel.send('A heist has been started! Another person must join by typing `join` within 1 minute.');

        const filter = m => m.content.toLowerCase() === 'join' && m.author.id !== user;
        const collector = new MessageCollector(message.channel, filter, { time: 60000 });

        collector.on('collect', m => {
            collector.stop('heist started');
            const partner = m.author.id;

            // Check if the partner is on cooldown
            if (hasCooldown(partner, 'heist')) {
                return m.reply(`You are on cooldown for the heist command.`);
            }

            // Proceed with the heist
            const heistAmount = Math.floor(Math.random() * 2001) + 1000; // Random amount between 1000 and 3000
            const success = Math.random() < 0.4; // 40% chance of success

            if (success && userData[targetUserId].bank >= heistAmount) {
                // Deduct from target and split between participants
                userData[targetUserId].bank -= heistAmount;
                const splitAmount = Math.floor(heistAmount / 2);
                userData[user].bank += splitAmount;
                userData[partner].bank += splitAmount;
                userData[user].heistsWon = (userData[user].heistsWon || 0) + 1;
                userData[partner].heistsWon = (userData[partner].heistsWon || 0) + 1;

                message.channel.send(
                    `The heist succeeded! ${message.author.username} and ${m.author.username} each stole ${splitAmount} coins from ${targetUser.username}'s bank!`
                );
            } else {
                message.channel.send('The heist failed! Better luck next time.');
            }

            // Apply cooldown for both participants
            setCooldown(user, 'heist', cooldown);
            setCooldown(partner, 'heist', cooldown);

            // Save user data
            saveUserData();
        });

        collector.on('end', (_, reason) => {
            if (reason !== 'heist started') {
                message.reply('The heist was canceled as no one joined.');
            }
        });
    }
};