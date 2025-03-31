// enableAll.js
module.exports = {
    name: 'enableall',
    description: 'Enable lottery participation for all users in the server (excluding bots).',
    execute(message, args, userData, { ensureUser, saveUserData }) {

// Check if the executor is an admin or the specific user ID
const allowedUserId = '1205930312564084750'; // Replace with the specific user ID

if (!message.member.permissions.has('ADMINISTRATOR') && message.author.id !== allowedUserId) {
    return message.channel.send('You do not have permission to use this command.');
}

        // Iterate through all server members and enable them
        message.guild.members.fetch().then(members => {
            let enabledCount = 0;

            members.forEach(member => {
                if (member.user.bot) return; // Skip bots

                const userId = member.id;
                ensureUser(userId); // Ensure user data structure exists

                // Add or update any flags you need here, e.g., enabling lottery participation
                userData[userId].enabled = true;
                enabledCount++;
            });

            // Save changes to user data
            saveUserData();

            message.channel.send(`Enabled participation for ${enabledCount} users (excluding bots) in this server.`);
        }).catch(error => {
            console.error(error);
            message.channel.send("There was an error while enabling users.");
        });
    }
};
