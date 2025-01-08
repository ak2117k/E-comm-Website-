import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const CartProducts = useSelector((state) => state.cart);

  const [filteredCart, setFilteredCart] = useState(
    CartProducts.reduce((accumulatedCart, product) => {
      const existingProductIndex = accumulatedCart.findIndex(
        (item) => item.id === product.id && item.Size === product.Size
      );

      if (existingProductIndex !== -1) {
        accumulatedCart[existingProductIndex].Qty += product.Qty;
      } else {
        accumulatedCart.push({ ...product });
      }

      return accumulatedCart;
    }, [])
  );

  const [openSizeCont, setOpenSizeCont] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [dimensions, setDimensions] = useState("");
  const [curentsizeQty, setCurrentSizeQty] = useState(0);
  const [openQtyCont, setOpenQtyCont] = useState(false);

  useEffect(() => {
    if (currentProduct) {
      const sizeKey = Object?.keys(currentProduct)?.find((key) =>
        key.includes("Sizes")
      );
      const sizeValue = sizeKey ? currentProduct[sizeKey] : {};
      const maxQty = sizeValue[selectedSize] || 0;
      if (selectedQty > maxQty) {
        setSelectedQty(maxQty);
      }
    }
  }, [selectedSize, currentProduct, selectedQty]);

  const setSizeDimensions = (size, category) => {
    let newDimensions = "";

    if (
      category === "jeans" ||
      category === "pants" ||
      category === "joggers"
    ) {
      switch (size) {
        case "S":
          newDimensions = "Waist: 28 | Outseam Length: 39.5";
          break;
        case "M":
          newDimensions = "Waist: 30 | Outseam Length: 40.5";
          break;
        case "L":
          newDimensions = "Waist: 32 | Outseam Length: 41.0";
          break;
        case "XL":
          newDimensions = "Waist: 34 | Outseam Length: 41.5";
          break;
        case "2XL":
          newDimensions = "Waist: 36 | Outseam Length: 42.0";
          break;
        default:
          break;
      }
    } else {
      switch (size) {
        case "XS":
          newDimensions =
            "Bust: 38.0 | Front Length: 26.0 | Sleeve Length: 5.25";
          break;
        case "S":
          newDimensions =
            "Bust: 40.0 | Front Length: 27.0 | Sleeve Length: 5.5";
          break;
        case "M":
          newDimensions =
            "Bust: 42.0 | Front Length: 27.0 | Sleeve Length: 5.75";
          break;
        case "L":
          newDimensions =
            "Bust: 44.0 | Front Length: 28.0 | Sleeve Length: 6.0";
          break;
        case "XL":
          newDimensions =
            "Bust: 46.0 | Front Length: 28.0 | Sleeve Length: 6.25";
          break;
        case "2XL":
          newDimensions =
            "Bust: 48.0 | Front Length: 29.0 | Sleeve Length: 6.5";
          break;
        default:
          break;
      }
    }

    setDimensions(newDimensions);
  };

  const handleOpenSizeContainer = (product) => {
    setCurrentProduct(product);
    setSelectedSize(product.Size || "M");
    setOpenSizeCont(true);
    setSizeDimensions(product.Size || "M", product.category);
  };

  const handleOpenQtyContainer = (product, size, sizeValue) => {
    setCurrentProduct(product);
    setCurrentSizeQty(sizeValue[size]);
    setOpenQtyCont(true);
  };

  const handleSelectSize = (size, sizeValue) => {
    if (sizeValue[size] === 0) return; // Ensure size has stock
    setSelectedSize(size); // Set the selected size
    setSizeDimensions(size, currentProduct.category); // Update dimensions based on selected size
  };

  const handleSaveChanges = (cont) => {
    if (cont === "Qty" && currentProduct) {
      const updatedProduct = {
        ...currentProduct,
        Size: selectedSize,
        Qty: selectedQty,
      };

      // Update the filteredCart with new quantity
      const updatedCart = filteredCart.map((product) =>
        product.id === updatedProduct.id && product.Size === updatedProduct.Size
          ? updatedProduct
          : product
      );

      setFilteredCart(updatedCart); // Update the cart
      setOpenQtyCont(false); // Close the quantity modal
      console.log(updatedCart); // Debugging to check the updated cart
    }

    if (currentProduct) {
      const updatedProduct = {
        ...currentProduct,
        Size: selectedSize,
        Qty: selectedQty,
      };

      // Update the filteredCart with the selected size
      const updatedCart = filteredCart.map((product) =>
        product.id === updatedProduct.id && product.Size === updatedProduct.Size
          ? updatedProduct
          : product
      );

      setFilteredCart(updatedCart); // Update the cart
      setOpenSizeCont(false); // Close the size modal
      console.log(updatedCart); // Debugging to check the updated cart
    }
  };

  const handleCloseModals = (cont) => {
    if (cont === "Qty") {
      setOpenQtyCont(false);
    }
    setOpenSizeCont(false);
  };

  const handleDelete = (product) => {
    const updatedCart = filteredCart.filter((item) => item.id !== product.id);
    setFilteredCart(updatedCart);
  };

  function handleSizeChange(e) {
    setSelectedSize(e.target.value);
  }

  return (
    <div className="w-[85%] border-2 border-red-400 h-auto ml-[100px]">
      <div className="flex gap-4 w-full h-10 border-2 border-yellow-300 mt-10">
        <span className="text-[18px] font-semibold">My Bag</span>
        {filteredCart?.length > 0 && (
          <span className="text-[18px] font-bold">
            {`(${filteredCart.length} items)`}
          </span>
        )}
      </div>

      <div className="w-full gap-10 flex">
        <div className="w-[800px] border-2 border-black">
          <div className="w-full">
            {filteredCart.map((product) => {
              return (
                <div className="bg-blue-50 w-full" key={product.id}>
                  <div className="flex gap-2">
                    <div className="w-[100px] h-[130px]">
                      <img
                        className="w-[100px] h-[130px] object-cover"
                        src={product.image1}
                        alt={product.brand}
                      />
                    </div>
                    <div className="w-full">
                      <div>{product.brand}</div>
                      <div>{product.info}</div>
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
                          <span className="inline-flex">size:</span>
                          <span
                            className="inline-flex"
                            value={selectedSize}
                            onChange={handleSizeChange}
                          >
                            {product.Size || "M"}
                          </span>
                          <span
                            className="inline-flex cursor-pointer"
                            onClick={() => handleOpenSizeContainer(product)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                            >
                              <path d="M12 16l-4-4h3V4h2v8h3l-4 4z" />
                            </svg>
                          </span>
                        </div>
                        <div className="flex">
                          <span className="inline-flex">Qty:</span>
                          <span className="inline-flex">{product.Qty}</span>
                          <span
                            className="inline-flex cursor-pointer"
                            onClick={() => {
                              const sizeKey = Object?.keys(product)?.find(
                                (key) => key.includes("Sizes")
                              );
                              const sizeValue = sizeKey ? product[sizeKey] : {};

                              handleOpenQtyContainer(
                                product,
                                product.Size,
                                sizeValue
                              );
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                            >
                              <path d="M12 16l-4-4h3V4h2v8h3l-4 4z" />
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
              );
            })}
          </div>
        </div>
      </div>

      {/* Size container */}
      {openSizeCont && currentProduct && (
        <div className="bg-white p-4 border-2 border-gray-300 w-[450px] absolute top-20 left-1/2 transform -translate-x-1/2 z-10 h-[280px] rounded-md">
          <div className="flex justify-between items-center border-b border-gray-300 pb-4 text-gray-600 w-[420px]">
            <div className="font-semibold">Choose your perfect fit!</div>
            <div
              className="cursor-pointer text-sm font-semibold text-gray-600"
              onClick={() => handleCloseModals("Size")}
            >
              X
            </div>
          </div>

          {currentProduct && (
            <div className="flex gap-4 mt-4 flex-wrap">
              {(() => {
                const sizeKey = Object?.keys(currentProduct)?.find((key) =>
                  key.includes("Sizes")
                );
                const sizeValue = sizeKey ? currentProduct[sizeKey] : {};
                return Object.keys(sizeValue).map((size) => {
                  const stockCount = sizeValue[size];
                  const isSelected = size === selectedSize;
                  const isLowStock =
                    stockCount !== undefined &&
                    stockCount < 5 &&
                    stockCount !== 0;
                  const isOutOfStock = stockCount === 0;

                  return (
                    <div
                      key={size}
                      className="w-[50px] h-[100px] flex flex-col items-center"
                    >
                      <div
                        onClick={() => handleSelectSize(size, sizeValue)}
                        className={`${
                          isSelected
                            ? "bg-yellow-500"
                            : isOutOfStock
                            ? "bg-gray-300"
                            : "bg-white"
                        } ${
                          isLowStock
                            ? "border-red-500"
                            : isOutOfStock
                            ? "border-gray-300"
                            : "border-gray-300"
                        }
                  ${isOutOfStock ? "cursor-not-allowed" : "cursor-pointer"} 
                     p-1 rounded w-[50px] h-[45px] text-center justify-center border-[1px]`}
                      >
                        {size}
                      </div>
                      <div className="mt-2">
                        {sizeValue[size] < 5 && sizeValue[size] !== 0 && (
                          <div className="text-red-500 ">
                            {sizeValue[size]} left
                          </div>
                        )}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}

          <div className="mt-4 text-gray-600">
            <div>{dimensions}</div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              className="bg-yellow-500 text-black p-2 rounded w-[400px] font-semibold"
              onClick={() => handleSaveChanges("Size")}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Quantity container */}
      {openQtyCont && currentProduct && (
        <div className="bg-white p-4 border-2 border-gray-300 w-[450px] absolute top-20 left-1/2 transform -translate-x-1/2 z-10 h-[280px] rounded-md">
          <div className="flex justify-between items-center border-b border-gray-300 pb-4 text-gray-600 w-[420px]">
            <div className="font-semibold">Select Quantity</div>
            <div
              className="cursor-pointer text-sm font-semibold text-gray-600"
              onClick={() => handleCloseModals("Qty")}
            >
              X
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 items-center">
            {[...Array(10)].map((_, index) => {
              const qty = index + 1;
              const isMax = qty <= curentsizeQty;
              const isSelected = qty === selectedQty;

              return (
                <div
                  key={qty}
                  className={`h-[40px] w-[40px] rounded-md text-black text-center flex items-center justify-center
                  ${isMax ? "cursor-pointer" : "cursor-not-allowed bg-gray-300"}
                  ${isSelected ? "bg-yellow-500" : "bg-white"}`}
                  onClick={() => {
                    if (isMax) {
                      setSelectedQty(qty);
                    }
                  }}
                  style={{
                    cursor: isMax ? "pointer" : "not-allowed",
                    backgroundColor: isSelected
                      ? "rgb(254, 202, 0)"
                      : !isMax
                      ? "gray"
                      : "white",
                  }}
                >
                  {qty}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-center">
            <button
              className="bg-yellow-500 text-black p-2 rounded w-[400px] font-semibold"
              onClick={() => handleSaveChanges("Qty")}
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
