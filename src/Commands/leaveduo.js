module.exports = {
    name: 'leaveduo',
    description: 'Leave your current duo or alliance.',
    execute(message, args, userData, { saveUserData }) {
        const user = message.author.id;

        // Check if the user is in a duo
        if (!userData[user].duo) {
            return message.channel.send(`${message.author.username}, you are not part of any duo.`);
        }

        const teammate = userData[user].duo;

        // Remove duo for both users
        userData[user].duo = null;
        if (userData[teammate]) {
            userData[teammate].duo = null;
        }

        saveUserData();

        message.channel.send(`${message.author.username}, you have successfully left the duo with <@${teammate}>.`);
    }
};
