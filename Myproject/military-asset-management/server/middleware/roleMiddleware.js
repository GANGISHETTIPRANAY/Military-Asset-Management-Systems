// server/middleware/roleMiddleware.js

function checkRole(allowedRoles) {
  return (req, res, next) => {
    const user = req.user; // assuming user is already added by auth middleware

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }

    next();
  };
}

module.exports = checkRole;
