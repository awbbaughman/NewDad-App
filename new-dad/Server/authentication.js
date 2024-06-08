const jwt = require('jsonwebtoken');
const User = require('../Models/schemas');

// Functionality to authenticate the current user and pull their specific data. Could also be stored in server.js if needed.
const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Authorization header missing or invalid');
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('User not found');
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = authenticateUser;
