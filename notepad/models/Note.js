// const mongoose = require('mongoose');

// const noteSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     pinned: {
//         type: Boolean,
//         default: false // Default value for pinned is false
//     }
// });

// const Note = mongoose.model('Note', noteSchema);

// module.exports = Note;
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pinned: {
        type: Boolean,
        default: false // Default value for pinned is false
    },
    createdAt: {
        type: Date,
        default: Date.now // Default value for createdAt is the current date and time
    }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
