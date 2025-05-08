const Joi = require("joi");

exports.desc_topicValidation = (body) => {
  const schema = Joi.object({
    topic_id: Joi.string(),
    desc_id: Joi.string()
      .min(2)
      .message("IT Term 1 ta harfdan kam bolmasligi kerak")
      .required()
      .messages({
        "string.empty": "Lug'at bo'sh bo'lishi mumkin emas",
        "any.required": "Lug'at albatt akiritilishi kerak",
      }),
  });
  return schema.validate(body);
};
