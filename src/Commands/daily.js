module.exports = {
    name: 'daily',
    description: 'Claim your daily reward.',
    execute(message, args, userData, { saveUserData }) {
        const user = message.author.id;

        // Ensure the user exists in the data
        if (!userData[user]) {
            userData[user] = { balance: 0, lastDaily: null, level: 1, points: 0, inventory: [], achievements: [], duo: null };
        }

        const currentDate = new Date().toDateString(); // Get current date as a string (e.g., 'Mon Oct 23 2023')
        const lastClaimed = userData[user].lastDaily;

        // Check if the user has already claimed today's reward
        if (lastClaimed === currentDate) {
            return message.channel.send(`${message.author.username}, you've already claimed your daily reward today. Come back tomorrow!`);
        }

        // Reward the user
        const dailyReward = 200; // Define your daily reward amount
        userData[user].balance += dailyReward;
        userData[user].lastDaily = currentDate; // Update the last daily claim date

        saveUserData();

        message.channel.send(`${message.author.username}, you've claimed your daily reward of ${dailyReward} coins!`);
    },
};