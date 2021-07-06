const Category = require("../models/categoryModel");
const slugify = require("slugify");
const SubCategory = require("../models/subCategoryModel");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({
      name,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.status(201).json(category);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Create category failed. Error: " + e.message });
  }
};

exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};

exports.list = async (req, res) =>
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Delete category failed. Error: " + e.message });
  }
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name).toLowerCase() },
      { new: true }
    );
    res.json(updated);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Update category failed. Error: " + e.message });
  }
};

exports.getSubCategories = (req, res) => {
  SubCategory.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.error(err);
    res.json(subs);
  });
};
