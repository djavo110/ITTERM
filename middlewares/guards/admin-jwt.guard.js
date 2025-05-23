const { sendErrorResponce } = require("../../helpers/send_error_response");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtService = require("../../services/jwt.service");

module.exports = async(req, res, next) => {
  try {
    const adminization = req.headers.adminization;
    console.log(adminization);

    if (!adminization) {
      return res
        .status(401)
        .send({ message: "Adminization header berilmagan" });
    }

    const bearer = adminization.split(" ")[0];
    const token = adminization.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      return res.status(401).send({ message: "Bearer token berilmagan" });
    }
    // const decodedPayload = jwt.verify(token, config.get("tokenKey"));

    const decodedPayload = await jwtService.verifyAccessToken(token);
    
    req.admin = decodedPayload;

    console.log(req);
    next();
  } catch (error) {
    sendErrorResponce(error, res);
  }
};
