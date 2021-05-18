const jwt = require('jsonwebtoken');
function auth(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send({ message: 'Must provide an authorization header' });
        return;
    }
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, "123456", async (err, decoded) => {
        if (err) {
            res.status(401).send({ message: 'Invalid token' });
            return;
        }
        req.id = decoded.id; // { id: ... }
        next();
    });
}
exports.auth = auth;