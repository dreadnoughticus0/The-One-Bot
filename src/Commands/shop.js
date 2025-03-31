const { setInterval } = require('timers');

module.exports = {
    name: 'shop',
    description: 'Buy boxes and get random rewards.',
    execute(message, args, userData, { saveUserData }) {
        const user = message.author.id;
        const userBalance = userData[user].balance;
        const item = args[0];

        // Define shop items with stock
        const shopItems = {
            "lucky-box": {
                name: "Lucky-Box",
                cost: 300,
                description: "Chance to either win or lose between 100 and 500 coins.",
                stock: 3
            },
            "mystery-box": {
                name: "Mystery-Box",
                cost: 2000,
                description: "Gives a random amount of coins between 1000 and 3000.",
                stock: 3
            },
            "shield": {
                name: "Shield",
                cost: 1000,
                description: "Protects you from being stolen from for 1 day.",
                stock: 3
            },
            "steal-booster": {
                name: "Steal-Booster",
                cost: 50,
                description: "Boost steal amount by 50%.",
                stock: 3
            }
        };

        // Function to reset stock every hour
        if (!global.stockResetScheduled) {
            global.stockResetScheduled = true; // Avoid scheduling multiple resets
            setInterval(() => {
                for (const key in shopItems) {
                    shopItems[key].stock = 3; // Reset stock
                }
                console.log('Shop stock has been reset.');
            }, 3600000); // 1 hour
        }

        // If no item is provided or the item doesn't exist in the shop
        if (!item || !shopItems[item]) {
            let shopMessage = '**Welcome to the Shop!**\nHere are the available items:\n';
            for (const [key, value] of Object.entries(shopItems)) {
                shopMessage += `**${value.name}** - ${value.cost} coins: ${value.description} (Stock: ${value.stock})\n`;
            }
            return message.channel.send(shopMessage);
        }

        const selectedItem = shopItems[item];

        // Check if the item is in stock
        if (selectedItem.stock <= 0) {
            return message.channel.send(`🚫 The ${selectedItem.name} is currently out of stock. Please check back later.`);
        }

        // Check if the user has enough coins to buy the item
        if (userBalance < selectedItem.cost) {
            return message.channel.send(`You don’t have enough coins to buy ${selectedItem.name}.`);
        }

        // Deduct the cost of the item from the user's balance and decrement stock
        userData[user].balance -= selectedItem.cost;
        selectedItem.stock -= 1;

        // Handle item effects
        if (item === "shield") {
            const shieldExpiry = Date.now() + 86400000; // 1 day
            userData[user].inventory.push({ "shield": { expires: shieldExpiry } });
            message.channel.send(`🛡️ You bought a Shield! Using \`1shield\` will protect you from being stolen from for 1 day.`);
        } else if (item === "steal-booster") {
            userData[user].inventory.push({ "steal-booster": null });
            message.channel.send(`💪 You bought a Steal Booster! This will increase the amount you steal by 50%.`);
        } else if (item === "lucky-box") {
            const outcome = Math.random() < 0.5 ? 'win' : 'lose';
            const randomAmount = Math.floor(Math.random() * (500 - 100 + 1)) + 100;

            if (outcome === 'win') {
                userData[user].balance += randomAmount;
                message.channel.send(`🎉 You opened a Lucky Box and won **${randomAmount}** coins!`);
            } else {
                userData[user].balance -= randomAmount;
                message.channel.send(`😢 You opened a Lucky Box and lost **${randomAmount}** coins.`);
            }
        } else if (item === "mystery-box") {
            const mysteryReward = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
            userData[user].balance += mysteryReward;
            message.channel.send(`🎁 You opened a Mystery Box and got **${mysteryReward}** coins!`);
        }

        // Save user data
        saveUserData();
    }
};