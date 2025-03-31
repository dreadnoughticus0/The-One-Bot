module.exports = {
    name: 'duodaily',
    description: 'Claim a daily reward for you and your duo!',
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

        const currentDate = new Date().toDateString(); // Get the current date (e.g., 'Mon Oct 23 2023')
        const userLastClaimed = userData[user].lastDuoDaily;
        const duoLastClaimed = userData[duoPartnerId].lastDuoDaily;

        // Check if both users have already claimed today's reward
        if (userLastClaimed === currentDate || duoLastClaimed === currentDate) {
            return message.channel.send('You or your duo partner have already claimed the duo daily reward today. Come back tomorrow!');
        }

        // Award 200 coins to both users
        userData[user].balance += 200;
        userData[duoPartnerId].balance += 200;

        // Update the last claim date for both users
        userData[user].lastDuoDaily = currentDate;
        userData[duoPartnerId].lastDuoDaily = currentDate;

        saveUserData();

        message.channel.send(`${message.author.username} and <@${duoPartnerId}> have both received 200 coins from the duo daily reward!`);
    }
};