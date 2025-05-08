const Joi = require("joi");

exports.descValidation = (body) => {
  const schema = Joi.object({
    desc: Joi.string()
      .min(4)
      .message("IT Term 1 ta harfdan kam bolmasligi kerak")
      .required()
      .messages({
        "string.empty": "Lug'at bo'sh bo'lishi mumkin emas",
        "any.required": "Lug'at albatt akiritilishi kerak",
      }),
  });
  return schema.validate(body);
};
