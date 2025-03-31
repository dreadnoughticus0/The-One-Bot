const fs = require('fs');
const path = require('path');
const reviewsPath = path.join(__dirname, '../reviews.json');

// Load existing reviews
function loadReviews() {
    if (fs.existsSync(reviewsPath)) {
        return JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
    }
    return [];
}

// Save reviews to JSON file
function saveReviews(reviews) {
    fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 4));
}

module.exports = {
    name: 'review',
    description: 'Create reviews about the bot (add, edit, delete, view).',
    execute(message, args, client) { // Add `client` as a parameter
        const [action, rating, ...reviewTextArray] = args;
        const reviewText = reviewTextArray.join(' ');
        const userId = message.author.id;

        let reviews = loadReviews();

        if (action === 'add') {
            if (!rating || !reviewText) {
                return message.reply("Please provide a rating (1-5) and a comment. Example: `1review add 5 This bot is amazing!`");
            }

            // Check if review already exists
            const existingReview = reviews.find(r => r.userId === userId);
            if (existingReview) {
                return message.reply("You already have a review. Use `1review edit` to modify it.");
            }

            // Add the review
            const newReview = { userId, rating: parseInt(rating), comment: reviewText };
            reviews.push(newReview);
            saveReviews(reviews);
            return message.reply("Your review has been added!");

        } else if (action === 'edit') {
            const reviewIndex = reviews.findIndex(r => r.userId === userId);
            if (reviewIndex === -1) {
                return message.reply("You don't have a review to edit. Use `1review add` to add one.");
            }

            if (!rating || !reviewText) {
                return message.reply("Please provide a new rating and comment. Example: `1review edit 4 Great bot!`");
            }

            // Edit the review
            reviews[reviewIndex].rating = parseInt(rating);
            reviews[reviewIndex].comment = reviewText;
            saveReviews(reviews);
            return message.reply("Your review has been updated!");

        } else if (action === 'delete') {
            const reviewIndex = reviews.findIndex(r => r.userId === userId);
            if (reviewIndex === -1) {
                return message.reply("You don't have a review to delete.");
            }

            // Delete the review
            reviews.splice(reviewIndex, 1);
            saveReviews(reviews);
            return message.reply("Your review has been deleted.");

        } else if (action === 'view') {
            if (reviews.length === 0) {
                return message.reply("There are no reviews yet.");
            }

            const reviewList = reviews.map((r, index) => {
                const username = client.users.cache.get(r.userId)?.username || 'Unknown User';
                return `**Review #${index + 1}**\n- **User:** ${username}\n- **Rating:** ${r.rating}\n- **Comment:** ${r.comment}`;
            }).join("\n\n");

            return message.channel.send(reviewList);

        } else {
            return message.reply("Invalid command. Use `1review add`, `1review edit`, `1review delete`, or `1review view`.");
        }
    },
};
