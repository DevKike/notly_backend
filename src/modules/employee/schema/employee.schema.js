const Joi = require("joi");

const customMessages = {
  "string.email": "The email doesn't comply with the expected format!",
};

const name = Joi.string().min(3).max(50);
const last_name = Joi.string().min(3).max(50);
const email = Joi.string().min(6).max(30).email().message(customMessages);
const phoneNumber = Joi.string().min(9).max(15);
const password = Joi.string().min(6).max(16);
const active = Joi.boolean();
const role = Joi.string().min(3).max(16);

const registerSchema = Joi.object({
  name: name.required(),
  last_name: last_name.required(),
  email: email.required(),
  phoneNumber,
  password: password.required(),
  active,
  role: role.required(),
});

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const updateSchema = Joi.object({
  employeeId: Joi.string().allow(""),
  employeeData: Joi.object({
    name,
    last_name,
    email,
    phoneNumber,
    password,
    active,
    role,
  }).or('name', 'last_name', 'email', 'phoneNumber', 'password', 'active', 'role'),
});

module.exports = { registerSchema, loginSchema, updateSchema };
