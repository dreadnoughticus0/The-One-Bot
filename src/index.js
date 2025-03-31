const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.commands = new Collection();
const prefix = '1';
const dataPath = './data.json'; // JSON file to store user data

const allowedChannels = ['1303408584494944267', '1285867845993103411']; // Replace with your allowed channel IDs

// Load commands
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Load user data from JSON
let userData = {};

// Load existing user data if available
if (fs.existsSync(dataPath)) {
    userData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} else {
    console.log("User data file does not exist. Creating a new one.");
}

function determineRank(level) {
    if (level >= 1 && level <= 5) return 'Novice';
    if (level >= 6 && level <= 10) return 'Intermediate';
    if (level >= 11 && level <= 15) return 'Advanced';
    if (level >= 16 && level <= 20) return 'Expert';
    return 'Master'; // Level 21 and above
}

// Function to save user data
function saveUserData() {
    fs.writeFileSync(dataPath, JSON.stringify(userData, null, 4));
}

// Ensure user exists in the database
function ensureUser(userId) {
    if (!userData[userId]) {
        userData[userId] = {
            balance: 0,
            bank: 0,
            inventory: [],
            achievements: [],
            level: 1,
            points: 0,
            rank: "Novice",
            quests: [],
            cooldowns: {},
            duo: null, // teammate for alliance
            enabled: true,
            redeemedCodes: [] // Add this line to track redeemed codes
        };
    }
}

// Cooldown system
function hasCooldown(userId, command) {
    const currentTime = Date.now();
    const cooldown = userData[userId].cooldowns[command];
    return cooldown && cooldown > currentTime;
}

function setCooldown(userId, command, cooldownTime) {
    userData[userId].cooldowns[command] = Date.now() + cooldownTime;
    saveUserData();
}

// Command Handler
client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (!allowedChannels.includes(message.channel.id)) {
        return; // Ignore messages not in allowed channels
    }

    const user = message.author.id;
    ensureUser(user);

// Points and level progression
userData[user].points += 10; // Award points per message
const levelUpPoints = userData[user].level * 100; // Example level-up system

if (userData[user].points >= levelUpPoints) {
    userData[user].points = 0;
    userData[user].level += 1;

    // Update the user's rank
    userData[user].rank = determineRank(userData[user].level);

    message.channel.send(`${message.author.username}, you leveled up to level ${userData[user].level}! You are now a ${userData[user].rank}!`);
}

saveUserData();

    // Command processing
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (!command) return;

    if (!userData[user].enabled) {
        return message.channel.send('You are currently disabled from using bot commands.');
    }

    try {
        ensureUser(message.author.id); // Ensure user data is present
        command.execute(message, args, userData, { ensureUser, saveUserData, hasCooldown, setCooldown });
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

// Log the bot in
client.login(token); // Use an environment variable for the token
