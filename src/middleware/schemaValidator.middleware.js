const schemaValidator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.error(error);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      next();
    }
  };
};

module.exports = schemaValidator;
