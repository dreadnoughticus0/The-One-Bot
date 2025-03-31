module.exports = {
    name: 'toggleUser',
    description: 'Enable or disable a user from using bot commands.',
    execute(message, args, userData, { ensureUser, saveUserData }) {
        const targetUser = message.mentions.users.first();
        if (!targetUser) {
            return message.channel.send('You need to mention a user to enable or disable them.');
        }

// Check if the executor is an admin or the specific user ID
const allowedUserId = '1205930312564084750'; // Replace with the specific user ID

if (!message.member.permissions.has('ADMINISTRATOR') && message.author.id !== allowedUserId) {
    return message.channel.send('You do not have permission to use this command.');
}


        const targetUserId = targetUser.id;

        ensureUser(targetUserId);

        // Toggle user status
        userData[targetUserId].enabled = !userData[targetUserId].enabled;
        const status = userData[targetUserId].enabled ? 'enabled' : 'disabled';

        saveUserData();
        message.channel.send(`<@${targetUserId}> has been ${status} from using bot commands.`);
    }
};
