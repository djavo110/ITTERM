const { addCat, findAll, findOne, update, remove } = require("../controllers/category.controller");


const router = require("express").Router();

router.post("/", addCat);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/", remove);

module.exports = router;
