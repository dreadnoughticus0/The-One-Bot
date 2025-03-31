module.exports = {
    name: 'job',
    description: 'Work to earn money.',
    execute(message, args, userData, { saveUserData, hasCooldown, setCooldown }) {
        const user = message.author.id;

        if (hasCooldown(user, 'job')) {
            return message.channel.send('You are still tired from your last job. Please wait.');
        }

        const salary = Math.floor(Math.random() * 200) + 50;
        userData[user].balance += salary;
        saveUserData();

        setCooldown(user, 'job', 3600000); // 1-hour cooldown
        message.channel.send(`${message.author.username}, you worked and earned ${salary} coins!`);
    }









};
