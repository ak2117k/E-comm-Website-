const Cart = require("../models/Cart");
const Product = require("../models/Product");

const createCart = async (req, res) => {
  try {
    const { userId } = req.query;
    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      cart = new Cart({ userId: userId, items: [] });
    }
    const result = await cart.save();
    if (!result) {
      return res.status(400).json({ message: "Bad Data Request" });
    }
    return res
      .status(200)
      .json({ message: "Item successfully added to cart", cart: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCartProduct = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId"); // Populate product details
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res
      .status(200)
      .json({ message: "Cart found", cartItems: cart.items });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { userId, productId, size } = req.body;
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart Not Found" });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );
    console.log(itemIndex);
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

const addOrUpdateCartItem = async (req, res) => {
  try {
    const { userId, productId, size, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (itemIndex === -1) {
      cart.items.push({ productId, size, quantity });
    } else if (quantity) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items[itemIndex].quantity += 1;
    }

    const result = await cart.save();
    return res
      .status(200)
      .json({ message: "Cart item updated successfully", cart: result });
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
  createCart,
  getCartProduct,
  removeCartItem,
  addOrUpdateCartItem,
  clearCart,
};
