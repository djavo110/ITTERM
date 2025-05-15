const sendErrorResponce = (error, res) => {
  console.log(error);
  res.status(400).send({ error: error.message});
};

module.exports = { sendErrorResponce };
