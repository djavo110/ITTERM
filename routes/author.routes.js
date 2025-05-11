const { addAuthor, loginAuthor, getAllAuthors, getAuthorById } = require("../controllers/author.controller");
const authorJwtGuard = require("../middlewares/guards/author-jwt.guard");
const authorSelfGuard = require("../middlewares/guards/author-self.guard");

const router = require("express").Router();

router.post("/", addAuthor);
router.post("/login", loginAuthor);
router.get("/", authorJwtGuard, getAllAuthors);
router.get("/:id", authorJwtGuard, authorSelfGuard, getAuthorById);
// router.put("/:id", authorJwtGuard, updateAuthorById);
// router.delete("/:id", authorJwtGuard, deleteAuthorById);

module.exports = router;