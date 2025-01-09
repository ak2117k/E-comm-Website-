const express = require("express");
const {
  createCart,
  getCartProduct,
  removeCartItem,
  addOrUpdateCartItem,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/createCart", createCart);
router.get("/getItems/:userId", getCartProduct);
router.put("/removeItem", removeCartItem);
router.put("/addUpdate", addOrUpdateCartItem);
router.get("/clear", clearCart);

module.exports = router;
