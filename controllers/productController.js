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

exports.read = async (req, res) => {
  let products = await Product.find({}).exec();
  res.json(products);
};
