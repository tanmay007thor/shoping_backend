const ProductRouter = require("express").Router();
const {
  createCategory,
  updateCategory,
  getAllProducts,
  getAllCatogaryProducts,
  getCategoryById,
} = require("../Controller/ProductController");
ProductRouter.post("", createCategory);
ProductRouter.patch("/:id", updateCategory);
ProductRouter.get("/", getAllProducts);
ProductRouter.get("/catogary", getAllCatogaryProducts);
ProductRouter.get("/:id", getCategoryById);

module.exports = ProductRouter;
