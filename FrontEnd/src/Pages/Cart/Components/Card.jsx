import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { Link } from "react-router-dom";
import { addUser } from "../../../Storee/User";

const Card = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [openSizeContainers, setOpenSizeContainers] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [sizes, setSizes] = useState({});
  const [prevSize, setPrevSize] = useState({});

  const [openQtyContainers, setOpenQtyContainers] = useState({});
  const [selectedQuantities, setSelectedQuantities] = useState({});

  const getCookieValue = (key) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ").reduce((acc, current) => {
      const [cookieKey, cookieValue] = current.split("=");
      acc[cookieKey] = cookieValue;
      return acc;
    }, {});
    try {
      return cookies[key] ? JSON.parse(decodeURIComponent(cookies[key])) : null;
    } catch (error) {
      console.error("Error parsing cookie:", error);
      return null;
    }
  };

  useEffect(() => {
    const cartCookie = getCookieValue("userCart");
    if (cartCookie?.items?.length > 0) {
      sendToCart(cartCookie?.items);
    }
  }, [dispatch, user.myCart.length]);

  const handleRemoveItem = async (item) => {
    try {
      const result = await axios.put(
        "http://localhost:3000/users/removeFromCart",
        JSON.stringify({
          userId: user._id,
          productId: item.productId._id,
          size: item.size,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        const updatedUser = result?.data?.result;
        dispatch(addUser(updatedUser));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenSizeCont = (itemId, item) => {
    const product = item.productId; // Use the productId from the cart item
    setSelectedSizes((prevState) => ({
      ...prevState,
      [itemId]: item.size,
    }));

    setPrevSize((prevState) => ({
      ...prevState,
      [itemId]: item.size,
    }));

    setSizes((prevState) => ({
      ...prevState,
      [itemId]: product.productQty || [],
    }));

    setOpenSizeContainers((prevState) => ({
      ...prevState,
      [itemId]: true,
    }));

    setOpenQtyContainers((prevState) => ({
      ...prevState,
      [itemId]: false,
    }));
  };

  const handleCloseSizeContainer = (itemId) => {
    setOpenSizeContainers((prevState) => ({
      ...prevState,
      [itemId]: false,
    }));
  };

  const handleSelectSize = (itemId, size) => {
    setSelectedSizes((prevState) => ({
      ...prevState,
      [itemId]: size,
    }));
  };

  const handleSizeConfirm = async (itemId) => {
    try {
      const result = await axios.put(
        "http://localhost:3000/users/updateSize",
        JSON.stringify({
          userId: user._id,
          itemId: itemId,
          size: selectedSizes[itemId],
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        dispatch(addUser(result.data.result));
        setOpenSizeContainers((prevState) => ({
          ...prevState,
          [itemId]: false,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenQtyCotainer = (itemId, item) => {
    setSelectedQuantities((prevState) => ({
      ...prevState,
      [itemId]: item.quantity,
    }));

    setSelectedSizes((prevState) => ({
      ...prevState,
      [itemId]: item.size,
    }));

    setOpenQtyContainers((prevState) => ({
      ...prevState,
      [itemId]: true,
    }));

    setOpenSizeContainers((prevState) => ({
      ...prevState,
      [itemId]: false,
    }));
  };

  const handleSelectQuantity = (itemId, quantity) => {
    setSelectedQuantities((prevState) => ({
      ...prevState,
      [itemId]: quantity,
    }));
  };

  const handleQtyConfirm = async (itemId) => {
    console.log(itemId);
    try {
      const result = await axios.put(
        "http://localhost:3000/users/updateQuantity",
        JSON.stringify({
          userId: user._id,
          itemId: itemId,
          quantity: selectedQuantities[itemId],
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        dispatch(addUser(result?.data?.result));

        setOpenQtyContainers((prevState) => ({
          ...prevState,
          [itemId]: false,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      {user?.myCart.length > 0 && (
        <div>
          {user.myCart[0]?.items?.map((cartItem) => (
            <div
              className="w-full flex gap-2 border-[1px] border-gray-400 rounded-md p-4"
              key={cartItem._id}
            >
              <div className="w-[20%] rounded-md cursor-pointer">
                <Link
                  to={`/p/${cartItem?.productId?.info
                    .split(" ")
                    .map((word) => word.trim())
                    .join("-")}`}
                >
                  <img
                    className="w-full object-cover rounded-md h-44"
                    src={cartItem.productId.image1}
                    alt={cartItem.productId.brand}
                  />
                </Link>
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <h3 className="pl-2">{cartItem.productId.brand}</h3>
                  <button
                    className="mr-2 text-gray-500"
                    onClick={() => handleRemoveItem(cartItem)}
                  >
                    X
                  </button>
                </div>
                <div>
                  <h3 className="pl-2">{cartItem.productId.info}</h3>
                </div>
                <div className="flex items-center text-gray-400 text-sm mt-2 pl-2">
                  <span className="flex items-center justify-center w-[14px] h-[14px] bg-green-200 text-green-500 rounded-full text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 6l4 4L9 3" />
                    </svg>
                  </span>
                  ships within a few days
                </div>

                <div className="flex justify-between w-full mt-16 pb-2">
                  <div className="w-40 flex gap-2 pl-2">
                    <div className="w-1/2 flex items-center justify-center rounded-sm bg-[rgb(244,248,251)] text-xs">
                      <span className="text-[rgb(31,110,159)]">Size : </span>
                      <span className="uppercase text-[rgb(31,110,159)] ml-[3px]">
                        {cartItem.size}
                      </span>
                      <span
                        className="flex items-center justify-center text-blue-400 cursor-pointer ml-2 mt-[1px] font-semibold"
                        onClick={() =>
                          handleOpenSizeCont(cartItem._id, cartItem)
                        }
                      >
                        <IoIosArrowDown />
                      </span>
                    </div>
                    <div className="w-1/2 flex items-center justify-center rounded-sm bg-[rgb(244,248,251)] text-xs">
                      <span className="text-[rgb(31,110,159)]">Qty :</span>
                      <span className="uppercase text-[rgb(31,110,159)] ml-[3px]">
                        {cartItem.quantity}
                      </span>
                      <span
                        className="flex items-center justify-center text-blue-400 cursor-pointer font-semibold ml-2 mt-[1px]"
                        onClick={() =>
                          handleOpenQtyCotainer(cartItem._id, cartItem)
                        }
                      >
                        <IoIosArrowDown />
                      </span>
                    </div>
                  </div>
                  <div className="mr-2">
                    <div className="flex justify-center items-center">
                      <span className="text-black font-bold">
                        ₹{cartItem.productId.oprice * cartItem.quantity}
                      </span>
                      {cartItem.productId.price !==
                        cartItem.productId.oprice && (
                        <span className="relative text-gray-500 text-sm">
                          <span className="absolute top-1/2 left-0 right-0 border-b-2 border-gray-500"></span>
                          ₹{cartItem.productId.price * cartItem.quantity}
                        </span>
                      )}
                    </div>
                    {cartItem.productId.price !== cartItem.productId.oprice && (
                      <div className="text-sm">{`You saved  ₹${
                        cartItem.productId.price * cartItem.quantity -
                        cartItem.productId.oprice * cartItem.quantity
                      }`}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Size Selection Modal */}
          {Object.keys(openSizeContainers).map(
            (itemId) =>
              openSizeContainers[itemId] && (
                <div
                  className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                  key={itemId}
                >
                  <div className="w-[500px] h-60 border-2 border-gray-500 p-6 bg-white rounded-md">
                    <div className="flex justify-between mb-4">
                      <h1 className="font-semibold">
                        Choose your perfect fit!
                      </h1>
                      <button
                        className="text-gray-500 ml-4"
                        onClick={() => handleCloseSizeContainer(itemId)}
                      >
                        X
                      </button>
                    </div>

                    <div className="w-full h-[1px] bg-gray-300 mb-4"></div>

                    <div className="grid grid-cols-8 gap-4 w-full m-4 pt-2">
                      {sizes[itemId]?.map((size) => (
                        <button
                          key={size?.size}
                          className="flex flex-col items-center justify-center border-[0.5px] p-2 rounded-md"
                          style={{
                            color:
                              size?.quantity < 5
                                ? "rgb(234,33,35)"
                                : size.quantity === 0
                                ? "rgb(200,200,200)"
                                : "rgb(54,53,55)",
                            borderColor:
                              size?.quantity < 5
                                ? "rgb(234,33,35)"
                                : size.quantity === 0
                                ? "rgb(200,200,200)"
                                : "rgb(54,53,55)",
                            cursor: size?.quantity === 0 ? "none" : "pointer",
                            backgroundColor:
                              selectedSizes[itemId] === size?.size
                                ? "rgb(255,210,50)"
                                : "white",
                          }}
                          onClick={() => handleSelectSize(itemId, size.size)}
                        >
                          <span className="text-sm">{size?.size}</span>
                          <span
                            className="font-semibold text-[rgb(31,110,159)]"
                            style={{
                              color:
                                size?.quantity === 0
                                  ? "rgb(200,200,200)"
                                  : "rgb(31,110,159)",
                            }}
                          >
                            {size?.quantity} left
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="w-full h-[1px] bg-gray-300 mb-4"></div>

                    <div className="flex justify-center gap-4">
                      <button
                        className="bg-yellow-400 p-2 rounded-md w-36"
                        onClick={() => handleSizeConfirm(itemId)}
                      >
                        Confirm
                      </button>
                      <button
                        className="bg-gray-200 p-2 rounded-md w-36"
                        onClick={() => handleCloseSizeContainer(itemId)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}

          {/* Quantity Selection Modal */}
          {Object.keys(openQtyContainers).map(
            (itemId) =>
              openQtyContainers[itemId] && (
                <div
                  className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                  key={itemId}
                >
                  <div className="w-[300px] h-56 border-2 border-gray-500 p-6 bg-white rounded-md">
                    <div className="flex justify-between mb-4">
                      <h1 className="font-semibold">Choose Quantity</h1>
                      <button
                        className="text-gray-500 ml-4"
                        onClick={() =>
                          setOpenQtyContainers((prevState) => ({
                            ...prevState,
                            [itemId]: false,
                          }))
                        }
                      >
                        X
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() =>
                          handleSelectQuantity(
                            itemId,
                            selectedQuantities[itemId] - 1
                          )
                        }
                        disabled={selectedQuantities[itemId] <= 1}
                      >
                        -
                      </button>

                      <span>{selectedQuantities[itemId]}</span>

                      <button
                        onClick={() =>
                          handleSelectQuantity(
                            itemId,
                            selectedQuantities[itemId] + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="mt-4">
                      <button
                        className="bg-yellow-400 p-2 rounded-md w-full"
                        onClick={() => handleQtyConfirm(itemId)}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
