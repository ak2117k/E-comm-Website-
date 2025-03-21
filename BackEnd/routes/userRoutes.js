const express = require("express");
const {
  createNewUser,
  getUser,
  getUserDetails,
  updateUserDetails,
  deleteUser,
  chcekUserMail,
  updateWishlist,
  updateCart,
  handleAddToCart,
  handleRemoveItemFromCart,
  handleUpdateItemQuantity,
  handleUpdateItemSize,
  handleAddAddress,
  handleCreateBooking,
  handleUpdateAddress,
  handleDeleteAddress,
} = require("../controllers/userController");

const router = express.Router();

router.post("/emailCheck", chcekUserMail);
router.post("/signUp", createNewUser);
router.post("/login", getUser);
router.get("/profile/:userId", getUserDetails);
router.put("/profile/update", updateUserDetails);
router.put("/profile/update/wishlist", updateWishlist);
router.put("/profile/update/cart", updateCart);
router.delete("/delete/:Id", deleteUser);
router.put("/addToCart", handleAddToCart);
router.put("/removeFromCart", handleRemoveItemFromCart);
router.put("/updateQuantity", handleUpdateItemQuantity);
router.put("/updateSize", handleUpdateItemSize);
router.post("/addAddress", handleAddAddress);
router.post("/createBooking", handleCreateBooking);
router.put("/updateAddress", handleUpdateAddress);
router.delete("/deleteAddress", handleDeleteAddress);

module.exports = router;
