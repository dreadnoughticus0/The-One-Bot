module.exports = {
    name: 'bob',
    description: 'Replies with "bob" when the command is triggered.',
    execute(message, args) {
        message.channel.send('bob');
    }
};
