import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  singleProduct: null,
  error: null,
  isLoading: false,
  singleProductData: null,
};

const tags = {
  tshirts: ["OVERSIZED FIT", "BOYFRIEND FIT", "BUY 3 FOR", "SALE", ""],
  sweatshirts: ["OVERSIZED FIT", "SALE", ""],
  pants: ["STRAIGHT FIT", "TAPERED FIT", "OVERSIZED FIT", "SALE", ""],
  jogger: ["BUY 2 FOR", "OVERSIZED FIT", "SUPERLOOSE FIT", "SALE", ""],
  jacket: ["OVERSIZEDFIT", "REVERSIBLE", "SALE", ""],
  top: ["SLIM FIT", "OVERSIZED FIT", ""],
};

const bottomtags = {
  tshirts: ["100% COTTON", "SOFT TERRY COTTON", "PREMINIUM BLENDED FABRIC", ""],
  sweatshirts: [
    "SOFT TERRY COTTON",
    "PREMINIUM BLENDED FABRIC",
    "SOFT AND STURDY",
    "",
  ],
  pants: ["100% COTTON", "COMFORT STRETCH", ""],
  jogger: [
    "THICK PREMIUM FABRIC",
    "LIGHT WEIGHT FABRIC",
    "LIGHTWEIGHT TERRY FABRIC",
    "SOFT TERRY COTTON",
    "PREMINIUM BLENDED FABRIC",
    "",
  ],
  jacket: ["STRONG & DURABLE", ""],
  top: ["100% COTTON", "COMFORT STRETCH", ""],
};

const names = ["Alice", "Bob", "Charlie", "David", "Eve", "Grace"];
const reviewTexts = [
  "Great product! Highly recommend.",
  "Not bad, but could be better.",
  "The quality was as expected, but delivery was slow.",
  "Absolutely love it! Will buy again.",
  "It broke after one use, very disappointing.",
  "Good value for money. Satisfied with my purchase.",
];

const Data = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    fetchSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    resetData: (state) => {
      state.data = [];
      state.updatedData = [];
    },
    storeSingleProduct: (state, action) => {
      state.singleProductData = action.payload;
    },
  },
});

export const {
  fetchProducts,
  fetchSingleProduct,
  setError,
  setLoading,
  resetData,
  storeSingleProduct,
} = Data.actions;
export default Data.reducer;

function updateProductDetails(data) {
  const updatedProductDetails = data.map((product) => {
    let toptag;
    let bottomtag;
    let finalCategory;
    let noproductReviews = Math.floor(Math.random() * 5) + 1;
    let availabebottomSizes = {
      28: Math.floor(Math.random() * 11),
      32: Math.floor(Math.random() * 11),
      34: Math.floor(Math.random() * 11),
      36: Math.floor(Math.random() * 11),
      38: Math.floor(Math.random() * 11),
    };

    let availableTopSizes = {
      XS: Math.floor(Math.random() * 11),
      S: Math.floor(Math.random() * 11),
      M: Math.floor(Math.random() * 11),
      L: Math.floor(Math.random() * 11),
      XL: Math.floor(Math.random() * 11),
    };

    let Reviews = [];
    for (let i = 0; i < noproductReviews; i++) {
      const name = names[Math.floor(Math.random() * names.length)];
      const reviewText =
        reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
      const foundUseful = Math.floor(Math.random() * 11);
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
      const reviewDate = randomDate.toISOString().split("T")[0];

      Reviews.push({
        name,
        review: reviewText,
        date: reviewDate,
        foundUseful,
      });
    }

    if (product.category.includes("-")) {
      let splitedProductCategory = product.category.split("-");
      finalCategory = splitedProductCategory[0].concat(
        splitedProductCategory[1]
      );
    } else {
      finalCategory = product.category;
    }

    let toptagArray = tags[finalCategory.toLowerCase()] || [];
    let bottomtagArray = bottomtags[finalCategory.toLowerCase()] || [];

    if (toptagArray.length > 0) {
      const toprandomIndex = Math.floor(Math.random() * toptagArray.length);
      toptag = toptagArray[toprandomIndex];
    } else {
      toptag = null;
    }
    if (bottomtagArray.length > 0) {
      const bottomrandomIndex = Math.floor(
        Math.random() * bottomtagArray.length
      );
      bottomtag = bottomtagArray[bottomrandomIndex];
    } else {
      bottomtag = null;
    }

    if (
      product.category === "pants" ||
      product.category === "jeans" ||
      product.category === "pyjama"
    ) {
      return {
        ...product,
        toptag,
        bottomtag,
        noproductReviews,
        availabebottomSizes,
        Reviews,
      };
    } else {
      return {
        ...product,
        toptag,
        bottomtag,
        noproductReviews,
        availableTopSizes,
        Reviews,
      };
    }
  });

  return updatedProductDetails;
}

function updateSingleProductDetails(product) {
  let toptag;
  let bottomtag;
  let finalCategory;
  let noproductReviews = Math.floor(Math.random() * 5) + 1;
  let availabebottomSizes = {
    28: Math.floor(Math.random() * 11),
    32: Math.floor(Math.random() * 11),
    34: Math.floor(Math.random() * 11),
    36: Math.floor(Math.random() * 11),
    38: Math.floor(Math.random() * 11),
  };

  let availableTopSizes = {
    XS: Math.floor(Math.random() * 11),
    S: Math.floor(Math.random() * 11),
    M: Math.floor(Math.random() * 11),
    L: Math.floor(Math.random() * 11),
    XL: Math.floor(Math.random() * 11),
  };

  let Reviews = [];
  for (let i = 0; i < noproductReviews; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const reviewText =
      reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
    const foundUseful = Math.floor(Math.random() * 11);
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
    const reviewDate = randomDate.toISOString().split("T")[0];

    Reviews.push({
      name,
      review: reviewText,
      date: reviewDate,
      foundUseful,
    });
  }

  if (product.category.includes("-")) {
    let splitedProductCategory = product.category.split("-");
    finalCategory = splitedProductCategory[0].concat(splitedProductCategory[1]);
  } else {
    finalCategory = product.category;
  }

  let toptagArray = tags[finalCategory.toLowerCase()] || [];
  let bottomtagArray = bottomtags[finalCategory.toLowerCase()] || [];

  if (toptagArray.length > 0) {
    const toprandomIndex = Math.floor(Math.random() * toptagArray.length);
    toptag = toptagArray[toprandomIndex];
  } else {
    toptag = null;
  }
  if (bottomtagArray.length > 0) {
    const bottomrandomIndex = Math.floor(Math.random() * bottomtagArray.length);
    bottomtag = bottomtagArray[bottomrandomIndex];
  } else {
    bottomtag = null;
  }

  if (
    product.category === "pants" ||
    product.category === "jeans" ||
    product.category === "pyjama"
  ) {
    return {
      ...product,
      toptag,
      bottomtag,
      noproductReviews,
      availabebottomSizes,
      Reviews,
    };
  } else {
    return {
      ...product,
      toptag,
      bottomtag,
      noproductReviews,
      availableTopSizes,
      Reviews,
    };
  }
}

// Thunk to get products and automatically update their details
export function getProducts({
  gender,
  category,
  price,
  page,
  sortBy,
  limit,
  order,
}) {
  return async function getProductsThunk(dispatch) {
    dispatch(setLoading());
    try {
      const params = new URLSearchParams({
        _page: page,
        _limit: limit,
        _sort: sortBy,
        _order: order,
      });
      if (gender) params.append("gender", gender);
      if (category) params.append("category", category);
      if (price) params.append("price", price);

      let response = await fetch(
        `https://koovs-api-data.onrender.com/mens?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok...");
      }

      let result = await response.json();
      const updatedProducts = updateProductDetails(result); // Update product details
      dispatch(fetchProducts(updatedProducts));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
}

export function getProductById(id) {
  return async function getProductByIdThunk(dispatch) {
    dispatch(setLoading());
    try {
      const response = await fetch(
        `https://koovs-api-data.onrender.com/mens/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok...");
      }
      const result = await response.json();
      const updatedProduct = updateSingleProductDetails(result);
      dispatch(fetchSingleProduct(updatedProduct));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
}
