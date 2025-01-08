const {
  createProduct,
  getProductDetails,
  getsingleProductDetails,
  updateProductDetails,
  deleteProduct,
  getProductsaggregate,
} = require("../controllers/productController");

const express = require("express");

const router = express.Router();

router.get("/getProducts", getProductDetails);
router.get("/getProducts/:productId", getsingleProductDetails);
router.put("/updateProduct", updateProductDetails);
router.get("/getProductsaggregate", getProductsaggregate);
module.exports = router;
