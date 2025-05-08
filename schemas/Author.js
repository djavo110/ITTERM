const { Schema, model } = require("mongoose");

const authorSchema = new Schema ({
    first_name: { type: String, trim: true},
    last_name: {type: String, trim: true},
    nick_name: {type: String, trim: true, unique: true, required: true},
    email: {type: String, trim: true, unique: true},
    passwarod: {type: String},
    info: {type: String},
    position: {type: String},
    photo: {type: String},
    is_expert: {type: Boolean},
    is_active: {type: Boolean},
},
{
    versionKey: false,
    timestamps: false,
}
);

module.exports = model("Author", authorSchema);