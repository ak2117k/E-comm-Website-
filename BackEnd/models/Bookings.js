const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total_price: { type: Number, required: true },
  size: { type: String, required: true },
});

const bookingSchema = new mongoose.Schema({
  products: [productSchema], // Array of products with required details

  shippingAddress: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  bookingAddress: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  payment_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payments",
    required: true,
  },
  shipping_info: {
    shipping_date: { type: Date, default: Date.now, required: true },
    shipping_Cost: {
      type: String,
      required: true,
    },
  },
  OrderSummary: {
    Total: {
      type: String,
      required: true,
    },
  },
  OrderStatus: {
    type: String,
    enum: ["Confirmed", "Shipped", "In-transit", "Delivered"],
    default: "Confirmed",
  },
});

const userBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookings: [bookingSchema], // Array of booking entries
});

const Bookings = mongoose.model("Bookings", userBookingSchema);
module.exports = Bookings;
