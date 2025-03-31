module.exports = {
    name: 'coinflip',
    description: 'Flip a coin! Guess heads or tails to win.',
    execute(message, args, userData, { saveUserData }) {
        const user = message.author.id;
        const bet = parseInt(args[0]);
        const guess = args[1]?.toLowerCase();

        if (isNaN(bet) || (guess !== 'heads' && guess !== 'tails')) {
            return message.channel.send('Please enter a valid bet and guess either "heads" or "tails".');
        }

        if (userData[user].balance < bet) {
            return message.channel.send('You don’t have enough money to place that bet.');
        }

        const outcome = Math.random() < 0.5 ? 'heads' : 'tails';

        if (guess === outcome) {
            const reward = bet * 2;
            userData[user].balance += reward;
            message.channel.send(`Congrats! It was ${outcome}, and you won ${reward} coins!`);
        } else {
            userData[user].balance -= bet;
            message.channel.send(`Sorry! It was ${outcome}. You lost ${bet} coins.`);
        }

        saveUserData();
    }
};
