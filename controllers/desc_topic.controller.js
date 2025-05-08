const { sendErrorResponce } = require("../helpers/send_error_response");
const desc_topic = require("../schemas/desc_topic");
const { desc_topicValidation } = require("../validation/desc_topic.validation");

const create = async (req, res) => {
  try {
    const {error, value} = desc_topicValidation.validate(req.body);

    if(error) {
      sendErrorResponce(error, res);
    }
    const data = req.body;
    const newDesc_topic = await Desc.create(data);
    res.status(201).send({ message: "New desc_topic added", newDesc_topic });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const data = await desc_topic.find({});
    res.status(200).send({ data: data });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const findOne = async (req, res) => {
  let { id } = req.params;
  try {
    const data = await desc_topic.findById(id);
    res.status(200).send({ data: data });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    let updateDesc_topic= await Dict.findByIdAndUpdate(id, body);
    res.status(200).send({ data: updateDesc_topic });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const remove = async (req, res) => {
  let { id } = req.params;
  try {
    await desc_topic.findByIdAndDelete(id);
    res.status(200).send({ data: "Deleted Desc_topic" });
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
