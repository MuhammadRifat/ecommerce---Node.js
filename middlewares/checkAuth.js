const jwt = require('jsonwebtoken');

const checkUserAuth = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.usersJwtToken);
        const { id, role } = decoded;
        req.id = id;
        req.role = role;
        next();
    } catch (err) {
        next("Authentication Failed!");
    }
}

module.exports = checkUserAuth;