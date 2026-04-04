const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: String,
  productId: String
});

module.exports = mongoose.model("Wishlist", wishlistSchema);