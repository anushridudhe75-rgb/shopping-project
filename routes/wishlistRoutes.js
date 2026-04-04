const express = require("express");
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product"); // ✅ ADD THIS

const router = express.Router();

router.post("/add", async (req, res) => {
  const item = new Wishlist(req.body);
  await item.save();
  res.send("Added to wishlist ❤️");
});

router.get("/:userId", async (req, res) => {
  try {
    const items = await Wishlist.find({ userId: req.params.userId });

    const result = [];

    for (let item of items) {
      const product = await Product.findById(item.productId);

      if (product) {
        result.push({
          _id: item._id,
          product
        });
      }
    }

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading wishlist");
  }
});

router.delete("/:id", async (req, res) => {
  await Wishlist.findByIdAndDelete(req.params.id);
  res.send("Removed ❤️");
});

module.exports = router;