const { Schema, model} = require("mongoose");

const desc_topicSchema = new Schema ({
    desc_id: {type: String, required: true},
    topic_id: {type: String, required: true},
});

module.exports = model("Desc_topic", desc_topicSchema);