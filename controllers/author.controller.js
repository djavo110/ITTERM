const { sendErrorResponce } = require("../helpers/send_error_response");
const Author = require("../schemas/Author");
const jwtService = require("../services/jwt.service");
const { authorValidation } = require("../validation/author.validation");
const bcrypt = require("bcrypt");
const config = require("config");

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
    const validPassword = bcrypt.compareSync(password, author.password);

    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
      is_expert: author.is_expert,
    };

    // const token = jwt.sign(payload, config.get("tokenKey"), {
    //   expiresIn: config.get("tokenExpTime"),
    // });

    const tokens = jwtService.generateTokens(payload);
    author.refresh_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    res.status(201).send({
      message: "Tizimga xush kelibsiz",
      id: author.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    return sendErrorResponce(error, res);
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.send({ authors });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const getAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await Author.findById(id);
    res.send({ author });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const logoutAuthor = async (req, res) => {
  try {
    console.log(req.cookies);
    console.log(req.headers.cookie);

    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }
    const author = await Author.findOneAndUpdate(
      { refresh_token: refreshToken },
      {
        refresh_token: "",
      },
      { new: true }
    );
    if (!author) {
      return res.status(400).send({ message: "Token noto'g'ri" });
    }       
    res.clearCookie("refreshToken");
    res.send({ author });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

module.exports = {
  addAuthor,
  loginAuthor,
  getAllAuthors,
  getAuthorById,
  logoutAuthor,
};
