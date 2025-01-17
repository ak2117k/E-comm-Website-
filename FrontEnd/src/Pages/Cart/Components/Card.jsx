import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { add, clearCart, remove } from "../../../Storee/CartSlice";

const Card = () => {
  const Products = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [openSizeContainers, setOpenSizeContainers] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [sizes, setSizes] = useState({});
  const [prevSize, setPrevSize] = useState({});

  const [openQtyContainers, setOpenQtyContainers] = useState({}); // Manage quantity modals
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
  }, [dispatch, Products.length]);

  // Batch API requests for Cart
  const sendToCart = async (cartItems) => {
    console.log(cartItems);
    if (cartItems.length === 0) return;

    try {
      const products = await Promise.all(
        cartItems.map(async (item) => {
          console.log(item);
          const productId = item.productId;
          if (productId) {
            const id =
              typeof productId === "string" ? productId : productId._id;
            const result = await axios.get(
              `http://localhost:3000/product/getProducts/${id}`
            );

            const productData = result.data.isProduct;

            return {
              ...productData,
              size: item.size, // Add the size from the cart item
              quantity: item.quantity, // Add the quantity from the cart itema
            };
          }
        })
      );
      dispatch(clearCart());
      dispatch(add(products));
    } catch (error) {
      console.log("Error fetching cart items:", error);
    }
  };

  console.log(Products);

  const handleRemoveItem = async (item) => {
    // Logic to remove item
    try {
      console.log(
        JSON.stringify({
          userId: user._id,
          productId: item._id,
          size: item.size,
        })
      );
      const result = await axios.put(
        "http://localhost:3000/cart/removeItem",
        JSON.stringify({
          userId: user._id,
          productId: item._id,
          size: item.size,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        dispatch(remove(item._id));
        const cartCookie = JSON.stringify(result.data.result);
        document.cookie = `userCart=${encodeURIComponent(cartCookie)};path=/;`;
        const updatedProducts = Products.filter(
          (product) => product._id !== item._id
        );
        dispatch(clearCart());
        dispatch(add(updatedProducts));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Open size container for a specific item
  const handleOpenSizeCont = (itemId, item) => {
    const product = Products.find((p) => p._id === itemId);
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

    // Close any open quantity modals when size modal opens
    setOpenQtyContainers((prevState) => ({
      ...prevState,
      [itemId]: false,
    }));
  };

  // Close size container for a specific item
  const handleCloseSizeContainer = (itemId) => {
    setOpenSizeContainers((prevState) => ({
      ...prevState,
      [itemId]: false,
    }));
  };

  // Handle size selection for a specific product
  const handleSelectSize = (itemId, size) => {
    setSelectedSizes((prevState) => ({
      ...prevState,
      [itemId]: size,
    }));
  };

  // Handle size confirmation
  const handleSizeConfirm = async (itemId) => {
    console.log("Size selected for item", itemId, selectedSizes[itemId]);
    try {
      const result = await axios.put(
        "http://localhost:3000/cart/updateItemSize",
        JSON.stringify({
          userId: user._id,
          productId: itemId,
          newSize: selectedSizes[itemId],
          size: prevSize[itemId],
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        const cartCookie = JSON.stringify(result.data.result);
        document.cookie = `userCart=${encodeURIComponent(cartCookie)};path=/;`;

        const updatedProducts = Products.map((product) =>
          product._id === itemId
            ? { ...product, size: selectedSizes[itemId] }
            : product
        );
        dispatch(clearCart());
        dispatch(add(updatedProducts));

        setOpenSizeContainers((prevState) => ({
          ...prevState,
          [itemId]: false, // Close the size container after confirming
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Open quantity container for a specific item
  const handleOpenQtyCotainer = (itemId, item) => {
    setSelectedQuantities((prevState) => ({
      ...prevState,
      [itemId]: item.quantity,
    }));

    setSelectedSizes((prevState) => ({
      ...prevState,
      [itemId]: item.size,
    }));

    // Open the quantity container
    setOpenQtyContainers((prevState) => ({
      ...prevState,
      [itemId]: true,
    }));

    // Close any open size modals when quantity modal opens
    setOpenSizeContainers((prevState) => ({
      ...prevState,
      [itemId]: false,
    }));
  };

  // Handle quantity selection for a specific item
  const handleSelectQuantity = (itemId, quantity) => {
    setSelectedQuantities((prevState) => ({
      ...prevState,
      [itemId]: quantity,
    }));
  };

  // Handle quantity confirmation
  const handleQtyConfirm = async (itemId) => {
    try {
      const result = await axios.put(
        "http://localhost:3000/cart/addUpdate",
        JSON.stringify({
          userId: user._id,
          productId: itemId,
          quantity: selectedQuantities[itemId],
          size: selectedSizes[itemId],
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result);
      if (result.status === 200) {
        const cartCookie = JSON.stringify(result.data.result);
        document.cookie = `userCart=${encodeURIComponent(cartCookie)};path=/;`;

        const updatedProducts = Products.map((product) =>
          product._id === itemId
            ? { ...product, quantity: selectedQuantities[itemId] }
            : product
        );
        dispatch(clearCart());
        dispatch(add(updatedProducts));

        setOpenQtyContainers((prevState) => ({
          ...prevState,
          [itemId]: false, // Close the quantity container after confirming
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full ">
      {Products?.length > 0 && (
        <div>
          {Products.map((product) => (
            <div
              className="w-full flex gap-2 border-[1px] border-gray-400 rounded-md p-4"
              key={product?._id}
            >
              <div className="w-[20%] rounded-md cursor-pointer">
                <img
                  className="w-full object-cover rounded-md h-44"
                  src={product?.image1}
                  alt={product?.brand}
                />
              </div>
              <div className="w-full  ">
                <div className="flex justify-between ">
                  <h3 className="pl-2">{product?.brand}</h3>
                  <button
                    className="mr-2 text-gray-500"
                    onClick={() => handleRemoveItem(product)}
                  >
                    X
                  </button>
                </div>
                <div>
                  <h3 className="pl-2">{product?.info}</h3>
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
                  <div className="w-40 flex gap-2  pl-2">
                    <div className="w-1/2 flex items-center justify-center rounded-sm bg-[rgb(244,248,251)] text-xs">
                      <span className="text-[rgb(31,110,159)]">Size : </span>
                      <span className="uppercase text-[rgb(31,110,159)] ml-[3px]">
                        {product?.size}
                      </span>
                      <span
                        className="flex items-center justify-center text-blue-400 cursor-pointer ml-2 mt-[1px] font-semibold"
                        onClick={() => handleOpenSizeCont(product._id, product)}
                      >
                        <IoIosArrowDown />
                      </span>
                    </div>
                    <div className="w-1/2 flex items-center justify-center rounded-sm bg-[rgb(244,248,251)] text-xs">
                      <span className="text-[rgb(31,110,159)]">Qty :</span>
                      <span className="uppercase text-[rgb(31,110,159)] ml-[3px]">
                        {product?.quantity}
                      </span>
                      <span
                        className="flex items-center justify-center text-blue-400 cursor-pointer font-semibold ml-2 mt-[1px]"
                        onClick={() =>
                          handleOpenQtyCotainer(product._id, product)
                        }
                      >
                        <IoIosArrowDown />
                      </span>
                    </div>
                  </div>
                  <div className="mr-2">
                    <div className="flex justify-center items-center">
                      <span className="text-black font-bold">
                        ₹{product.oprice * product.quantity}
                      </span>
                      {product.price !== product.oprice && (
                        <span className="relative text-gray-500 text-sm">
                          <span className="absolute top-1/2 left-0 right-0 border-b-2 border-gray-500"></span>
                          ₹{product.price * product.quantity}
                        </span>
                      )}
                    </div>
                    {product.price !== product.oprice && (
                      <div className="text-sm">{`You saved  ₹${
                        product.price * product.quantity -
                        product.oprice * product.quantity
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
                          {size.quantity < 5 && size.quantity > 0 && (
                            <span className="text-[rgb(234,33,35)] text-xs mt-1">
                              {size.quantity} left
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="w-full mt-8">
                      <button
                        className="w-full h-8 flex items-center justify-center rounded-md"
                        style={{
                          backgroundColor: selectedSizes[itemId]
                            ? "rgb(255,210,50)"
                            : "rgb(227,229,233)",
                          color: selectedSizes[itemId]
                            ? "black"
                            : "rgb(157,165,180)",
                        }}
                        onClick={() => handleSizeConfirm(itemId)}
                      >
                        CONFIRM
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      )}

      {/* Quantity Selection Modal */}
      {Object.keys(openQtyContainers).map(
        (itemId) =>
          openQtyContainers[itemId] && (
            <div
              className="absolute  flex justify-center items-center bg-black bg-opacity-50 z-50 translate-y-48 translate-x-48"
              key={itemId}
            >
              <div className="w-[500px] h-[280px] border-2 border-gray-500 p-6 bg-white rounded-md">
                <div className="flex justify-between mb-4">
                  <h1 className="font-semibold">Select Quantity</h1>
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

                <div className="w-full h-[1px] bg-gray-300 mb-4"></div>

                <div className="grid grid-cols-7 gap-4 w-full m-4 pt-2">
                  {[...Array(10).keys()].map((quantity) => (
                    <button
                      key={quantity + 1}
                      className="flex flex-col items-center justify-center border-[0.5px] p-2 rounded-md"
                      onClick={() => handleSelectQuantity(itemId, quantity + 1)}
                      style={{
                        backgroundColor:
                          selectedQuantities[itemId] === quantity + 1
                            ? "rgb(255,210,50)"
                            : "white",
                      }}
                    >
                      <span className="text-sm">{quantity + 1}</span>
                    </button>
                  ))}
                </div>

                <div className="w-full mt-8">
                  <button
                    className="w-full h-8 flex items-center justify-center rounded-md"
                    style={{
                      backgroundColor: selectedQuantities[itemId]
                        ? "rgb(255,210,50)"
                        : "rgb(227,229,233)",
                      color: selectedQuantities[itemId]
                        ? "black"
                        : "rgb(157,165,180)",
                    }}
                    onClick={() => handleQtyConfirm(itemId)}
                  >
                    CONFIRM
                  </button>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Card;
