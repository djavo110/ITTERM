const { Schema, model} = require("mongoose");

const synonymSchema = new Schema ({
    desc_id: {type: String, required: true},
    dict_id: {type: String, required: true},
});

module.exports = model("Synonym", synonymSchema);