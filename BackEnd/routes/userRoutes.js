const express = require("express");
const {
  createNewUser,
  getUser,
  getUserDetails,
  updateUserDetails,
  deleteUser,
  chcekUserMail,
} = require("../controllers/userController");

const router = express.Router();

router.post("/emailCheck", chcekUserMail);
router.post("/signUp", createNewUser);
router.post("/login", getUser);
router.get("/profile/:userId", getUserDetails);
router.put("/profile/update", updateUserDetails);
router.delete("/delete/:Id", deleteUser);

module.exports = router;
