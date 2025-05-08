const sendErrorResponce = (error, res) => {
  console.log(error);
  res.status(400).send({ error: error });
};

module.exports = { sendErrorResponce };
