import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaArrowUp } from "react-icons/fa";
import { addUser } from "../../../Storee/User";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductContainer = ({ fetchProducts, loaderRef, filters }) => {
  const products = useSelector((state) => state.product.data);
  console.log("Total Products", products.length);
  const productsCount = useSelector((state) => state.product.totalProducts);
  const categories = useSelector((state) => state.product.category);
  const user = useSelector((state) => state.user.user);
  const [page, setPage] = useState(1);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoadingMore, setIsLoadingMore] = useState(false); // Track loading state for infinite scroll
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [notification, setNotification] = useState("");

  const containerRef = useRef(null);
  let scrollPosition = null;

  const handleScroll = () => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight; // Get the height of the container
      const scrollHeight = containerRef.current.scrollHeight; // Total height of the content inside the container
      const scrollTop = containerRef.current.scrollTop; // Current scroll position

      // Check if we are at the bottom of the container
      const isBottom = scrollHeight - scrollTop - containerHeight <= 200;

      if (isBottom && products.length < productsCount && !isLoadingMore) {
        console.log("Incrementing Page");
        setIsLoadingMore(true);
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handleTopScroll = () => {
    scrollPosition = containerRef.current.scrollTop;
    if (scrollPosition > 10) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  useEffect(() => {
    if (page > 1) {
      console.log(page);
      fetchProducts(page, filters).then(() => {
        setIsLoadingMore(false); // Reset loading state after data is fetched
      });
    }
  }, [dispatch, page, filters]);

  function handleBackToTop() {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  const handleWishlist = async (productId) => {
    if (!user) navigate("/login");
    try {
      const result = await axios.put(
        "http://localhost:3000/users/profile/update/wishlist",
        JSON.stringify({
          productId: productId,
          userId: user?._id,
        }),
        {
          headers: {
            "Content-Type": "application/json", // Common header for JSON requests
          },
        }
      );

      // Optionally handle the result if needed
      if (result.status === 200) {
        await setNotification(result.data.message);
        await dispatch(addUser(result.data.result));
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

  if (user) console.log(user);
  return (
    <div
      className="h-full overflow-y-auto scrollbar-none"
      ref={containerRef}
      onScroll={handleScroll}
    >
      <div className="">
        <h2 className="text-gray-600">
          {location.pathname
            .split("/")
            .pop()
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")}{" "}
          {productsCount} Products{" "}
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-2ml-2 mt-2">
        {products.map((item) => (
          <div className="w-[360px] h-[685px]" key={item?._id}>
            {/* Product Image Section */}
            <div className="w-[360px] h-[550px] bg-gray-100 flex justify-center items-center relative">
              {item?.topTag && (
                <div
                  className="absolute top-0 left-0 p-2 text-xs font-bold text-white uppercase"
                  style={{
                    backgroundColor:
                      item?.topTag === "BUY 3 FOR"
                        ? "green"
                        : item?.topTag === "SALE"
                        ? "red"
                        : "gray",
                  }}
                >
                  {item?.topTag === "BUY 3 FOR" ? (
                    <>
                      <span className="uppercase">{item?.topTag}</span>
                      <span>{` ₹${item.oprice * 3 - 100}`}</span>
                    </>
                  ) : (
                    item?.topTag
                  )}
                </div>
              )}
              <Link
                to={`/p/${item?.info
                  ?.split(" ")
                  ?.map((w) => w.trim())
                  ?.join("-")}`}
                key={item?._id}
              >
                <img
                  src={item?.image1}
                  className="h-[550px] w-[360px] object-cover"
                  alt={item?.info}
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
            <div className="Details w-[360px] h-[100px] ml-2">
              <div className="flex justify-between">
                <span className="text-black font-bold text-sm">
                  {item?.brand}
                </span>
                <div
                  className="cursor-pointer"
                  onClick={() => handleWishlist(item?._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                    style={{
                      fill: user?.myWishlist?.some((p) => p._id === item._id)
                        ? "rgb(219,58,52)"
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
                </div>
              </div>
              <p className="text-gray-600 truncate">{item?.description}</p>
              <div className="flex gap-2">
                <span className="text-black font-bold">₹{item?.oprice}</span>
                {item.price !== item?.oprice && (
                  <span className="relative text-gray-500">
                    <span className="absolute top-1/2 left-0 right-0 border-b-2 border-gray-500"></span>
                    ₹{item?.price}
                  </span>
                )}
                {item?.price !== item?.oprice && (
                  <span className="text-green-500">
                    {(
                      ((item?.price - item?.oprice) / item?.price) *
                      100
                    ).toFixed(0)}
                    % OFF
                  </span>
                )}
              </div>
              {item?.bottomTag && (
                <div className="mt-4 border-2 border-black text-xs text-gray-500 text-center">
                  {item?.bottomTag}
                </div>
              )}
            </div>
          </div>
        ))}
        {showBackToTop && (
          <button
            className="absolute z-100 top-[400px] left-[1450px]"
            onClick={handleBackToTop}
          >
            <span className="">
              <span className="flex items-center justify-center">
                <FaArrowUp />
              </span>
              <span className="flex items-center justify-center">Top</span>
            </span>
          </button>
        )}
      </div>
      {products.length < productsCount && products.length > 0 && (
        <div
          ref={loaderRef}
          style={{ height: "70px", marginBottom: "50px" }}
          className="border-2 border-red-300"
        >
          {isLoadingMore && (
            <div className="flex h-[70px] justify-center mt-[2px] bg-opacity-50 items-center">
              <img
                src="https://www.bewakoof.com/images/bwkf-loader.gif"
                className="h-[50px] w-[50px] justify-center"
              />
            </div>
          )}
        </div>
      )}
      {notification.length > 0 && (
        <div
          className="fixed bottom-0 left-1/2 w-[300px] text-white py-2 px-4 flex items-center justify-center rounded-md mb-6"
          style={{
            backgroundColor:
              notification === "Item added to wishlist" ? "green" : "red",
          }}
        >
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
          {notification}
        </div>
      )}
    </div>
  );
};

export default ProductContainer;
