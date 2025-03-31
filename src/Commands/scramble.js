module.exports = {
    name: 'scramble',
    description: 'Unscramble the word and win coins!',
    execute(message, args, userData, { saveUserData }) {
        const words = ['apple', 'banana', 'chocolate', 'discord', 'javascript', 'bot'];
        const wordToScramble = words[Math.floor(Math.random() * words.length)];
        const scrambled = wordToScramble.split('').sort(() => Math.random() - 0.5).join('');

        message.channel.send(`Unscramble this word: **${scrambled}**`);

        const filter = response => response.author.id === message.author.id;
        message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] })
            .then(collected => {
                if (collected.first().content.toLowerCase() === wordToScramble) {
                    const reward = 50;
                    userData[message.author.id].balance += reward;
                    message.channel.send(`Correct! The word was **${wordToScramble}**. You won ${reward} coins!`);
                } else {
                    message.channel.send(`Wrong! The correct word was **${wordToScramble}**.`);
                }
                saveUserData();
            })
            .catch(() => {
                message.channel.send('You took too long to respond.');
            });
    }
};
