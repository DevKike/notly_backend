const Joi = require("joi").extend(require("@joi/date"));

const title = Joi.string().min(3).max(50);
const description = Joi.string().min(3).max(50);
const points = Joi.number().integer().min(1).max(5);
const priority = Joi.number().integer().min(1).max(5);
const startDate = Joi.date().format("YYYY-MM-DD").min("now");
const endDate = Joi.date().format("YYYY-MM-DD").greater(Joi.ref("startDate"));
const status = Joi.string().min(3).max(50);

const createTaskSchema = Joi.object({
  projectId: Joi.number().integer().min(1).required(),
  projectData: Joi.object({
    title: title.required(),
    description: description.required(),
    points: points.required(),
    priority: priority.required(),
    startDate: startDate.required(),
    endDate: endDate.required(),
    status: status.required(),
  }),
});

module.exports = createTaskSchema;
