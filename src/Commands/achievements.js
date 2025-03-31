module.exports = {
    name: 'achievement',
    description: 'Check and claim your achievements.',
    execute(message, args, userData, { saveUserData }) {
        const user = message.author.id;
        const userAchievements = userData[user].achievements;

const advancedAchievements = [
    { name: 'Reach Level 10', condition: userData[user].level >= 10, reward: 500 },
    { name: 'Earn 1000 coins', condition: userData[user].balance >= 1000, reward: 300 },
    { name: 'Win 10 minigames', condition: userData[user].inventory.filter(item => item.includes('Win')).length >= 10, reward: 400 },
    { name: 'Win 5 Dice Rolls', condition: userData[user].inventory.filter(item => item === 'Dice Roll Win').length >= 5, reward: 300 },
    { name: 'Win 5 Coin Flips', condition: userData[user].inventory.filter(item => item === 'Coin Flip Win').length >= 5, reward: 300 },
    { name: 'Solve 3 Word Scrambles', condition: userData[user].inventory.filter(item => item === 'Scramble Win').length >= 3, reward: 250 },
    { name: 'Earn 5000 coins', condition: userData[user].balance >= 5000, reward: 700 },
    { name: 'Win 3 Heists', condition: userData[user].heistsWon >= 3, reward: 800 }
];

        let completedAchievements = 0;
        advancedAchievements.forEach(achievement => {
            if (achievement.condition && !userAchievements.includes(achievement.name)) {
                userData[user].balance += achievement.reward;
                userAchievements.push(achievement.name);
                completedAchievements++;
                message.channel.send(`${message.author.username}, you've unlocked the achievement: ${achievement.name} and earned ${achievement.reward} coins!`);
            }
        });

        if (completedAchievements === 0) {
            message.channel.send('No new achievements unlocked yet.');
        }

        saveUserData();
    }
};
