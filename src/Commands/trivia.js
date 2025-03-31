const triviaQuestions = [
    // Add 50 trivia questions here
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
    { question: "What is the chemical symbol for gold?", answer: "Au" },
    { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
    { question: "What is the smallest prime number?", answer: "2" },
    { question: "Which ocean is the largest?", answer: "Pacific" },
    { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
    { question: "What is the currency of Japan?", answer: "Yen" },
    { question: "What is the boiling point of water in Celsius?", answer: "100" },
    { question: "What is the hardest natural substance on Earth?", answer: "Diamond" },
    { question: "Which planet is known as the Red Planet?", answer: "Mars" },
    { question: "Who invented the telephone?", answer: "Alexander Graham Bell" },
    { question: "What is the longest river in the world?", answer: "Nile" },
    { question: "What is the main ingredient in guacamole?", answer: "Avocado" },
    { question: "What gas do plants absorb from the atmosphere?", answer: "Carbon dioxide" },
    { question: "In which year did the Titanic sink?", answer: "1912" },
    { question: "What is the largest mammal in the world?", answer: "Blue whale" },
    { question: "What is the main language spoken in Brazil?", answer: "Portuguese" },
    { question: "What is the capital of Italy?", answer: "Rome" },
    { question: "What is the name of the fairy in Peter Pan?", answer: "Tinker Bell" },
    { question: "Who was the first president of the United States?", answer: "George Washington" },
    { question: "What is the chemical formula for table salt?", answer: "NaCl" },
    { question: "Which country is known as the Land of the Rising Sun?", answer: "Japan" },
    { question: "What is the tallest mountain in the world?", answer: "Mount Everest" },
    { question: "What year did World War II begin?", answer: "1939" },
    { question: "Who wrote 'The Odyssey'?", answer: "Homer" },
    { question: "What is the capital of Australia?", answer: "Canberra" },
    { question: "What is the fastest land animal?", answer: "Cheetah" },
    { question: "What is the most widely spoken language in the world?", answer: "Mandarin" },
    { question: "What is the smallest country in the world?", answer: "Vatican City" },
    { question: "In which continent is Egypt located?", answer: "Africa" },
    { question: "What is the main ingredient in bread?", answer: "Flour" },
    { question: "Which planet is closest to the sun?", answer: "Mercury" },
    { question: "What is the capital of Canada?", answer: "Ottawa" },
    { question: "What is the hardest mineral?", answer: "Diamond" },
    { question: "What is the largest desert in the world?", answer: "Sahara" },
    { question: "What is the capital of Spain?", answer: "Madrid" },
    { question: "What element does 'O' represent on the periodic table?", answer: "Oxygen" },
    { question: "Which country is famous for the Eiffel Tower?", answer: "France" },
    { question: "What is the main organ of the circulatory system?", answer: "Heart" },
    { question: "What is the capital city of China?", answer: "Beijing" },
    { question: "Who discovered penicillin?", answer: "Alexander Fleming" },
    { question: "What is the freezing point of water?", answer: "0" },
    { question: "In which galaxy is Earth located?", answer: "Milky Way" },
    { question: "What type of animal is the largest living creature on Earth?", answer: "Whale" },
    { question: "What is the most widely used computer operating system?", answer: "Windows" },
    { question: "What is the main gas found in the air we breathe?", answer: "Nitrogen" },
    { question: "Who is known as the Father of Computers?", answer: "Charles Babbage" },
    { question: "What is the capital of Germany?", answer: "Berlin" },
    { question: "What is the largest ocean on Earth?", answer: "Pacific Ocean" },
    { question: "What is the square root of 64?", answer: "8" },
    { question: "Who painted the Last Supper?", answer: "Leonardo da Vinci" },
    { question: "What is the main ingredient of a smoothie?", answer: "Fruit" },
    { question: "What is the capital of Russia?", answer: "Moscow" },
    { question: "Which planet has the most moons?", answer: "Jupiter" },
    { question: "What does DNA stand for?", answer: "Deoxyribonucleic Acid" },
    { question: "Who wrote the Harry Potter series?", answer: "J.K. Rowling" },
    { question: "What is the largest land animal?", answer: "Elephant" },
    { question: "What is the main language spoken in Canada?", answer: "English and French" },
    { question: "What is the largest country by area?", answer: "Russia" },
    { question: "What is the capital of India?", answer: "New Delhi" },
    { question: "What year did the first man land on the moon?", answer: "1969" },
    { question: "What is the most spoken language in the USA?", answer: "English" },
    { question: "Which planet is known for its rings?", answer: "Saturn" },
    { question: "What is the chemical symbol for silver?", answer: "Ag" },
    { question: "What is the capital of Greece?", answer: "Athens" },
    { question: "What is the most populous country in the world?", answer: "China" },
    { question: "Which animal is known as the King of the Jungle?", answer: "Lion" },
    { question: "What is the largest island in the world?", answer: "Greenland" },
    { question: "Who invented the light bulb?", answer: "Thomas Edison" },
    { question: "What is the capital of Norway?", answer: "Oslo" },
    { question: "What is the main ingredient of sushi?", answer: "Rice" },
    { question: "Who is the author of '1984'?", answer: "George Orwell" },
    { question: "What is the largest volcano in the world?", answer: "Mauna Loa" },
    { question: "What is the most common blood type?", answer: "O" },
    { question: "Which planet is known for its Great Red Spot?", answer: "Jupiter" },
    { question: "What is the capital of Sweden?", answer: "Stockholm" },
    { question: "What is the chemical formula for water?", answer: "H2O" },
    { question: "What is the primary ingredient in hummus?", answer: "Chickpeas" },
];

module.exports = {
    name: 'trivia',
    description: 'Answer trivia questions to earn points!',
    execute(message, args, userData, { ensureUser, saveUserData, hasCooldown, setCooldown }) {
        const user = message.author.id;

        // Ensure the user exists in the userData
        ensureUser(user);

        // Cooldown logic
        const commandName = 'trivia';
        const cooldownTime = 60 * 1000; // 1 minute in milliseconds

        if (hasCooldown(user, commandName)) {
            return message.channel.send('You need to wait before playing trivia again!');
        }

        // Set cooldown for the user
        setCooldown(user, commandName, cooldownTime);

        // Randomly select a trivia question
        const questionIndex = Math.floor(Math.random() * triviaQuestions.length);
        const selectedQuestion = triviaQuestions[questionIndex];

        // Ask the trivia question
        message.channel.send(`${selectedQuestion.question} (Type your answer)`);

        const filter = response => {
            return response.author.id === user; // Only accept responses from the user who asked
        };

        const collector = message.channel.createMessageCollector({ filter, time: 30000 }); // Collect responses for 30 seconds

        collector.on('collect', response => {
            if (response.content.toLowerCase() === selectedQuestion.answer.toLowerCase()) {
                message.channel.send(`Correct! You earn 50 points.`);
                userData[user].points += 50; // Award points for correct answer
                saveUserData();
                collector.stop();
            } else {
                message.channel.send(`Incorrect! Try again.`);
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                message.channel.send(`Time's up! The correct answer was: ${selectedQuestion.answer}`);
            }
        });
    }
};