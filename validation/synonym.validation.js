const Joi = require("joi");

exports.synonymValidation = (body) => {
  const schema = Joi.object({
    dict_id: Joi.string(),
    desc_id: Joi.string()
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
