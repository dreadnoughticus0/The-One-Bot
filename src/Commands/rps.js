module.exports = {
    name: 'rps',
    description: 'Play Rock-Paper-Scissors!',
    execute(message, args, userData, { saveUserData }) {
        const userChoice = args[0]?.toLowerCase();
        const choices = ['rock', 'paper', 'scissors'];
        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        if (!choices.includes(userChoice)) {
            return message.channel.send('Please choose rock, paper, or scissors.');
        }

        let result;
        if (userChoice === botChoice) {
            result = "It's a tie!";
        } else if (
            (userChoice === 'rock' && botChoice === 'scissors') ||
            (userChoice === 'paper' && botChoice === 'rock') ||
            (userChoice === 'scissors' && botChoice === 'paper')
        ) {
            result = `You win! ${userChoice} beats ${botChoice}. You earned 20 coins!`;
            userData[message.author.id].balance += 20;
        } else {
            result = `You lose! ${botChoice} beats ${userChoice}.`;
        }

        saveUserData();
        message.channel.send(result);
    }
};
