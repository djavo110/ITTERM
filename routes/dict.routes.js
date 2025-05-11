const { addDict, findAll, update, remove, findOne } = require("../controllers/dict.controller");
const authorExpertGuard = require("../middlewares/guards/author-expert.guard");
const authorJwtGuard = require("../middlewares/guards/author-jwt.guard");

const router = require("express").Router();

router.post("/", authorJwtGuard, authorExpertGuard, addDict);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/", remove);

module.exports = router;
