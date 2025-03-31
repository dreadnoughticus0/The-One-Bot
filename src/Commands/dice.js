module.exports = {
    name: 'dice',
    description: 'Roll a dice and see if you can guess the outcome!',
    execute(message, args, userData, { saveUserData }) {
        const user = message.author.id;
        const bet = parseInt(args[0]);
        const userGuess = parseInt(args[1]);

        if (isNaN(bet) || isNaN(userGuess) || bet <= 0 || userGuess < 1 || userGuess > 6) {
            return message.channel.send('Please bet a valid amount and guess a number between 1 and 6.');
        }

        if (userData[user].balance < bet) {
            return message.channel.send('You don’t have enough money to place that bet.');
        }

        const diceRoll = Math.floor(Math.random() * 6) + 1;

        if (userGuess === diceRoll) {
            const reward = bet * 2;
            userData[user].balance += reward;
            message.channel.send(`Congrats! You guessed ${userGuess} and the dice rolled ${diceRoll}. You won ${reward} coins!`);
        } else {
            userData[user].balance -= bet;
            message.channel.send(`Oops! The dice rolled ${diceRoll}. You lost ${bet} coins.`);
        }

        saveUserData();
    }
};
