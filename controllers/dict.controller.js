const sendErrorResponce = require("../helpers/send_error_response");
const Dict = require("../schemas/Dict");
const Joi = require("joi");
const { dictValidation } = require("../validation/dict.validation");

const addDict = async (req, res) => {
  try {
    const {error, value} = dictValidation.validate(req.body);

    if(error) {
      sendErrorResponce(error, res);
    }
    const { term } = value;
    const newDict = await Dict.create({ term, letter: term[0] });
    res.status(201).send({ message: "New Term added", newDict });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Dict.find({});
    res.status(200).send({ data: data });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const findOne = async (req, res) => {
  let { id } = req.params;
  try {
    const data = await Dict.findById(id);
    res.status(200).send({ data: data });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    let updateDict = await Dict.findByIdAndUpdate(id, body);
    res.status(200).send({ data: updateDict });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const remove = async (req, res) => {
  let { id } = req.params;
  try {
    await Dict.findByIdAndDelete(id);
    res.status(200).send({ data: "Deleted Dict" });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

module.exports = {
  addDict,
  findAll,
  findOne, 
  update,
  remove,
};
