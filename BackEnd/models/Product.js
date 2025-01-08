const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
  },
});

const UserCommentsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Comment: {
    type: String,
    required: true,
  },
});

const UserWishlistedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ProductSchema = new mongoose.Schema(
  {
    image1: { type: String },
    image2: { type: String },
    brand: { type: String },
    info: { type: String },
    price: { type: Number },
    oprice: { type: Number },
    color: { type: String },
    description: { type: String },
    category: { type: String },
    gender: { type: String },
    discount: { type: Number },
    wishlistedBy: { type: [UserWishlistedSchema] },
    userComments: { type: [UserCommentsSchema] },
    productQty: [{ size: String, quantity: Number }],
    ratings: { type: [RatingSchema] },
    topTag: { type: String },
    bottomTag: { type: String },
  },
  { timestamps: true }
);

// Define a text index on the relevant fields
ProductSchema.index({
  category: "text",
  brand: "text",
  info: "text",
  description: "text",
  color: "text",
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
