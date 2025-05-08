const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
  topic_id: { type: String, required: true,},
  category_id: { type: String, uppercase: true },
});

module.exports = model("Tag", tagSchema);
