const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const removeCartItem = async (req, res) => {
  try {
    const { userId, productId, size } = req.body;
    console.log("Productid from frontend", productId);
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart Not Found" });
    }
    const itemIndex = cart.items.findIndex((item) => {
      console.log(
        item.productId.toString(),
        item.productId.toString() === productId &&
          item.size.toLowerCase() === size.toLowerCase()
      );
      return (
        item.productId.toString() === productId &&
        item.size.toLowerCase() === size.toLowerCase()
      );
    });

    if (itemIndex === -1) {
      return res.status(404).json({ message: "product not found" });
    }
    cart.items.splice(itemIndex, 1);
    const result = await cart.save();
    return res
      .status(200)
      .json({ message: "Cart Updated successfully", result });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateCartItemSize = async (req, res) => {
  try {
    const { userId, productId, newSize, size } = req.body;
    console.log(userId, productId, newSize, size);

    // Find the user's cart
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // const productObjectId = mongoose.Types.ObjectId(productId);

    // Find the index of the product with the given productId and size
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId && // Ensure proper ObjectId comparison
        item.size.toLowerCase() === size.toLowerCase() // Case-insensitive size comparison
    );
    console.log(itemIndex);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update the size of the item
    cart.items[itemIndex].size = newSize;

    // Save the updated cart
    const result = await cart.save();
    return res
      .status(200)
      .json({ message: "Item size updated successfully", result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = [];
    await cart.save();
    return res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  removeCartItem,
  clearCart,
  updateCartItemSize,
};
