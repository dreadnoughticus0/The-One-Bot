const validCodes = {
    'Just an Arras Player': 100,    // Code to redeem 100 coins
    'Number Guy': 200,    // Code to redeem 200 coins
    'Infynotarras': 500,      // Code to redeem 500 coins
    // Add more codes and their respective rewards here
};

module.exports = {
    name: 'redeem',
    description: 'Redeem a code for a reward.',
    execute(message, args, userData, { ensureUser, saveUserData }) {
        const user = message.author.id;

        // Ensure the user exists in the userData
        ensureUser(user);

        if (!args.length) {
            return message.channel.send('You need to provide a code to redeem!');
        }

        const code = args[0].toUpperCase(); // Get the code provided by the user and convert it to uppercase

        // Check if the code is valid
        if (!validCodes[code]) {
            return message.channel.send('Invalid code! Please try again.');
        }

        // Check if the user has already redeemed this code
        if (userData[user].redeemedCodes && userData[user].redeemedCodes.includes(code)) {
            return message.channel.send('You have already redeemed this code!');
        }

        // Award the user the specified amount of money
        const rewardAmount = validCodes[code];
        userData[user].balance += rewardAmount;

        // Mark the code as redeemed for this user
        userData[user].redeemedCodes = userData[user].redeemedCodes || [];
        userData[user].redeemedCodes.push(code);

        // Save the updated user data
        saveUserData();

        message.channel.send(`You have successfully redeemed the code **${code}** and received **${rewardAmount}** coins!`);
    },
};
