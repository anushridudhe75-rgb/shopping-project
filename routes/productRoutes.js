const express = require("express");
const Product = require("../models/Product");

const router = express.Router();


// 🔍 GET PRODUCTS + SEARCH
router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";

    const products = await Product.find({
      name: { $regex: search, $options: "i" }
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// ➕ ADD PRODUCT (IMPORTANT)
router.post("/add", async (req, res) => {
  try {
    const { name, price, size, image, rating } = req.body;

    const newProduct = new Product({
      name,
      price,
      size,
      image,
      rating
    });

    await newProduct.save();

    res.send("Product Added Successfully ✅");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding product ❌");
  }
});


module.exports = router;