const { sendErrorResponce } = require("../helpers/send_error_response");
const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const config = require("config");
const jwtService = require("../services/jwt.service");

const create = async (req, res) => {
  try {
    const data = req.body;

    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const newUser = await User.create({
      ...data,
      password: hashedPassword,
    });
    res.status(201).send({ message: "New User added", newUser });
  } catch (error) {
    return sendErrorResponce(error, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      is_active: admin.is_active,
    };

    // const token = jwt.sign(payload, config.get("tokenKeyt"), {
    //   expiresIn: config.get("tokenExpTime"),
    // });

    const tokens = jwtService.generateTokens(payload);
    user.refresh_token = tokens.refreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken),
      {
        httpOnly: true,
        maxAge: config.get("cookie_refresh_time"),
      };

    res
      .status(201)
      .send({
        message: "Tizimga xush kelibsiz",
        id: user.id,
        accessToken: tokens.accessToken,
      });
  } catch (error) {
    return sendErrorResponce(error, res);
  }
};

const getAll = async (req, res) => {
  // let { limit, offset } = req.query;
  try {
    // limit = limit ? limit : 10;
    // offset = offset ? offset : 1;

    // const data = await User.find({})
    //   .limit(limit)
    //   .skip((offset - 1) * limit);

    const users = await User.find();
    res.send({ users });

    // res.status(200).send({ data });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).send({ user });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await User.findByIdAndDelete(id);

    res.status(200).send({ message: "User deleted", deletedItem });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedItem = await User.findByIdAndUpdate(id, req.body);

    res.status(200).send({ message: "User updated", updatedItem });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send({ users });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.send({ user });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const logoutUser = async (req, res) => {
  try {
    console.log(req.cookies);
    console.log(req.headers.cookie);

    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }
    const user = await User.findOneAndUpdate(
      { refresh_token: refreshToken },
      {
        refresh_token: "",
      },
      { new: true }
    );
    if (!user) {
      return res.status(400).send({ message: "Token noto'g'ri" });
    }
    res.clearCookie("refreshToken");
    res.send({ user });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  remove,
  update,
  login,
  getUsers,
  getUserById,
  logoutUser
};
