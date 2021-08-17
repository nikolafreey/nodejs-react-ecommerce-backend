const SubCategory = require("../models/subCategoryModel");
const Product = require("../models/productModel");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const subCategory = await new SubCategory({
      name,
      parent,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.status(201).json(subCategory);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Create subcategory failed. Error: " + e.message });
  }
};

exports.read = async (req, res) => {
  let subCategory = await SubCategory.findOne({ slug: req.params.slug }).exec();
  let products = await Product.find({ subCategory })
    .populate("category")
    .exec();
  res.json({ subCategory, products });
};

exports.list = async (req, res) =>
  res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec());

exports.remove = async (req, res) => {
  try {
    const deleted = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Delete subcategory failed. Error: " + e.message });
  }
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name).toLowerCase() },
      { new: true }
    );
    res.json(updated);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Update subcategory failed. Error: " + e.message });
  }
};
