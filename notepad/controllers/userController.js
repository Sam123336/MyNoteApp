const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if the username or email is already in use
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send('Username or email already exists');
        }
        
        const user = new User({ username, email, password });
        await user.save();
        res.redirect('/user/login');
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).send('Error signing up user');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }
        req.session.userId = user._id;
        res.redirect('/dashboard'); // Redirect to the dashboard upon successful login
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user');
    }
};


exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/');
    });
};