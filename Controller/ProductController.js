const { Categories } = require("../Model/ProductModal");

const createCategory = async (req, res) => {
  try {
    const { name, creator } = req.body;
    const products = req.body.products;
    if (!name || !creator) {
      return res
        .status(400)
        .send({ error: "Name and Creator are required fields." });
    }

    const createdCategory = await Categories.create({
      name: name,
      creator: creator,
      products: products,
    });

    res
      .status(201)
      .send({ Message: "Created Catogary Successfully !", createdCategory });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error occurred while creating the category." });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, creator, products } = req.body;
    const id = req.params.id; // Access the id from the params
    const updates = {};
    if (name) updates.name = name;
    if (creator) updates.creator = creator;
    if (products) updates.products = products;

    const updatedCategory = await Categories.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return res.status(404).send({ error: "Category not found." });
    }

    res.send({ Message: "Updated Catogary Successfully !", updatedCategory });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error occurred while updating the category." });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const categories = await Categories.find();
    const products = [];
    categories.forEach((category) => {
      products.push(...category.products);
    });
    res.status(200).send({ products });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error occurred while retrieving the products." });
  }
};

const getAllCatogaryProducts = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).send({ categories });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error occurred while retrieving the categories." });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Categories.findById(categoryId);
    if (!category) {
      return res.status(404).send({ error: "Category not found." });
    }
    res.status(200).send({ category });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error occurred while retrieving the category." });
  }
};


module.exports = {
  createCategory,
  updateCategory,
  getAllProducts,
  getAllCatogaryProducts,
  getCategoryById
};
