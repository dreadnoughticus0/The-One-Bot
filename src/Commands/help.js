module.exports = {
    name: 'help',
    description: 'List all available commands or get info about a specific command.',
    execute(message, args) {
        const { commands } = message.client;

        if (!args.length) {
            // Display a list of all commands
            const commandList = commands.map(command => `\`${command.name}\`: ${command.description}`).join('\n');
            const messages = splitMessage(`Here are all the available commands:\n${commandList}`);

            // Send each message part
            messages.forEach(part => {
                message.channel.send(part);
            });
        } else {
            // Display info about a specific command
            const name = args[0].toLowerCase();
            const command = commands.get(name);

            if (!command) {
                return message.reply('That\'s not a valid command!');
            }

            return message.channel.send(`\`${command.name}\`: ${command.description}`);
        }
    },
};

// Utility function to split a message into chunks
function splitMessage(content, maxLength = 2000) {
    const lines = content.split('\n');
    const parts = [];
    let currentPart = '';

    for (const line of lines) {
        if (currentPart.length + line.length + 1 > maxLength) {
            parts.push(currentPart);
            currentPart = '';
        }
        currentPart += `${line}\n`;
    }

    if (currentPart) {
        parts.push(currentPart);
    }

    return parts;
}