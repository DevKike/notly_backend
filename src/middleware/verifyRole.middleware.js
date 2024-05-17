const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const role = req.role;

      if (!allowedRoles.includes(role)) {
        return res.status(403).json({
          message: "Access denied: Insufficient role",
        });
      }

      next();
    } catch (error) {
      res.status(403).send({
        error: "Authorization denied",
      });
    }
  };
};

module.exports = verifyRole;
