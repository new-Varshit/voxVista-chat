const jwt = require('jsonwebtoken');
const secretKey = 'varshittyagi@062003';
function authenticateToken(req, res, next) {
    const token = req.cookies.jwt;

    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.redirect('/login');
        }
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken: authenticateToken
}