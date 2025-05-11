const { sendErrorResponce } = require("../../helpers/send_error_response");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  try {
    const userization = req.headers.userization;
    console.log(userization);

    if (!userization) {
      return res
        .status(401)
        .send({ message: "Userization header berilmagan" });
    }

    const bearer = userization.split(" ")[0];
    const token = userization.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      return res.status(401).send({ message: "Bearer token berilmagan" });
    }
    const decodedPayload = jwt.verify(token, config.get("tokenKey"));
    
    req.user = decodedPayload;

    console.log(req);
    next();
  } catch (error) {
    sendErrorResponce(error, res);
  }
};
