const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
});

const userSchema = mongoose.Schema(
  {
    profile: {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      passwordHash: {
        type: String,
        required: true,
      },
      DOB: {
        type: String,
      },
      gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
      },
      subscribedToWhatsApp: {
        type: Boolean,
        default: false,
      },
      contactNumber: {
        type: Number,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },

    myOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookings",
      },
    ],
    myAddresses: [addressSchema],
    myWallet: [
      {
        balance: {
          type: Number,
          default: 0,
        },
        transactions: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transactions",
          },
        ],
      },
    ],
    myPayments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payments",
      },
    ],
    myWishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
