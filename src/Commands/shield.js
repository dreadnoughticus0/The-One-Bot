module.exports = {
    name: 'shield',
    description: 'Check if you have an active shield.',
    execute(message, args, userData) {
        const user = message.author.id;

        // Get the user's inventory
        const inventory = userData[user]?.inventory || [];

        // Find an active shield
        const shield = inventory.find(item => item.shield && item.shield.expires > Date.now());

        if (shield) {
            const remainingTime = shield.shield.expires - Date.now();
            const hours = Math.floor(remainingTime / 3600000);
            const minutes = Math.floor((remainingTime % 3600000) / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);

            const timeParts = [];
            if (hours > 0) timeParts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
            if (minutes > 0) timeParts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
            if (seconds > 0) timeParts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);

            return message.channel.send(`🛡️ Your Shield is active. It will expire in ${timeParts.join(', ')}.`);
        }

        message.channel.send('You don’t have an active Shield.');
    }
};
