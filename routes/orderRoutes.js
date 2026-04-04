const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

router.post("/place", async (req, res) => {
  const { userId, address, paymentMethod } = req.body;

  const cartItems = await Cart.find({ userId });

  let products = [];
  let total = 0;

  for (let item of cartItems) {
    const product = await Product.findById(item.productId);

    products.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity
    });

    total += product.price * item.quantity;
  }

  const order = new Order({
    userId,
    products,
    total,
    address,
    paymentMethod,
    status: "Placed"
  });

  await order.save();

  // clear cart
  await Cart.deleteMany({ userId });

  res.send("Order placed successfully 🎉");
});

module.exports = router;