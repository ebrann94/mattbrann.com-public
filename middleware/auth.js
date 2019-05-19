const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    jwt.verify(token, 'jacqui', (err, decode) => {
        if (!err) {
            next();
        } else {
            res.status(401).send({ error: 'Please Authenticate' });
        }
    });
}

module.exports = auth;