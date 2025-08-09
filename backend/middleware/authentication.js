const jwt = require('jsonwebtoken');
const User = require('../Modals/user');

const auth = async (req, res, next) => {
    try {
        let token = req.cookies.token; // first try cookies

        // If no cookie token, check Authorization header
        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }

        const decode = jwt.verify(token, 'sahil');
        req.user = await User.findById(decode.userId).select('-password');
        
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }

        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = auth;
