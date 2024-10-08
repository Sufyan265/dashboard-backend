const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/authConfig');

exports.registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        if (!name || !email || !password || !confirmPassword ) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }
        
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: jwtExpire });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: jwtExpire });
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server Error' });
    }
};