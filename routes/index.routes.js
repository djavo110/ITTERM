const dictRouter = require("./dict.routes");
const authorRouter = require("./author.routes");
const adminRouter = require("./admin.routes");
const descRouter = require("./desc.routes");
const userRouter = require("./user.routes");
const router = require("express").Router();

router.use("/dict", dictRouter);
router.use("/author", authorRouter);
router.use("/admin", adminRouter);
router.use("/desc", descRouter);
router.use("/user", userRouter);
module.exports = router;