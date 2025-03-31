const games = new Map(); // Store ongoing games

module.exports = {
    name: 'tictactoe',
    description: 'Play a game of Tic-Tac-Toe against the bot or another player.',
    async execute(message, args) {
        const player1 = message.author;
        const player2 = message.mentions.users.first() || message.client.user; // Defaults to the bot if no other player is mentioned

        // Initialize game
        const board = [
            ['1️⃣', '2️⃣', '3️⃣'],
            ['4️⃣', '5️⃣', '6️⃣'],
            ['7️⃣', '8️⃣', '9️⃣']
        ];

        const gameState = {
            board,
            players: [player1, player2],
            currentTurn: player1,
            symbols: { [player1.id]: '❌', [player2.id]: '⭕' },
        };

        games.set(message.channel.id, gameState);

        // Display the board
        await displayBoard(message.channel, board);

        // Start game loop
        playTurn(message.channel, gameState);
    }
};

async function displayBoard(channel, board) {
    let display = board.map(row => row.join(' | ')).join('\n');
    await channel.send(`\n${display}`);
}

async function playTurn(channel, gameState) {
    const { board, currentTurn, players } = gameState;

    // Check if it's the bot's turn
    if (currentTurn.bot) {
        // Bot makes its move using Minimax
        const bestMove = findBestMove(board, gameState.symbols[currentTurn.id]);
        board[bestMove.row][bestMove.col] = gameState.symbols[currentTurn.id];

        // Display updated board and check for game outcome
        await displayBoard(channel, board);
        if (handleGameEnd(channel, board, gameState, currentTurn)) return;

        // Switch turn to the other player
        gameState.currentTurn = players.find(p => p.id !== currentTurn.id);
        playTurn(channel, gameState);
    } else {
        // Player's turn
        await channel.send(`${currentTurn}, it's your turn! Type the number of the cell where you want to place your marker.`);
        
        const filter = m => m.author.id === currentTurn.id && /^[1-9]$/.test(m.content);
        const collected = await channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
            .catch(() => {
                channel.send(`${currentTurn} took too long to make a move. Game over!`);
                games.delete(channel.id);
            });

        if (!collected) return;

        const move = parseInt(collected.first().content) - 1;
        const row = Math.floor(move / 3);
        const col = move % 3;

        if (board[row][col] === '❌' || board[row][col] === '⭕') {
            channel.send('That cell is already occupied. Try a different one!');
            return playTurn(channel, gameState);
        }

        board[row][col] = gameState.symbols[currentTurn.id];
        await displayBoard(channel, board);

        if (handleGameEnd(channel, board, gameState, currentTurn)) return;

        gameState.currentTurn = players.find(p => p.id !== currentTurn.id);
        playTurn(channel, gameState);
    }
}

function handleGameEnd(channel, board, gameState, currentTurn) {
    if (checkWinner(board, gameState.symbols[currentTurn.id])) {
        channel.send(`${currentTurn} wins the game! 🎉`);
        games.delete(channel.id);
        return true;
    }

    if (board.flat().every(cell => cell === '❌' || cell === '⭕')) {
        channel.send("It's a draw!");
        games.delete(channel.id);
        return true;
    }

    return false;
}

function checkWinner(board, symbol) {
    const winningPatterns = [
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]],
    ];

    return winningPatterns.some(pattern => pattern.every(cell => cell === symbol));
}

function findBestMove(board, botSymbol) {
    let bestScore = -Infinity;
    let move;

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] !== '❌' && board[row][col] !== '⭕') {
                const original = board[row][col];
                board[row][col] = botSymbol;
                const score = minimax(board, 0, false, botSymbol);
                board[row][col] = original;

                if (score > bestScore) {
                    bestScore = score;
                    move = { row, col };
                }
            }
        }
    }

    return move;
}

function minimax(board, depth, isMaximizing, botSymbol) {
    const playerSymbol = botSymbol === '❌' ? '⭕' : '❌';
    if (checkWinner(board, botSymbol)) return 10 - depth;
    if (checkWinner(board, playerSymbol)) return depth - 10;
    if (board.flat().every(cell => cell === '❌' || cell === '⭕')) return 0;

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] !== '❌' && board[row][col] !== '⭕') {
                    const original = board[row][col];
                    board[row][col] = botSymbol;
                    const eval = minimax(board, depth + 1, false, botSymbol);
                    board[row][col] = original;
                    maxEval = Math.max(maxEval, eval);
                }
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] !== '❌' && board[row][col] !== '⭕') {
                    const original = board[row][col];
                    board[row][col] = playerSymbol;
                    const eval = minimax(board, depth + 1, true, botSymbol);
                    board[row][col] = original;
                    minEval = Math.min(minEval, eval);
                }
            }
        }
        return minEval;
    }
}