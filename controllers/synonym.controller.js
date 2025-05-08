const sendErrorResponce = require("../helpers/send_error_response");
const synonym = require("../schemas/synonym");
const { synonymValidation } = require("../validation/synonym.validation");



const create = async (req, res) => {
  try {
    const {error, value} = synonymValidation.validate(req.body);

    if(error) {
      sendErrorResponce(error, res);
    }
    const data = req.body;
    const newSynonym = await synonym.create(data);
    res.status(201).send({ message: "New synonym added", newSynonym });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Synonym.find({});
    res.status(200).send({ data: data });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const findOne = async (req, res) => {
  let { id } = req.params;
  try {
    const data = await Synonym.findById(id);
    res.status(200).send({ data: data });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    let updateSynonym = await Synonym.findByIdAndUpdate(id, body);
    res.status(200).send({ data: updateSynonym });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const remove = async (req, res) => {
  let { id } = req.params;
  try {
    await Synonym.findByIdAndDelete(id);
    res.status(200).send({ data: "Deleted Synonym" });
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
