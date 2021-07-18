const Product = require("../models/productModel");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (e) {
    res.status(400).send("Create product failed with Error: " + e.message);
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(+req.params.count)
    .populate("category")
    .populate("subCategory")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Product delete failed");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subCategory")
    .exec();
  return res.json(product);
};

exports.update = async (req, res) => {
  try {
    //updating slug along with the updated title
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true } //This is required for MongoDB to return newly updated Product in the response instead of the old Product with values before the update
    ).exec();
    res.json(updated);
  } catch (e) {
    console.log(e);
    toast.error("Error updating product: " + e.message);
    return res.status(400).send("Product update failed");
  }
};
