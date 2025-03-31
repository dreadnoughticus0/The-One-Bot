module.exports = {
    name: 'leaderboard',
    description: 'Displays the leaderboard of users based on their balance.',
    execute(message, args, userData) {
        // Create an array from userData and sort it by balance
        const leaderboard = Object.keys(userData).map(user => ({
            userId: user,
            balance: userData[user].balance,
            username: message.client.users.cache.get(user)?.username || 'Unknown User'
        }));

        // Sort the leaderboard by balance in descending order
        leaderboard.sort((a, b) => b.balance - a.balance);

        // Create a leaderboard message
        const leaderboardEmbed = {
            color: 0x0099ff,
            title: 'Leaderboard',
            fields: [],
            timestamp: new Date(),
            footer: {
                text: 'Use !profile to check your own stats!'
            }
        };

        // Add the top users to the leaderboard embed
        leaderboard.slice(0, 10).forEach((entry, index) => {
            leaderboardEmbed.fields.push({
                name: `${index + 1}. ${entry.username}`,
                value: `${entry.balance} coins`,
                inline: true
            });
        });

        // Send the leaderboard embed message
        message.channel.send({ embeds: [leaderboardEmbed] });
    }
};
