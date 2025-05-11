const {
  create,
  getAll,
  getOne,
  remove,
  update,
  login,
  getAdmins,
  getAdminById,
} = require("../controllers/admin.controller.js");
const adminJwtGuard = require("../middlewares/guards/admin-jwt.guard.js");

const router = require("express").Router();

router.post("/", create);
router.get("/", getAll);
router.post("/login", login);
router.get("/:id", getOne);
router.delete("/:id", remove);
router.patch("/:id", update);
router.get("/", adminJwtGuard, getAdmins);
router.get("/:id", adminJwtGuard, getAdminById);

module.exports = router;
