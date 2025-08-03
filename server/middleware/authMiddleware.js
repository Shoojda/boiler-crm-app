console.log('[AUTH] Middleware triggered. Headers:', JSON.stringify(req.headers, null, 2));

// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log('[AUTH] No Authorization header');
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('[AUTH] Bearer token missing');
    return res.status(401).json({ error: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('[AUTH] Invalid token:', err.message);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    // Validate presence of user_id for all downstream handlers
    if (!user.id && !user.user_id) {
      console.log('[AUTH] Decoded token missing user id');
      return res.status(403).json({ error: 'Token missing user id' });
    }
    // Normalize for downstream
    req.user = {
      user_id: user.id || user.user_id,
      email: user.email,
      role: user.role,
      user_code: user.user_code
    };
    next();
  });
};

module.exports = authenticateToken;
