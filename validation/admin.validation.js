const Joi = require("joi");

const adminFullName = (parent) => {
  return parent.first_name + " " + parent.last_name;
};

exports.adminValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().default(adminFullName),
    email: Joi.string().email().lowercase(),
    phone: Joi.string(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    is_active: Joi.boolean().default(false),
    is_creator: Joi.boolean().default(false),
    created_date: Joi.date(),
    update_date: Joi.date()
  });
  return schema.validate(body, { abortEarly: false });

};
