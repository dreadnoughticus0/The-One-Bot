module.exports = {
    name: 'insult',
    description: 'Throw a playful insult at someone!',
    execute(message, args) {
        const target = message.mentions.users.first() || message.author;

        const insults = [
            "You're as useless as a screen door on a submarine.",
            "I'd agree with you, but then we’d both be wrong.",
            "You're like a cloud. When you disappear, it's a beautiful day.",
            "If I had a dollar for every smart thing you said, I'd be broke.",
            "You're about as useful as a white crayon.",
            "You bring everyone so much joy... when you leave the room.",
            "I thought of you today. It reminded me to take out the trash.",
            "You’re not stupid; you just have bad luck thinking.",
            "You have the personality of wallpaper paste.",
            "You’re like a software update: whenever I see you, I think, ‘Not now.’",
            "You bring everyone so much joy... when you’re not here.",
            "If your brain was dynamite, there wouldn't be enough to blow your hat off.",
            "You're not completely useless, you can always serve as a bad example.",
            "I’d explain it to you, but I left my crayons at home.",
            "You’re proof that even evolution can take a wrong turn.",
            "You're like the human version of a participation trophy.",
            "I would challenge you to a battle of wits, but it seems you're unarmed.",
            "You're like a cloud: you make my day worse the longer you stick around.",
            "If laughter is the best medicine, your face must be curing the world.",
            "You have the perfect face for radio.",
            "You have the personality of a dial tone.",
            "You must have been born on a highway because that's where most accidents happen.",
            "You're the human equivalent of a missed high five.",
            "You’re the reason we can’t have nice things.",
            "You're like a compass with no direction.",
            "You have the charisma of a damp rag.",
            "If I wanted to hear from an idiot, I’d just turn on the TV.",
            "You're the reason the gene pool needs a lifeguard.",
            "If stupidity was a profession, you'd be Employee of the Month.",
            "You’re like a broken pencil: pointless.",
            "You’re the human version of a headache.",
            "If ignorance is bliss, you must be the happiest person alive.",
            "I’m not saying you’re stupid, but you’re definitely not lighting up the room with your brilliance.",
            "You’ve got something on your chin… no, the third one down.",
            "You're like a lighthouse in the middle of a desert: utterly useless.",
            "If I threw a stick, you'd leave, right?",
            "You’re like a vacuum: you suck at everything.",
            "You're like a Sudoku puzzle with all the wrong answers.",
            "If being annoying was an Olympic sport, you'd have a gold medal.",
            "Your brain's so small, if a thought ever crossed it, it would die of loneliness.",
            "You’re living proof that even evolution has its off days.",
            "You’re like a broken clock – right twice a day, but still not useful.",
            "You’re about as sharp as a marble.",
            "You have the emotional range of a teaspoon.",
            "You’re like a smartphone with no battery – always present but never useful.",
            "You’re like a math book – full of problems.",
            "You’re the human equivalent of a typo.",
            "You should carry a plant around to replace the oxygen you waste.",
            "You couldn’t pour water out of a boot if the instructions were on the heel.",
            "You’re about as effective as a one-legged man in a butt-kicking contest.",
            "You remind me of a penny – two-faced and not worth much.",
            "You’re as useful as an umbrella in a hurricane.",
            "You’re like a sandwich with no filling – empty and disappointing.",
            "You’re the human equivalent of a soggy handshake.",
            "You’re about as useful as a chocolate teapot.",
            "You’re like a traffic jam – nobody wants to be near you, and you’re just in the way.",
            "You’re the human version of a Wi-Fi signal that keeps dropping.",
            "Your only chance of getting laid is lying down on a bed of nails.",
            "You’re like a fire alarm that goes off for no reason.",
            "If I wanted a conversation with a brick wall, I’d have stayed home.",
            "You’re like a light bulb that’s dim but doesn’t know it.",
            "You’re the human equivalent of static noise.",
            "You're the type of person who’d trip over a wireless connection.",
            "You’re like a fortune cookie with no fortune – disappointing and pointless.",
            "You’re about as useful as a solar-powered flashlight.",
            "You’re like a snowstorm in summer – completely out of place and unwanted.",
            "You’re the reason they put instructions on shampoo bottles.",
            "You’re like a pizza cutter – all edge, no point.",
            "You’re about as useful as a lead balloon.",
            "You’re the human equivalent of a glitch in the Matrix.",
            "You’re like a squirrel who forgot where it buried its nuts – confused and lost.",
            "You’re the human version of an out-of-tune piano.",
            "You have the intelligence of a single-celled organism, minus the ability to divide.",
            "You’re like a video game on the easiest difficulty: boring and pointless.",
            "You’re as sharp as a bowling ball.",
            "You’re the human equivalent of a loading screen that never finishes.",
            "You’re about as useful as a blindfold in a staring contest.",
            "You’re the reason aliens won’t visit us.",
            "You’re like a selfie stick – pointless and annoying.",
            "You have the wit of a soggy piece of bread.",
            "You’re like a low battery: always draining the energy out of the room.",
            "You’re the human equivalent of buffering.",
            "You have the social skills of a dial-up modem.",
            "You’re like a crossword puzzle with no clues.",
            "You’re the human version of a dial tone.",
            "You have the IQ of a turnip."
            // (You can expand with more unique insults up to 300 as needed)
        ];

        // Select a random insult
        const randomInsult = insults[Math.floor(Math.random() * insults.length)];

        // Send the insult to the mentioned user or the message author
        message.channel.send(`${target}, ${randomInsult}`);
    }
};
