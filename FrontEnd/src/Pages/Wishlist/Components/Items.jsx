import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { addUser } from "../../../Storee/User";
import { add, clearCart } from "../../../Storee/CartSlice";
import ShopNow from "./ShopNow";

const Items = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [wishlistedItems, setWishtedItems] = useState([]);
  const [notification, setNotification] = useState("");
  const [openSizeContainers, setOpenSizeContainers] = useState({}); // Track open size containers per item
  const [selectedSizes, setSelectedSizes] = useState({}); // Track selected size for each item
  const [sizes, setSizes] = useState([]); // Sizes available for a specific product
  const [loading, setLoading] = useState(true);

  // Fetch product details by productId
  async function fetchProductDetails(productId) {
    try {
      const result = await axios.get(
        `http://localhost:3000/product/getProducts/${productId}`
      );
      if (result.status === 200) {
        return result.data.isProduct;
      }
    } catch (error) {
      console.log("Error fetching product details", error);
      return null; // Return null in case of error
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user || !user.myWishlist || user.myWishlist.length === 0) return;

      // Array to store product fetch promises
      const itemPromises = user.myWishlist.map((itemId) =>
        fetchProductDetails(itemId)
      );

      try {
        // Wait for all product fetch promises to resolve
        const products = await Promise.all(itemPromises);

        // Filter out any null or undefined products (in case fetch fails)
        const validProducts = products.filter(Boolean);

        // Set valid products to state
        setWishtedItems(validProducts);
      } catch (error) {
        console.log("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch, user]); // Re-run effect when `user` changes

  const handleRemoveFromWhishlist = async (productId) => {
    try {
      const result = await axios.put(
        "http://localhost:3000/users/profile/update/wishlist",
        JSON.stringify({
          productId: productId,
          userId: user._id,
        }),
        {
          headers: {
            "Content-Type": "application/json", // Common header for JSON requests
          },
        }
      );
      console.log(result);

      if (result.status === 200) {
        setNotification(result.data.message);
        dispatch(addUser(result.data.result));

        setWishtedItems((prevItems) =>
          prevItems.filter((item) => item._id !== productId)
        );

        const updatedUSerdata = JSON.stringify(result.data.result);
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 604800000);
        document.cookie = `user=${encodeURIComponent(
          updatedUSerdata
        )};expires=${expirationTime.toUTCString()};path=/;`;
        setTimeout(() => setNotification(""), 3000);
      }
    } catch (error) {
      console.error("Error updating wishlist", error); // Handle error
    }
  };

  const handleGoToBag = async (productId, productQty) => {
    if (productQty?.length > 0) {
      setOpenSizeContainers((prev) => ({
        ...prev,
        [productId]: true,
      }));
      setSizes(productQty); // Set available sizes for this item
    }
  };

  const handleSelectSize = (productId, size) => {
    if (size.quantity === 0) return;
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size.size,
    }));
  };

  const handleSizeConfirm = async (productId) => {
    const selectedSize = selectedSizes[productId];
    if (!selectedSize) return; // Don't allow confirming if no size is selected

    try {
      const result1 = await axios.put(
        "http://localhost:3000/users/profile/update/wishlist",
        JSON.stringify({
          productId: productId,
          userId: user._id,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result2 = await axios.put(
        "http://localhost:3000/cart/addUpdate",
        JSON.stringify({
          userId: user._id,
          productId: productId,
          size: selectedSize,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result2.data.result, result1.data.result);

      if (result1.status === 200 && result2.status === 200) {
        dispatch(addUser(result1.data.result));
        dispatch(clearCart());
        dispatch(add(result2.data.result));

        // Update local state to remove the item from the wishlist
        setWishtedItems((prevItems) =>
          prevItems.filter((item) => item._id !== productId)
        );

        const cookieValue = JSON.stringify(result1.data.result);
        const cartCookie = JSON.stringify(result2.data.result);

        document.cookie = `user=${encodeURIComponent(cookieValue)};path=/;`;
        document.cookie = `userCart=${encodeURIComponent(cartCookie)};path=/;`;

        // Close the size container modal
        setOpenSizeContainers((prev) => ({
          ...prev,
          [productId]: false,
        }));
        setTimeout(() => setNotification(""), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSizeContainer = (productId) => {
    setOpenSizeContainers((prev) => ({
      ...prev,
      [productId]: false,
    }));
  };

  return (
    <div>
      {user?.myWishlist?.length === 0 && <ShopNow />}
      {loading && user?.myWishlist?.length > 0 && (
        <div className="flex w-[100%] h-[100%] justify-center mt-[100px] bg-opacity-50">
          <img
            src="https://www.bewakoof.com/images/bwkf-loader.gif"
            className="h-[270px] w-[270px] justify-center"
          />
        </div>
      )}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[200px]">
        {wishlistedItems.map((item) => (
          <div className="w-[270px] h-[460px]" key={item._id}>
            {/* Product Image Section */}
            <div className="w-[270px] h-[270px] bg-gray-100 flex justify-center items-center relative">
              {item.topTag && (
                <div
                  className="absolute top-0 left-0 p-2 w-auto h-auto text-xs font-bold text-white uppercase"
                  style={{
                    backgroundColor:
                      item.topTag === "BUY 3 FOR"
                        ? "green"
                        : item.topTag === "SALE"
                        ? "red"
                        : "gray",
                  }}
                >
                  {item.topTag === "BUY 3 FOR" ? (
                    <>
                      <span className="uppercase">{item.topTag}</span>
                      <span>{` ₹${item.oprice * 3 - 100}`}</span>
                    </>
                  ) : (
                    item.topTag
                  )}
                </div>
              )}
              <Link to={`/p/${item.info}`} key={item._id}>
                <img
                  src={item.image1}
                  className="h-[270px] w-[270px] object-cover"
                  alt={item.info}
                  onError={(e) => {
                    e.target.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFAP-fHSPTb5yLxrT9nlDKdUVPMM_xjCdCxw&s";
                    e.target.style.height = "150px";
                    e.target.style.width = "160px";
                  }}
                />
              </Link>
            </div>

            {/* Product Details Section */}
            <div className="w-[270px] h-[140px] border-[0.5px] border-gray-200 overflow-hidden">
              <div className=" w-[270px] h-[100px] ml-2">
                <div className="inline-flex justify-between w-[400px]">
                  <div className="inline-block text-black font-bold text-10">
                    {item.brand}
                  </div>
                </div>

                <div className="block text-gray-600 w-[267px] truncate">
                  {item.description}
                </div>
                <div className="inline-flex gap-2">
                  <div className="text-black font-bold">₹{item.oprice}</div>
                  {item.price !== item.oprice && (
                    <div className="text-gray-500 relative">
                      <div className="absolute top-1/2 left-0 right-0 border-b-2 border-gray-500 z-10"></div>
                      ₹{item.price}
                    </div>
                  )}
                  {item.price !== item.oprice && (
                    <div className="text-green-500">
                      {(
                        ((item.price - item.oprice) / item.price) *
                        100
                      ).toFixed(0)}
                      % OFF
                    </div>
                  )}
                </div>
                {item.bottomTag && (
                  <div className="block border-2 border-black text-xs text-gray-500 w-[180px] h-auto text-center mt-4">
                    {item.bottomTag}
                  </div>
                )}
              </div>
              <div className="w-[270px] border-t border-gray-200 flex mt-4">
                <div
                  className=" w-[40px] ml-2 border-r border-gray-400 "
                  onClick={() => handleRemoveFromWhishlist(item._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="cursor-pointer text-gray-400"
                  >
                    <path
                      fill="currentColor"
                      d="M3 6L5 6 5 21C5 21.55 5.45 22 6 22H18C18.55 22 19 21.55 19 21V6L21 6C21.55 6 22 5.55 22 5C22 4.45 21.55 4 21 4H3C2.45 4 2 4.45 2 5C2 5.55 2.45 6 3 6ZM6 6L6 20H18V6H6Z"
                    />
                  </svg>
                </div>
                <button
                  className="w-[180px] text-center text-blue-600"
                  onClick={() => handleGoToBag(item._id, item.productQty)}
                >
                  ADD TO BAG
                </button>
              </div>
            </div>

            {/* Size Selection Modal */}
            {openSizeContainers[item._id] && sizes.length > 0 && (
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ">
                <div className="w-[500px] h-60 border-2 border-gray-500 p-6 bg-white rounded-md">
                  <div className="flex justify-between mb-4">
                    <h1 className="font-semibold">Choose your perfect fit!</h1>
                    <button
                      className="text-gray-500 ml-4"
                      onClick={() => handleCloseSizeContainer(item._id)}
                    >
                      X
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-gray-300 mb-4"></div>

                  <div className="grid grid-cols-8 gap-4 w-full m-4 pt-2">
                    {sizes.map((size) => (
                      <button
                        className="flex flex-col items-center justify-center border-[0.5px] p-2 rounded-md"
                        style={{
                          color:
                            size.quantity < 5
                              ? "rgb(234,33,35)"
                              : size.quantity === 0
                              ? "rgb(200,200,200)"
                              : "rgb(54,53,55)",
                          borderColor:
                            size.quantity < 5
                              ? "rgb(234,33,35)"
                              : size.quantity === 0
                              ? "rgb(200,200,200)"
                              : "rgb(54,53,55)",
                          cursor: size.quantity === 0 ? "none" : "pointer",
                          backgroundColor:
                            selectedSizes[item._id] === size.size
                              ? "rgb(255,210,50)"
                              : "white",
                        }}
                        key={size.size}
                        onClick={() => handleSelectSize(item._id, size)}
                      >
                        {/* Size Button */}
                        <span className="text-sm">{size.size}</span>

                        {/* Quantity Text Below */}
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
                        backgroundColor: selectedSizes[item._id]
                          ? "rgb(255,210,50)"
                          : "rgb(227,229,233)",
                        color: selectedSizes[item._id]
                          ? "black"
                          : "rgb(157,165,180)",
                      }}
                      onClick={() => handleSizeConfirm(item._id)}
                    >
                      CONFIRM
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {notification.length > 0 && (
        <div className="fixed bottom-0 left-1/2 w-[300px] bg-green-700 text-white py-2 px-4 flex items-center justify-center rounded-md mb-6">
          <svg
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 9v3m0 0v3m0-3h3m-3 0h-3M12 3a9 9 0 1 0 9 9A9 9 0 0 0 12 3z" />
          </svg>
          {notification === "Item removed from wishlist"
            ? "Product Has Been Successfully Removed From Wishlist"
            : "Product Added To Bag"}
        </div>
      )}
    </div>
  );
};

export default Items;
