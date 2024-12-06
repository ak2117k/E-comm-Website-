import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  singleProduct: null,
  error: null,
  isLoading: false,
  updatedData: [], // This will store the updated product details
};

// The tags and other constants remain the same...

const Data = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.updatedData = action.payload; // Store updated data directly here
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
    updateData: (state, action) => {
      state.updatedData = action.payload;
    },
  },
});

export const {
  fetchProducts,
  fetchSingleProduct,
  setError,
  setLoading,
  resetData,
  updateData,
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
      dispatch(fetchProducts(updatedProducts)); // Dispatch updated data to store
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
      dispatch(fetchSingleProduct(result));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
}
