const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// test route
app.get("/test", (req, res) => {
  res.send("Server working");
});

// ✅ FIX (ADD THIS LAST)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
