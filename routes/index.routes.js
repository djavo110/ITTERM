const dictRouter = require("./dict.routes");
const authorRouter = require("./author.routes");
const descRouter = require("./desc.routes");
const router = require("express").Router();

router.use("/dict", dictRouter);
router.use("/author", authorRouter);
router.use("/desc", descRouter);
module.exports = router;