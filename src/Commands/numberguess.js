module.exports = {
    name: 'numberguess',
    description: 'Guess a number between 1 and 10!',
    execute(message, args, userData, { saveUserData }) {
        const userGuess = parseInt(args[0]);
        const correctNumber = Math.floor(Math.random() * 10) + 1;

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
            return message.channel.send('Please guess a number between 1 and 10.');
        }

        if (userGuess === correctNumber) {
            const reward = 50;
            userData[message.author.id].balance += reward;
            message.channel.send(`Correct! The number was ${correctNumber}. You earned ${reward} coins!`);
        } else {
            message.channel.send(`Wrong! The correct number was ${correctNumber}. Better luck next time!`);
        }

        saveUserData();
    }
};
