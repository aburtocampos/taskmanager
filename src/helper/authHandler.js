const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization'); // Leer el encabezado Authorization
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Agregar los datos del usuario al request
        next();
    } catch (err) {
        console.error("JWT Error:", err);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;