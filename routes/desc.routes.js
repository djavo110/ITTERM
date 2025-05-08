const { findAll, update, remove, create, findOne } = require("../controllers/desc.controller");


const router = require("express").Router();

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/", remove);

module.exports = router;
