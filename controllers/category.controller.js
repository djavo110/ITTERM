const sendErrorResponce = require("../helpers/send_error_response");
const category = require("../schemas/Category");
const { categoryValidation } = require("../validation/category.validation");

const addCat = async (req, res) => {
  try {
    const { error, value } = categoryValidation.validate(req.body);

    if (error) {
      sendErrorResponce(error, res);
    }

    const { name } = req.body;
    const newCat = await category.create({ name });
    res.status(201).send({ message: "New category added", newCat });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const findAll = async (req, res) => {
    try {
        const data = await category.find({});   
        res.status(200).send({ data: data });
    } catch (error) {
        sendErrorResponce(error, res);
        
    }
};

const findOne = async (req, res) => {
    let { id } = req.params;
    try {
        const data = await category.findById(id);
        res.status(200).send({ data: data});
    } catch (error) {
        let { id } = req.params;
        
    }
};

const update = async (req, res) => {
    const {id} = req.params;
    const body = req.body;

    try {
        let updateCat = await category.findByIdAndUpdate(id, body);
        res.status(200).send({data: updateCat});
    } catch (error) {
        sendErrorResponce(error, res);
    }
};

const remove = async (req, res) => {
    let {id} = req.params;
    try {
        await category.findByIdAndDelete(id);
        res.status(200).send({data: "Deleted Cat"});
    } catch (error) {
        sendErrorResponce(error, res);
    }
};

module.exports = {
    addCat, 
    findAll, 
    findOne,
    update,
    remove,
};

