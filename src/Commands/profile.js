module.exports = {
    name: 'profile',
    description: 'Displays your profile with balance, level, inventory, and more.',
    execute(message, args, userData) {
        const user = message.author.id;

        // Ensure the user has a data entry
        if (!userData[user]) {
            return message.channel.send("You don't have any profile data yet. Start interacting with the bot to create one!");
        }

        const userInfo = userData[user];

        // Format inventory for display
        const inventoryDisplay = userInfo.inventory.length > 0
            ? userInfo.inventory.map(item => {
                if (item.shield) {
                    const remainingTime = item.shield.expires - Date.now();
                    const hours = Math.floor(remainingTime / 3600000);
                    const minutes = Math.floor((remainingTime % 3600000) / 60000);
                    return `🛡️ Shield (Expires in ${hours}h ${minutes}m)`;
                }
                if (item['steal-booster']) {
                    return `💪 Steal Booster`;
                }
                if (item['lucky-box']) {
                    return `🎉 Lucky Box`;
                }
                if (item['mystery-box']) {
                    return `🎁 Mystery Box`;
                }
                return 'Unknown Item';
            }).join('\n')
            : 'No items';

        // Create a profile embed
        const profileEmbed = {
            color: 0x0099ff,
            title: `${message.author.username}'s Profile`,
            thumbnail: {
                url: message.author.displayAvatarURL({ dynamic: true })
            },
            fields: [
                { name: 'Balance', value: `${userInfo.balance} coins`, inline: true },
                { name: 'Bank', value: `${userInfo.bank} coins`, inline: true },
                { name: 'Level', value: `${userInfo.level}`, inline: true },
                { name: 'Rank', value: `${userInfo.rank}`, inline: true },
                { name: 'Points', value: `${userInfo.points}`, inline: true },
                { name: 'Quests Completed', value: `${userInfo.quests.length}`, inline: true },
                { name: 'Achievements', value: `${userInfo.achievements.length}`, inline: true },
                { name: 'Inventory', value: inventoryDisplay, inline: false }
            ],
            timestamp: new Date(),
            footer: {
                text: 'Profile info'
            }
        };

        // Send the profile embed message
        message.channel.send({ embeds: [profileEmbed] });
    }
};