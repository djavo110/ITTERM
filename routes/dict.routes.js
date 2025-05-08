const { addDict, findAll, update, remove, findOne } = require("../controllers/dict.controller");

const router = require("express").Router();

router.post("/", addDict);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/", remove);

module.exports = router;
