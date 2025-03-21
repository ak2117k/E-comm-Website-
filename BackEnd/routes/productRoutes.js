const {
  createProduct,
  getProductDetails,
  getsingleProductDetails,
  updateProductDetails,
  deleteProduct,
  getProductsaggregate,
  getsingleProductById,
} = require("../controllers/productController");

const express = require("express");

const router = express.Router();

router.get("/getProducts", getProductDetails);
router.get("/p/:info", getsingleProductDetails);
router.put("/updateProduct", updateProductDetails);
router.get("/getProductsaggregate", getProductsaggregate);
router.get("/getProducts/:productId", getsingleProductById);
module.exports = router;
