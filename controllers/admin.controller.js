const { sendErrorResponce } = require("../helpers/send_error_response");
const Admin = require("../schemas/Admin");
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");
const config = require("config");

const create = async (req, res) => {
  try {
    const data = req.body;

    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const newAdmin = await Admin.create({
      ...data,
      password: hashedPassword,
    });
    res.status(201).send({ message: "New Admin added", newAdmin });
  } catch (error) {
    return sendErrorResponce(error, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }
    const validPassword = bcrypt.compareSync(password, admin.password);

    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    // const token = jwt.sign(payload, config.get("tokenKeyt"), {
    //   expiresIn: config.get("tokenExpTime"),
    // });

    const tokens = jwtService.generateTokens(payload);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();

    res.cookie("refreshToken", jwtService.generateTokens(payload), {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    res
      .status(201)
      .send({
        message: "Tizimga xush kelibsiz",
        id: admin.id,
        accessToken: tokens.accessToken,
      });
  } catch (error) {
    return sendErrorResponce(error, res);
  }
};

const getAll = async (req, res) => {
  let { limit, offset } = req.query;
  try {
    limit = limit ? limit : 10;
    offset = offset ? offset : 1;

    const data = await Admin.find({})
      .limit(limit)
      .skip((offset - 1) * limit);

    res.status(200).send({ data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);

    res.status(200).send({ admin });
  } catch (error) {
    sendErrorResponce(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Admin.findByIdAndDelete(id);

    res.status(200).send({ message: "Admin deleted", deletedItem });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedItem = await Admin.findByIdAndUpdate(id, req.body);

    res.status(200).send({ message: "Admin updated", updatedItem });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.send({ admins });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findById(id);
    res.send({ admin });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    console.log(req.cookies);
    console.log(req.headers.cookie);

    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }
    const admin = await Admin.findOneAndUpdate(
      { refresh_token: refreshToken },
      {
        refresh_token: "",
      },
      { new: true }
    );
    if (!admin) {
      return res.status(400).send({ message: "Token noto'g'ri" });
    }
    res.clearCookie("refreshToken");
    res.send({ admin });
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
  getAdmins,
  getAdminById,
  logoutAdmin,
};
