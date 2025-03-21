import React, { useState, useEffect } from "react";
import { add, clearCart } from "../../../Storee/CartSlice";
import {
  addtoWishlist,
  removefromWishlist,
} from "../../../Storee/WishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../../../Storee/User";

const SinglePrdBag = ({ sizeStock, Size, setSize, Product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [openSizeCont, setOpenSizeCont] = useState(false);
  const [selectedSize, setSelectedSize] = useState(Size);
  const [notification, setNotification] = useState(null);
  const [isAddedToBag, setIsAddedToBag] = useState(false);

  useEffect(() => {
    // Trigger API call after selectedSize is updated.
    if (selectedSize) {
      handleAddToBag();
    }
  }, [dispatch, selectedSize]); // This will run the effect when selectedSize changes.

  async function handleAddToBag() {
    if (Size === null) {
      setOpenSizeCont(true);
      return;
    }
    try {
      const result = await axios.put(
        "http://localhost:3000/cart/addUpdate",
        JSON.stringify({
          userId: user._id,
          productId: Product._id,
          size: selectedSize || Size,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(clearCart());
      dispatch(add(result.data.result));
      setNotification("Product added to cart successfully!");
      setIsAddedToBag(true);
      setOpenSizeCont(false);
      const cartCookie = JSON.stringify(result.data.result);
      document.cookie = `userCart=${encodeURIComponent(cartCookie)};path=/;`;

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddToWishlist(item) {
    try {
      const result = await axios.put(
        "http://localhost:3000/users/profile/update/wishlist",
        JSON.stringify({
          userId: user._id,
          productId: item._id,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.status === 200) {
        setNotification(result.data.message);
        dispatch(addUser(result.data.result));
        const updatedUSerdata = JSON.stringify(result.data.result);
        document.cookie = `user=${encodeURIComponent(updatedUSerdata)};path=/;`;
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setNotification("");
    }, 3000);
  }

  function handleCloseSizeCont() {
    setOpenSizeCont(false);
  }

  function handleSelectSizeInModal(size) {
    if (sizeStock[size] === 0) return;
    setSelectedSize(size);
    setSize(size);
  }

  const getDimensions = (size) => {
    const dimensions = {
      XS: { Bust: "38", Length: "26", Sleeve: "5.25" },
      S: { Bust: "40", Length: "27", Sleeve: "5.5" },
      M: { Bust: "42", Length: "27", Sleeve: "5.75" },
      L: { Bust: "44", Length: "28", Sleeve: "6.0" },
      XL: { Bust: "46", Length: "28", Sleeve: "6.25" },
    };
    return dimensions[size] || {};
  };

  function handleGoToBag() {
    navigate("/cart");
  }

  return (
    <div className="border-b border-gray-200 pb-2">
      <div className="inline-flex justify-between gap-2 mt-4 ml-4">
        <button
          className="flex items-center justify-center w-[275px] h-auto font-semibold bg-yellow-400 rounded-lg p-2"
          onClick={() => {
            if (isAddedToBag) {
              handleGoToBag();
            } else {
              handleAddToBag();
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.8em"
            fill="none"
            viewBox="0 0 16 20"
            className="mr-2"
          >
            <path
              stroke="#303030"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M.75 4.8c0-.02.003-.037.006-.05h14.488c.003.013.006.03.006.05v14.4c0 .02-.003.037-.006.05H.756a.196.196 0 0 1-.006-.05V4.8ZM4.5 3.75c0-.73.395-1.429 1.098-1.945C6.302 1.29 7.255 1 8.25 1c.995 0 1.948.29 2.652.805C11.605 2.321 12 3.021 12 3.75"
            ></path>
          </svg>
          {isAddedToBag ? "GO TO BAG" : "ADD TO BAG"}
        </button>
        <button
          className={`flex items-center justify-center w-[275px] h-auto border-[1px] border-black rounded-lg p-2 font-semibold text-gray-600`}
          onClick={() => handleAddToWishlist(Product)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="mr-2 text-[24px]"
            style={{
              fill: user?.myWishlist?.includes(Product._id) ? "red" : "white",
            }}
          >
            <path
              stroke="#303030"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 20S3 14.91 3 8.727c0-1.093.375-2.152 1.06-2.997a4.672 4.672 0 0 1 2.702-1.638 4.639 4.639 0 0 1 3.118.463A4.71 4.71 0 0 1 12 6.909a4.71 4.71 0 0 1 2.12-2.354 4.639 4.639 0 0 1 3.118-.463 4.672 4.672 0 0 1 2.701 1.638A4.756 4.756 0 0 1 21 8.727C21 14.91 12 20 12 20Z"
            ></path>
          </svg>
          {user?.myWishlist?.includes(Product._id) ? "WISHLISTED" : "WISHLIST"}
        </button>
      </div>

      {openSizeCont && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div
            className="w-[450px] h-auto overflow-y-auto bg-white p-4 rounded-lg relative"
            tabIndex="-1"
            autoFocus
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseSizeCont}
            >
              X
            </button>

            {/* Size Selection Grid */}
            <div className="grid grid-cols-7 gap-6 text-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 p-2">
              {Object.keys(sizeStock).map((size) => {
                const stock = sizeStock[size];
                let borderColor = "black";
                let stockText = null;

                if (stock === 0) {
                  borderColor = "gray";
                  stockText = "";
                } else if (stock < 3) {
                  borderColor = "red";
                  stockText = `${stock} left`;
                }

                return (
                  <div key={size} className="flex flex-col items-center mb-4">
                    <div
                      className={`inline-flex w-[42px] h-[34px] rounded-md border-2 justify-center items-center cursor-pointer ${
                        stock === 0 ? "cursor-not-allowed" : ""
                      } ${selectedSize === size ? "bg-yellow-400" : ""}`}
                      style={{ borderColor: borderColor, color: borderColor }}
                      onClick={() => handleSelectSizeInModal(size)}
                    >
                      <span>{size}</span>
                    </div>
                    {stockText && (
                      <h3
                        className={`text-xs mt-1 ${
                          borderColor === "red"
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {stockText}
                      </h3>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Display dimensions once a size is selected */}
            {selectedSize && (
              <div className="mt-4 text-sm text-gray-600 w-full">
                <p>Bust: {getDimensions(selectedSize).Bust}</p>
                <p>Front Length: {getDimensions(selectedSize).Length}</p>
                <p>Sleeve Length: {getDimensions(selectedSize).Sleeve}</p>
              </div>
            )}

            {/* Add to Bag Button */}
            <button
              className={`w-full mt-4 p-2 rounded-lg font-semibold ${
                selectedSize
                  ? "bg-yellow-400"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!selectedSize}
              onClick={handleAddToBag}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.8em"
                fill="none"
                viewBox="0 0 16 20"
                className="mr-2 inline"
              >
                <path
                  stroke="#303030"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M.75 4.8c0-.02.003-.037.006-.05h14.488c.003.013.006.03.006.05v14.4c0 .02-.003.037-.006.05H.756a.196.196 0 0 1-.006-.05V4.8ZM4.5 3.75c0-.73.395-1.429 1.098-1.945C6.302 1.29 7.255 1 8.25 1c.995 0 1.948.29 2.652.805C11.605 2.321 12 3.021 12 3.75"
                ></path>
              </svg>
              ADD TO BAG
            </button>
          </div>
        </div>
      )}

      {notification && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default SinglePrdBag;
