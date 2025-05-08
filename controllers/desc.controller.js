const sendErrorResponce = require("../helpers/send_error_response");
const Desc = require("../schemas/Desc");
const { descValidation } = require("../validation/desc.validation");


const create = async (req, res) => {
  try {
    const {error, value} = descValidation.validate(req.body);

    if(error) {
      sendErrorResponce(error, res);
    }
    const data = req.body;
    const newDesc = await Desc.create(data);
    res.status(201).send({ message: "New desc added", newDesc });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Desc.find({});
    res.status(200).send({ data: data });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const findOne = async (req, res) => {
  let { id } = req.params;
  try {
    const data = await Desc.findById(id);
    res.status(200).send({ data: data });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    let updateDesc = await Desc.findByIdAndUpdate(id, body);
    res.status(200).send({ data: updateDesc });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const remove = async (req, res) => {
  let { id } = req.params;
  try {
    await Desc.findByIdAndDelete(id);
    res.status(200).send({ data: "Deleted Desc" });
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