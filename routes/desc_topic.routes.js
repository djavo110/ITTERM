const { create, findAll, findOne, update, remove } = require("../controllers/desc_topic.controller");


const router = require("express").Router();

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/", remove);

module.exports = router;