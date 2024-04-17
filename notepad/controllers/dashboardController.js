
const User = require('../models/User');
const Note = require('../models/Note');

exports.renderDashboard = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById(userId);
        const username = user.username;

        // Fetch user's notes from the database
        const notes = await Note.find({ user: userId });
           // Log the format of note.createdAt
           notes.forEach(note => {
            console.log(typeof note.createdAt, note.createdAt);
        });
        // Sort the notes array with pinned notes appearing first
        const sortedNotes = notes.sort((a, b) => {
            // Pinned notes come first, so return -1 if 'a' is pinned and 'b' is not,
            // 1 if 'b' is pinned and 'a' is not, and 0 if both are either pinned or not pinned
            if (a.pinned && !b.pinned) {
                return -1;
            } else if (!a.pinned && b.pinned) {
                return 1;
            } else {
                return 0;
            }
        });

        // Render the dashboard view and pass the username and sorted notes data
        res.render('dashboard', { username, notes: sortedNotes });
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        res.status(500).send('Error rendering dashboard');
    }
};
