require('dotenv').config();

const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET;

const genToken = user => {
    const payload = {
        id: user.id,
        email: user.email,
    };
    const options = {
        expiresIn: '48h',
    };
    return jwt.sign(payload, jwtKey, options);
};

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    errMessage: `Invalid Token, log in again.`,
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            errMessage:
                'No token provided, must be set on the Authorization Header',
        });
    }
};

module.exports = {
    genToken,
    authenticate,
};
