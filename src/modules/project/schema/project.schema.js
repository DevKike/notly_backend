const Joi = require('joi').extend(require('@joi/date'));

const title = Joi.string().min(3).max(50);
const description = Joi.string().min(3).max(50);
const startDate = Joi.date().format("YYYY-MM-DD").min("now");
const endDate = Joi.date().format("YYYY-MM-DD").greater(Joi.ref("startDate"));
const status = Joi.string().min(3).max(50);

const createSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  startDate: startDate.required(),
  endDate: endDate.required(),
  status: status.required(),
});

module.exports = createSchema;
