const Joi = require("joi");

exports.userValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required().min(1),
    email: Joi.string().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    info: Joi.string().required(),
    photo: Joi.boolean().required(),
    create_date: Joi.date().required(),
    updated_date: Joi.date().required(),
    is_active: Joi.string().required(),
  });
  return schema.validate(body, { abortEarly: false });
};
