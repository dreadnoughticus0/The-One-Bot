module.exports = {
    name: 'say',
    description: 'Make the bot say something, but with a blacklist of prohibited words.',
    execute(message, args) {
        // Check if the user provided any arguments
        if (!args.length) {
            return message.channel.send('You need to provide a message for me to say!');
        }

        // List of blacklisted words
        const blacklist = ["nig", "nazi", "jew", "fag", "neg",

"n1g", "naz1", "j3w", "f@g", "f a g",

"n i g", "n a z i", "j e w", "f a g",

"retard", "coon", "c00n", "c o o n", "damm", "d4mm", "h3ll", "d-a-m-m", "d a m m ",

"r e t a r d", "c-u-n-t", "cunt", "c u n t",

"n-i-g", "j-e-w", "f-a-g", "f-@-g", "fuc",

"shit", "s-h-i-t", "s h i t", "sh1t", "f u c",

"f-u-c", "f-uc", "fu-c", "á", "ä", "í", "ï",

"ü", "é", "ú", "ë", "a-s-s", "a-ss", "a s s", "as-s", "a$$",

"@ss", "ass", "as$", "a$s", "a-$$", "dild", "d i l d", "d-i-l-d", "d-i-ld", "d-ild", "dil-d",

"r@pe", "rap3", "rape", "r4pe", "r4p3", "r a p e", "r-a-p-e", "rap-e", "dick", "d1ck", "dicck",

"d-i-c-k", "di ck", "d i c k", "d-ick", "d-1ck", "d1c", "porn", "p0rn", "p o r n", "p-o-r-n",

"f.u.c.k", "n.i.g", "n_i_g", "mothafu", "motha fu", "nog", "ó", "ö", "ò", "one cup two", "one cup one",

"one guy one", "one guy two", "peg", "p3g", "p-3-g", "p3-g", "penis", "p3n1s", "p e n i s", "p.e.n.i.s",

"p.3.n.i.s", "p3.nis", "kys", "kill yourself", "kil yourself", "hope you die", "commit suicide",

"wh0r", "whor3", "whore", "w-h-o-r-e", "w h o r e", "wh-ore", "w-hor3", "w_h_o_r_e", "h03", "ho3", "hoe",

"h0e", "h o e", "h_o_e", "h.o.e", "h.o_e", "h_o.e", "slut", "s-l-u-t", "s l u t", "s_l_u_t", "s.l.u.t",

"slu t", "stfu", "tw4t", "twat", "t w a t", "t w 4 t", "t-w-a-t", "t-w-4-t", "twa t", "t.w.a.t", "t_w_a_t",

"t_w_4_t", "tw@t", "tw at", "x-rated", "xrated", "18+", "zoophile", "zoophilia", "5h1t", "anal", "4n4l", "boob",

"b00b", "b!tch", "b17ch", "gore", "gor3", "g0r3", "g0re", "c.0.c.k", "c0ck", "cock", "childp", "childfu", "cocaine",

"heroine", "cum", "c-u-m", "c u m", "deepthro", "d33pthr0", "d33pthro", "deepthr0", "ectasy", "molly",

"lsd", "mdma", "xanax", "x4nax", "xan4x", "x4n4x", "ketamine", "k3t4m", "k e t a m", "k3tam", "special k",

"acid", "magic shroom", "magic mushroom", "marijuana", "methamphetamine", "meth", "m3th", "smoke crank",

"fentanyl", "morphine", "steroids", "amytal", "suck my", "lick my", "gag my", "blow my", "f ag", "fa g", "n ig", "ni g",

"ì", "𝕒", "𝕓","𝕔","𝕕","𝕖","𝕗","𝕘","𝕙","𝕚","𝕛","𝕜","𝕝","𝕞","𝕟","𝕠","𝕡","𝕣","𝕤","𝕥","𝕦","𝕧","𝕨","𝕩","𝕪","𝕫",

"𝖋","𝖈","𝖎","𝖌","𝖊","𝖗","𝓯","𝓬","𝓲","𝓰","𝓭","𝓮","𝓻","𝓾","𝓽","🄶","🄵","🄲",

"ⓕ", "ⓒ", "ⓖ", "cancer", "kanker", "tering", "debiel", "mongool", "tyfus", "siktir",

"joder", "zorra", "pendejo", "arse", "idiot", "sukkel", "id1ot", "1diot", "1d1ot", "idi0t", "id10t", "flikker",

"ÿ", "ý", "vagina", "shi", "sh1", "5h", "uck", "4hit"]; // Add any words you want to blacklist

        // Join the arguments into a single message
        const userMessage = args.join(' ');

        // Check if the message contains any blacklisted words
        const containsBlacklistedWord = blacklist.some(word => userMessage.toLowerCase().includes(word.toLowerCase()));

        if (containsBlacklistedWord) {
            return message.channel.send('Sorry, your message contains prohibited words.');
        }

        // Send the message in the same channel if it's clean
        message.channel.send(userMessage);
    },
};