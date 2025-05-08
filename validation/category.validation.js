const Joi = require("joi");

exports.categoryValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .message("IT Term 1 ta harfdan kam bolmasligi kerak")
      .required()
      .messages({
        "string.empty": "Lug'at bo'sh bo'lishi mumkin emas",
        "any.required": "Lug'at albatt akiritilishi kerak",
      }),
  });
  return schema.validate(body);
};
