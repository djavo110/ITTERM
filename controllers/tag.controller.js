const sendErrorResponce = require("../helpers/send_error_response");
const Tag = require("../schemas/Tag");
const { tagValidation } = require("../validation/tag.validation");


const create = async (req, res) => {
  try {
    const { error, value } = tagValidation.validate(req.body);

    if (error) {
      sendErrorResponce(error, res);
    }

    const { name } = req.body;
    const newTag = await Tag.create({ name });
    res.status(201).send({ message: "New tag added", newTag });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const findAll = async (req, res) => {
    try {
        const data = await Tag.find({});   
        res.status(200).send({ data: data });
    } catch (error) {
        sendErrorResponce(error, res);
        
    }
};

const findOne = async (req, res) => {
    let { id } = req.params;
    try {
        const data = await Tag.findById(id);
        res.status(200).send({ data: data});
    } catch (error) {
        let { id } = req.params;
        
    }
};

const update = async (req, res) => {
    const {id} = req.params;
    const body = req.body;

    try {
        let updateTag = await Tag.findByIdAndUpdate(id, body);
        res.status(200).send({data: updateTag});
    } catch (error) {
        sendErrorResponce(error, res);
    }
};

const remove = async (req, res) => {
    let {id} = req.params;
    try {
        await Tag.findByIdAndDelete(id);
        res.status(200).send({data: "Deleted Tag"});
    } catch (error) {
        sendErrorResponce(error, res);
    }
};

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove
};

