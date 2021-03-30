const jwt = require('jwt-simple');
const secret = require('../secret');

module.exports = {
    register: api => {
        api.use(function(req, res, next) {
            req.jwtEncodedToken = req.headers['x-jwt'];

            if (!req.jwtEncodedToken) {
                console.log('[AUTHENTICATION] No JWT token found')
                return next();
            }

            console.log('[AUTHENTICATION] JWT encoded token: ' + req.jwtEncodedToken)

            try {
                req.jwtDecodedToken = jwt.decode(req.jwtEncodedToken, secret);
                console.log('[AUTHENTICATION] JWT decoded token: ' + JSON.stringify(req.jwtDecodedToken));
            } catch(err) {
                console.error('[AUTHENTICATION] ' + err.toString());
            }

            return next();
        })
    }
};
