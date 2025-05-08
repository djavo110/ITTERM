const { findAll, create, findOne, update, remove } = require("../controllers/tag.controller");


const router = require("express").Router();

router.get("/", findAll);
router.post("/", create);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/", remove);

module.exports = router;