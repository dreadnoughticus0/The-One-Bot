module.exports = {
    name: 'quest',
    description: 'Check your quests and claim rewards.',
    execute(message, args, userData, { saveUserData }) {
        const user = message.author.id;
        const userQuests = userData[user].quests;

        const complexQuests = [
            { name: 'Win 3 RPS games', condition: userData[user].inventory.filter(item => item === 'RPS Win').length >= 3, reward: 150 },
            { name: 'Gamble and win 500 coins', condition: userData[user].balance >= 500, reward: 200 },
            { name: 'Complete 5 Trivia questions', condition: userData[user].inventory.filter(item => item === 'Trivia Win').length >= 5, reward: 250 },
            // Add more complex quests as needed
        ];

        let completedQuests = 0;
        complexQuests.forEach(quest => {
            if (quest.condition && !userQuests.includes(quest.name)) {
                userData[user].balance += quest.reward;
                userQuests.push(quest.name);
                completedQuests++;
                message.channel.send(`${message.author.username}, you've completed the quest: ${quest.name} and earned ${quest.reward} coins!`);
            }
        });

        if (completedQuests === 0) {
            message.channel.send('No complex quests completed yet.');
        }

        saveUserData();
    }
};
