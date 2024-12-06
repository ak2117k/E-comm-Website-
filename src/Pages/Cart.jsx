import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, add } from "../Storee/CartSlice"; // Assuming you have an add action to add updated product

const Cart = () => {
  const dispatch = useDispatch();
  const CartProducts = useSelector((state) => state.cart);
  console.log(CartProducts);

  const [openSizeCont, setOpenSizeCont] = useState(false);
  const [openQtyCont, setOpenQtyCont] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const [currentProduct, setCurrentProduct] = useState(null); // Store the product being edited
  const [isSizeListOpen, setIsSizeListOpen] = useState(false); // To control the size list toggle

  // Size dimensions for different sizes
  const sizeDimensions = {
    S: { Bust: "38", Length: "26", Sleeve: "5.5" },
    M: { Bust: "40", Length: "27", Sleeve: "6.0" },
    L: { Bust: "42", Length: "28", Sleeve: "6.5" },
    XL: { Bust: "44", Length: "29", Sleeve: "7.0" },
    XXL: { Bust: "46", Length: "30", Sleeve: "7.5" },
  };

  // Handle delete of product from cart
  const handleDelete = (product) => {
    dispatch(remove(product.id));
  };

  // Open the size container
  const handleOpenSizeContainer = (product) => {
    setCurrentProduct(product); // Store the current product
    setSelectedSize(product.Size || "S"); // Set selected size to current product's size
    setOpenSizeCont(true);
  };

  // Open the quantity container
  const handleOpenQuantityContainer = (product) => {
    setCurrentProduct(product); // Store the current product
    setSelectedQty(product.qty || 1); // Default to 1 if qty is undefined
    setOpenQtyCont(true);
  };

  // Handle select size
  const handleSelectSize = (size) => {
    setSelectedSize(size);
  };

  // Handle select quantity
  const handleSelectQuantity = (qty) => {
    setSelectedQty(qty);
  };

  // Handle saving changes to product
  const handleSaveChanges = () => {
    if (currentProduct) {
      const updatedProduct = {
        ...currentProduct,
        Size: selectedSize,
        qty: selectedQty,
      };

      // Dispatch actions to update the cart with the new product details
      dispatch(remove(currentProduct.id)); // Remove the old item
      dispatch(add(updatedProduct)); // Add the updated item back to cart
      setOpenSizeCont(false);
      setOpenQtyCont(false);
    }
  };

  // Handle closing modals
  const handleCloseModals = () => {
    setOpenSizeCont(false);
    setOpenQtyCont(false);
  };

  // Toggle available sizes list visibility
  const handleToggleSizeList = () => {
    setIsSizeListOpen((prev) => !prev);
  };

  return (
    <div className="w-[85%] border-2 border-red-400 h-auto ml-[100px]">
      <div className="flex gap-4 w-full h-10 border-2 border-yellow-300 mt-10">
        <span className="text-[18px] font-semibold">My Bag</span>
        {CartProducts?.length > 0 && (
          <span className="text-[18px] font-bold">
            {`(${CartProducts.length} items)`}
          </span>
        )}
      </div>
      <div className="w-full gap-10 flex">
        <div className="w-[800px] border-2 border-black">
          <div className="w-full">
            {CartProducts.map((product) => (
              <div className="bg-blue-50 w-full" key={product.id}>
                <div className="flex gap-2">
                  <div className="w-[100px] h-[130px]">
                    <img
                      className="w-[100px] h-[130px] object-cover"
                      src={product.image1}
                      alt={product.brand}
                    />
                  </div>
                  <div className="">
                    <div className="">{product.brand}</div>
                    <div className="">{product.info}</div>
                    <div className="flex">
                      <span className="bg-green-300 rounded-full mr-2 h-[10px] w-[10px] mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="green"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-2 h-2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </span>
                      <span>ship within few days</span>
                    </div>
                    <div className="flex">
                      <div className="flex">
                        <span className="">Size:</span>
                        <span className="">{product.Size}</span>
                        <span
                          className="ml-2 text-gray-500"
                          onClick={() => handleOpenSizeContainer(product)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="">Qty:</span>
                        <span className="">{product.qty}</span>
                        <span
                          className="ml-2 text-gray-500"
                          onClick={() => handleOpenQuantityContainer(product)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => handleDelete(product)}>
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[500px] border-2 border-blue-300"></div>
      </div>

      {/* Size Modal */}
      {openSizeCont && currentProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div
            className="w-[350px] h-auto bg-white p-4 rounded-lg relative"
            tabIndex="-1"
            autoFocus
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModals}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M6.293 6.293a1 1 0 0 1 1.414 0L12 9.586l4.293-4.293a1 1 0 1 1 1.414 1.414L13.414 11l4.293 4.293a1 1 0 1 1-1.414 1.414L12 12.414l-4.293 4.293a1 1 0 1 1-1.414-1.414L10.586 11 6.293 6.707a1 1 0 0 1 0-1.414z" />
              </svg>
            </button>
            <div>
              <h3>Select Size</h3>
              <div>
                <button onClick={handleToggleSizeList}>
                  {isSizeListOpen ? "Hide Sizes" : "Show Sizes"}
                </button>
                {isSizeListOpen && (
                  <div>
                    {Object.keys(sizeDimensions).map((size) => (
                      <div
                        key={size}
                        className={`p-2 cursor-pointer ${
                          size === selectedSize ? "bg-yellow-400" : ""
                        }`}
                        onClick={() => handleSelectSize(size)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {selectedSize && (
                <div>
                  <h4>Dimensions for {selectedSize}:</h4>
                  <p>Bust: {sizeDimensions[selectedSize].Bust} inches</p>
                  <p>Length: {sizeDimensions[selectedSize].Length} inches</p>
                  <p>Sleeve: {sizeDimensions[selectedSize].Sleeve} inches</p>
                </div>
              )}
            </div>
            <button
              className="w-full bg-yellow-400 rounded-lg text-white mt-4"
              onClick={handleSaveChanges}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Quantity Modal */}
      {openQtyCont && currentProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div
            className="w-[350px] h-auto bg-white p-4 rounded-lg relative"
            tabIndex="-1"
            autoFocus
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModals}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M6.293 6.293a1 1 0 0 1 1.414 0L12 9.586l4.293-4.293a1 1 0 1 1 1.414 1.414L13.414 11l4.293 4.293a1 1 0 1 1-1.414 1.414L12 12.414l-4.293 4.293a1 1 0 1 1-1.414-1.414L10.586 11 6.293 6.707a1 1 0 0 1 0-1.414z" />
              </svg>
            </button>
            <div>
              <h3>Select Quantity</h3>
              <div className="grid grid-cols-5 gap-2 mb-2">
                {[...Array(10).keys()].map((index) => {
                  const qty = index + 1;
                  return (
                    <div
                      key={qty}
                      className={`flex justify-center items-center p-2 border cursor-pointer ${
                        qty === selectedQty ? "bg-yellow-400" : ""
                      }`}
                      onClick={() => handleSelectQuantity(qty)}
                    >
                      {qty}
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              className="w-full bg-yellow-400 rounded-lg text-white mt-4"
              onClick={handleSaveChanges}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
