import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Components/Header";
import FreeDeliveryTag from "./Components/FreeDeliveryTag";
import Card from "./Components/Card";
import CouponsAndoffers from "./Components/CouponsAndoffers";
import PriceSummary from "./Components/PriceSummary";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addUser } from "../../Storee/User";
import axios from "axios";

const Index = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [openSizeContainers, setOpenSizeContainers] = useState({}); // Track open size containers per item
  const [selectedSizes, setSelectedSizes] = useState({}); // Track selected size for each item
  const [sizes, setSizes] = useState([]); // Sizes available for a specific product

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
        "http://localhost:3000/users/addToCart",
        JSON.stringify({
          userId: user._id,
          productId: productId,
          size: selectedSize,
          quantity: 1,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result1.status === 200 && result2.status === 200) {
        dispatch(addUser(result2.data.result));

        // Close the size container modal
        setOpenSizeContainers((prev) => ({
          ...prev,
          [productId]: false,
        }));
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
    <div className="w-[1350px]  ml-20">
      {user.myCart[0]?.items?.length > 0 && (
        <div className="">
          <Header />
        </div>
      )}

      {user.myCart[0]?.items?.length > 0 && (
        <div className="w-full flex gap-6 ">
          <div className=" w-[65%]">
            <div className="w-full ">
              <FreeDeliveryTag />
            </div>
            <div className="w-full">
              <Card />
            </div>
          </div>
          <div className="w-[42%]">
            <div className="">
              <CouponsAndoffers />
            </div>
            <div className="">
              <PriceSummary />
            </div>
          </div>
        </div>
      )}

      {user.myCart.length === 0 && (
        <div className="">
          <div className="">
            <div className="w-full flex justify-center">
              <img
                className="w-40 h-40"
                src="https://cdn.dribbble.com/userupload/22816832/file/original-0cbc2fab865568f97972a35fa2549b93.gif"
              ></img>
            </div>
            <p className="w-full flex text-center justify-center">
              Hey, your bag feels so light!
            </p>
            <p className="w-full flex text-center justify-center">
              {" "}
              Let’s add some items in your bag
            </p>
            <Link to="/" className="block w-full ml-80 cursor-pointer ">
              <button className="bg-[rgb(255,210,50)] text-black p-2 flex justify-center items-center rounded-md w-[40%] mt-20 ml-20">
                START SHOPPING
              </button>
            </Link>
          </div>
          {user?.myWishlist?.length > 0 && (
            <div className="mt-20">
              <h2 className="font-semibold">My Wishlist</h2>

              <div className="">
                {user?.myWishlist?.map((item) => (
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
                          <div className="text-black font-bold">
                            ₹{item.oprice}
                          </div>
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
                        {/* <div
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
                      </div> */}
                        <button
                          className="w-[180px] text-center text-blue-600"
                          onClick={() =>
                            handleGoToBag(item._id, item.productQty)
                          }
                        >
                          ADD TO BAG
                        </button>
                      </div>
                    </div>

                    {/* Size Selection Modal */}
                    {openSizeContainers[item._id] && sizes.length > 0 && (
                      <div className="absolute inset-0 flex justify-center items-end bg-black bg-opacity-50 z-50 h-auto">
                        <div className="w-[500px] h-60 border-2 border-gray-500 p-6 bg-white rounded-md mb-40">
                          <div className="flex justify-between mb-4">
                            <h1 className="font-semibold">
                              Choose your perfect fit!
                            </h1>
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
                                  cursor:
                                    size.quantity === 0 ? "none" : "pointer",
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
