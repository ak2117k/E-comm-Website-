const axios = require("axios");
const Product = require("../models/Product");
const {
  calculateProductQty,
  addTopTag,
  addBottomTag,
} = require("../utils/productHelpers"); // Import helper functions

// Function to fetch and insert products in bulk
const fetchAndInsertProducts = async (req, res) => {
  const existingCount = await Product.countDocuments();
  if (existingCount > 0) {
    console.log("Products already exist. Skipping insert.");
    return;
  }
  try {
    // Fetch data from external API
    console.log("fetching data...");
    const response = await axios.get(
      "https://koovs-api-data.onrender.com/mens"
    );
    const products = response.data;

    // Prepare the product data for insertion
    const productsToInsert = products.map((element) => {
      // Ensure the data matches the Product schema
      const newProduct = new Product({
        image1: element?.image1,
        image2: element?.image2,
        brand: element?.brand,
        info: element?.info,
        price: isNaN(element?.price) ? 0 : Number(element?.price),
        oprice: isNaN(element?.oprice) ? 0 : Number(element?.oprice),
        color: element?.color,
        description: element?.description,
        category: element?.category,
        gender: element?.gender,
        discount: isNaN(
          ((Number(element?.price) - Number(element?.oprice)) /
            Number(element?.price)) *
            100
        )
          ? 0
          : Math.floor(
              ((Number(element?.price) - Number(element?.oprice)) /
                Number(element?.price)) *
                100
            ), // Calculate discount
        wishlistedBy: [], // Empty array for wishlisted users
        userComments: [], // Empty array for user comments
        productQty: calculateProductQty(element?.category), // Call helper function to calculate qty
        topTag: addTopTag(), // Call helper function for top tag
        bottomTag: addBottomTag(), // Call helper function for bottom tag
      });

      return newProduct;
    });

    console.log("saving data...");
    // Bulk insert products using insertMany
    await Product.insertMany(productsToInsert);

    console.log(`${productsToInsert.length} products inserted successfully`);
    // Send a response after successful insertion
    return res.status(201).json({
      message: `${productsToInsert.length} products inserted successfully`,
    });
  } catch (error) {
    console.error("Error fetching or saving data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get product details or fetch products if not found
const getProductDetails = async (req, res) => {
  try {
    let {
      gender,
      category,
      sizes,
      brand,
      color,
      discount,
      sort,
      page,
      limit,
      search,
    } = req.query;

    // Parse and validate query parameters
    const parseQuery = (param) =>
      param ? param.split("_").map((p) => p.trim()) : [];
    const gen = parseQuery(gender);
    const categories = parseQuery(category);
    const colors = parseQuery(color);
    const allsizes = parseQuery(sizes);
    const brands = parseQuery(brand);
    const discounts = parseQuery(discount);

    const sortingType = sort === "High" ? -1 : 1;
    page = isNaN(Number(page)) ? 1 : Number(page);
    limit = isNaN(Number(limit)) ? 50 : Number(limit);
    console.log(page, limit);
    const skip = (page - 1) * limit;
    console.log("skiping value", skip);

    const pipeline = [
      ...(search
        ? [
            {
              $search: {
                index: "default", // Name of your search index
                text: {
                  query: search,
                  path: ["category", "brand", "info", "description"], // Fields to search
                  fuzzy: {
                    maxEdits: 2, // Allow up to 2 character differences
                    prefixLength: 1, // Match the first character exactly
                  },
                },
              },
            },
          ]
        : []),
      ...(gen.length > 0 ? [{ $match: { gender: { $in: gen } } }] : []),
      ...(categories.length > 0
        ? [{ $match: { category: { $in: categories } } }]
        : []),
      ...(colors.length > 0 ? [{ $match: { color: { $in: colors } } }] : []),
      ...(allsizes.length > 0 ? [{ $match: { size: { $in: allsizes } } }] : []),
      ...(brands.length > 0 ? [{ $match: { brand: { $in: brands } } }] : []),
      ...(discounts.length > 0
        ? [{ $match: { discount: { $in: discounts.map(Number) } } }]
        : []),

      {
        $facet: {
          totalProducts: [{ $count: "total" }],
          paginatedProducts: [
            // { $sort: { price: sortingType } },
            { $skip: skip },
            { $limit: limit },
          ],
          differentCategories: [
            { $group: { _id: null, categories: { $addToSet: "$category" } } },
            { $project: { _id: 0, categories: 1 } },
          ],
          differentColors: [
            { $group: { _id: null, colors: { $addToSet: "$color" } } },
            { $project: { _id: 0, colors: 1 } },
          ],
          differentSizes: [
            { $unwind: "$productQty" },
            { $group: { _id: null, sizes: { $addToSet: "$productQty.size" } } },
            { $project: { _id: 0, sizes: 1 } },
          ],
          differentBrands: [
            { $group: { _id: null, brands: { $addToSet: "$brand" } } },
            { $project: { _id: 0, brands: 1 } },
          ],
          differentDiscounts: [
            { $group: { _id: null, discounts: { $addToSet: "$discount" } } },
            { $project: { _id: 0, discounts: 1 } },
          ],
          differentGenders: [
            { $group: { _id: null, genders: { $addToSet: "$gender" } } },
            { $project: { _id: 0, genders: 1 } },
          ],
        },
      },
    ];

    let result = await Product.aggregate(pipeline).allowDiskUse(true);
    const totalProducts = result[0]?.totalProducts?.[0]?.total || 0;

    if (result[0]?.paginatedProducts?.length > 0) {
      console.log(result[0]?.paginatedProducts.length);
      return res.status(200).json({
        message: "Products fetched successfully",
        total: totalProducts,
        products: result[0]?.paginatedProducts || [],
        differentCategories:
          result[0]?.differentCategories?.[0]?.categories || [],
        differentColors: result[0]?.differentColors?.[0]?.colors || [],
        differentSizes: result[0]?.differentSizes?.[0]?.sizes || [],
        differentBrands: result[0]?.differentBrands?.[0]?.brands || [],
        differentDiscounts: result[0]?.differentDiscounts?.[0]?.discounts || [],
        differentGenders: result[0]?.differentGenders?.[0]?.genders || [],
      });
    }

    return res.status(404).json({ message: "Products not found" });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProductsaggregate = async (req, res) => {
  const { fields, category, color, sizes, brand } = req.query;
  const categories = category.split("_").map((cat) => cat.trim());
  const colors = color.split("_").map((col) => col.trim());
  // const allsizes = sizes.split("_").map((size) => size.trim());
  // const brands = brand.split("_").map((brand) => brand.trim());

  console.log("Selected fields:", fields, color);

  try {
    let products = await Product.aggregate([
      ...(categories.length > 0
        ? [{ $match: { category: { $in: categories } } }]
        : []),
      ...(colors.length > 0 ? [{ $match: { color: { $in: colors } } }] : []),
      // ...(allsizes.length > 0 ? [{ $match: { color: { $in: colors } } }] : []),
      // ...(brands.length > 0 ? [{ $match: { brand: { $in: brands } } }] : []),
    ]);
    if (products) return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get single product details
const getsingleProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const isProduct = await Product.findById(productId);
    if (!isProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product found", productdetails: isProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to create a new product
const createProduct = async (req, res) => {
  try {
    const {
      image1,
      image2,
      brand,
      info,
      price,
      oprice,
      color,
      description,
      category,
      gender,
      topTag,
      bottomTag,
    } = req.body;
    const newProduct = new Product({
      image1,
      image2,
      brand,
      info,
      price,
      oprice,
      color,
      description,
      category,
      gender,
      wishlistedBy: [],
      userComments: [],
      productQty: [],
      ratings: [],
      topTag,
      bottomTag,
    });

    const result = await newProduct.save();
    if (result) {
      return res.status(201).json({ message: "Product created Successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to update product details
const updateProductDetails = async (req, res) => {
  try {
    const { productId, wishlistedBy, userComments, ratings } = req.body;

    const isProduct = await Product.findById(productId);
    if (isProduct) {
      if (wishlistedBy) {
        isProduct.wishlistedBy.push(wishlistedBy);
        console.log("Product wishlisted successfully");
      }

      if (userComments) {
        isProduct.userComments.push(userComments);
        console.log("comments added successfully");
      }
      if (ratings) {
        isProduct.ratings.push(ratings);
        console.log("ratings added successfully");
      }

      await isProduct.save();

      return res.status(200).json({ message: "Product updated Successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to delete a product
const deleteProduct = async (req, res) => {
  try {
    const { productID } = req.params;
    const product = await Product.findByIdAndDelete({ _id: productID });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProduct,
  getProductDetails,
  getsingleProductDetails,
  updateProductDetails,
  deleteProduct,
  fetchAndInsertProducts,
  getProductsaggregate,
};
