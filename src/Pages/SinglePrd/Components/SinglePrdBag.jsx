import React, { useState } from "react";
import { add } from "../../../Storee/CartSlice";
import {
  addtoWishlist,
  removefromWishlist,
} from "../../../Storee/WishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SinglePrdBag = ({ sizeStock, Size, setSize, Product }) => {
  const wishlistProducts = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSizeCont, setOpenSizeCont] = useState(false);
  const [selectedSize, setSelectedSize] = useState(Size);
  const [notification, setNotification] = useState(null);
  const [isAddedToBag, setIsAddedToBag] = useState(false);

  function handleAddToBag() {
    if (!selectedSize || selectedSize === "null") {
      setOpenSizeCont(true);
      return;
    }

    const finalProduct = { ...Product, Size: selectedSize };
    dispatch(add(finalProduct));

    setNotification("Product added to cart successfully!");
    setIsAddedToBag(true);
    setOpenSizeCont(false);

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  function handleAddToWishlist(item) {
    const isWishlisted = wishlistProducts.find(
      (product) => product.id === item.id
    );
    if (isWishlisted) {
      dispatch(removefromWishlist(item.id));
      setWishlistNotification("Product removed from wishlist!");
    } else {
      dispatch(addtoWishlist(item));
      setWishlistNotification("Successfully added to wishlist!");
    }
    setTimeout(() => {
      setWishlistNotification("");
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
              fill: wishlistProducts?.find(
                (product) => product.id === Product.id
              )
                ? "red"
                : "white",
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
          {wishlistProducts?.find((product) => product.id === Product.id)
            ? "WISHLISTED"
            : "WISHLIST"}
        </button>
      </div>

      {openSizeCont && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div
            className="w-[350px] h-auto overflow-y-auto bg-white p-4 rounded-lg relative"
            tabIndex="-1"
            autoFocus
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseSizeCont}
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

            <div className="text-center">
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
                    {selectedSize === size && stock > 0 && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Bust: {getDimensions(size).Bust}</p>
                        <p>Front Length: {getDimensions(size).Length}</p>
                        <p>Sleeve Length: {getDimensions(size).Sleeve}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

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
