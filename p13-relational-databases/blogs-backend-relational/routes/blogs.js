const router = require("express").Router();

const { Blog, User } = require("../models");
const { Op } = require("sequelize");
const middleware = require("../util/middleware");

router.get("/", async (req, res) => {
  const where = {};
  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${req.query.search}%` } },
      { author: { [Op.iLike]: `%${req.query.search}%` } },
    ];
  }
  console.log(where);
  const notes = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order: [["likes", "DESC"]],
  });
  res.json(notes);
});
router.post(
  "/",
  middleware.tokenExtractor,
  middleware.tokenChecker,
  async (req, res) => {
    console.log(req.body);
    if ((req.body.year && req.body.year > 2023) || req.body.year < 1991) {
      return res
        .status(400)
        .json({ error: "year must be within [1991, 2023]" });
    }
    const blog = await Blog.create({ ...req.body, userId: req.token.id });
    return res.json(blog);
  },
);

router.put("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  blog.likes = req.body.likes;
  await blog.save();
  return res.json(blog);
});
router.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.tokenChecker,
  async (req, res) => {
    const blog = await Blog.findByPk(req.params.id);
    if (blog.userId === req.token.id) {
      await blog.destroy();
      res.status(200).end();
    } else {
      res
        .status(403)
        .json({ error: "User is not authorized to delete this blog" });
    }
  },
);

module.exports = router;
