const Joi = require("joi");
const { registerSchema } = require("../../employee/schema/employee.schema");

const customMessages = {
  "string.email": "The email doesn't comply with the expected format!",
};

const name = Joi.string().min(3).max(50);
const nit = Joi.string().min(9).max(9);
const phoneNumber = Joi.string().min(6).max(16);
const email = Joi.string().min(6).max(30).email().message(customMessages);

const companySchema = Joi.object({
  name: name.required(),
  nit: nit.required(),
  phoneNumber: phoneNumber.required(),
  email: email.required(),
});

const registerCompanyAndDirectorSchema = Joi.object({
  companyData: companySchema.required(),
  directorData: registerSchema.required(),
});

module.exports = registerCompanyAndDirectorSchema;
