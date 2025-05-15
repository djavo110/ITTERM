const { getAdminById } = require("../controllers/admin.controller.js");
const {
  create,
  getAll,
  getOne,
  remove,
  update,
  login,
  getUsers,
  logoutUser,
} = require("../controllers/user.controller.js");
const userJwtGuard = require("../middlewares/guards/user-jwt.guard.js");

const router = require("express").Router();

router.post("/", create);
router.get("/", getAll);
router.post("/login", login);
router.get("/logout", logoutUser);
router.get("/:id", getOne);
router.delete("/:id", remove);
router.patch("/:id", update);
router.get("/", userJwtGuard, getUsers);
router.get("/:id", userJwtGuard, getAdminById);

module.exports = router;
