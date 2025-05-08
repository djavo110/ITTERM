const { addAuthor, loginAuthor } = require("../controllers/author.controller");

const router = require("express").Router();

router.post("/", addAuthor);
router.post("/login", loginAuthor);

module.exports = router;