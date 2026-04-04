const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product"); // ✅ ADD THIS

const router = express.Router();

router.post("/add", async (req, res) => {
  const item = new Cart(req.body);
  await item.save();
  res.send("Added to cart ✅");
});

router.get("/:userId", async (req, res) => {
  const cartItems = await Cart.find({ userId: req.params.userId });

  const result = [];

  for (let item of cartItems) {
    const product = await Product.findById(item.productId);

    if (product) {
      result.push({
        _id: item._id,
        quantity: item.quantity,
        product
      });
    }
  }

  res.json(result);
});

router.delete("/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.send("Deleted from cart ✅");
});

router.put("/:id", async (req, res) => {
  await Cart.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated cart ✅");
});

module.exports = router;