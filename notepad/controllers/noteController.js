e = require('../models/Note');

// Function to fetch all notes for a user
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.session.userId });
        res.render('dashboard', { notes });
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).send('Error fetching notes');
    }
};
exports.renderDashboard = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.session || !req.session.userId) {
            return res.status(401).send('Unauthorized');
        }

        // Fetch user's username from the database using the userId from the session
        const userId = req.session.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Fetch user's notes from the database
        const notes = await Note.find({ user: userId });

        // Render the dashboard view and pass the username and notes data
        res.render('dashboard', { username: user.username, notes });
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        res.status(500).send('Error rendering dashboard');
    }
};


// Function to render the edit note form
exports.renderEditNoteForm = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).send('Note not found');
        }
        res.render('editNote', { note });
    } catch (error) {
        console.error('Error rendering edit note form:', error);
        res.status(500).send('Error rendering edit note form');
    }
};

// Function to update an existing note
exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedNote) {
            return res.status(404).send('Note not found');
        }
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).send('Error updating note');
    }
};

// Function to render the add note form
exports.renderAddNoteForm = (req, res) => {
    res.render('addNote');
};

// Function to add a new note
exports.addNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.session.userId;

        // Create a new note instance with the provided data and set the createdAt field to the current date
        const newNote = new Note({
            title,
            content,
            user: userId,
            createdAt: new Date() // Set createdAt field to current date
        });

        // Save the new note to the database
        await newNote.save();

        res.redirect('/dashboard'); // Redirect to the dashboard after adding the note
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).send('Error adding note');
    }
};

// Function to delete an existing note
exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        await Note.findByIdAndDelete(id);
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).send('Error deleting note');
    }
};

// Controller function to toggle the pinned status of a note
exports.togglePinNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);

        // Toggle the pinned status of the note
        note.pinned = !note.pinned;
        await note.save();

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error toggling pin status:', error);
        res.status(500).send('Error toggling pin status');
    }
};
