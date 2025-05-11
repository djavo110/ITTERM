const { sendErrorResponce } = require("../../helpers/send_error_response");

module.exports = (req, res, next) => {
  try {
    if (req.params.id != req.author.id) {
      return res.status(403).send({
        message: `Ruxsat etilmagan foydalanuvchi. Siz expert emassiz!`,
      });
    }
    next();
  } catch (error) {
    sendErrorResponce(error, res);
  }
};
