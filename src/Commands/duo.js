module.exports = {
    name: 'duo',
    description: 'Form a duo with another user to get more rewards in games.',
    async execute(message, args, userData, { ensureUser, saveUserData }) {
        const user = message.author.id;
        const targetUser = message.mentions.users.first(); // Mentioned user to form a duo with

        // Ensure the user exists in the userData
        ensureUser(user);

        if (!targetUser) {
            return message.channel.send('Please mention a user to form a duo with.');
        }

        const targetUserId = targetUser.id;

        // Check if they are trying to form a duo with themselves
        if (user === targetUserId) {
            return message.channel.send('You cannot form a duo with yourself.');
        }

        // Ensure the target user exists in the userData
        ensureUser(targetUserId);

        // Check if the user is already in a duo
        if (userData[user].duo) {
            return message.channel.send('You are already in a duo with someone.');
        }

        // Check if the target user is already in a duo
        if (userData[targetUserId].duo) {
            return message.channel.send(`${targetUser.username} is already in a duo with someone else.`);
        }

        // Send a duo request and await confirmation
        const duoRequest = await message.channel.send(`${targetUser.username}, ${message.author.username} wants to form a duo with you! Type \`1accept\` to accept or \`1decline\` to decline.`);

        const filter = response => {
            return (response.author.id === targetUserId && (response.content.toLowerCase() === '1accept' || response.content.toLowerCase() === '1decline'));
        };

        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const response = collected.first().content.toLowerCase();

                if (response === '1accept') {
                    // Form the duo
                    userData[user].duo = targetUserId;
                    userData[targetUserId].duo = user;

                    saveUserData();
                    message.channel.send(`${message.author.username} and ${targetUser.username} are now a duo! You will receive more rewards together.`);
                } else {
                    message.channel.send(`${targetUser.username} declined the duo request.`);
                }
            })
            .catch(() => {
                message.channel.send(`${targetUser.username} did not respond in time. Duo request canceled.`);
            });
    }
};
