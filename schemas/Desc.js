const {Schema, model} = require("mongoose");

const descSchema = new Schema ({
    desc: {type: String, required: true},
    category_id: {type: String, ref: "category"},
});

module.exports = model("Description", descSchema);