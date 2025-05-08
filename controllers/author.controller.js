const { sendErrorResponce } = require("../helpers/send_error_response");
const Author = require("../schemas/Author");
const { authorValidation } = require("../validation/author.validation");
const bcrypt = require("bcrypt");

const addAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);

    if (error) {
      return sendErrorResponce(error, res);
    }
    const heshedPassword = bcrypt.hashSync(value.password, 7);

    const newAuthor = await Author.create({
      ...value,
      password: heshedPassword,
    });

    res.status(201).send({ message: "New Author added", newAuthor });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const author = await Author.findOne({ email });
    if (!author) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }
    const validPassword = bcrypt.compareSync(password, author.passwarod);
    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }
    res.status(201).send({ message: "Tizimga xush kelibsiz", id: author.id });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

module.exports = {
  addAuthor,
  loginAuthor
};
