import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProducts, resetData, storeSingleProduct } from "../Storee/Data";
import { addtoWishlist, removefromWishlist } from "../Storee/WishlistSlice";
import { addUser } from "../Storee/User";
import axios from "axios";
const ClientPage = () => {
  const wishlistProducts = useSelector((state) => state.wishlist);
  const [filters, setFilters] = useState({
    brands: [],
    color: [],
    price: [],
  });
  const [seeMore, setseeMore] = useState({
    brand: false,
    color: false,
  });
  const [wishlistNotification, setWishlistNotification] = useState("");

  const dispatch = useDispatch();
  const loader = useSelector((state) => state.data.isLoading);
  const routeParams = useParams();
  const user = useSelector((state) => state.user.user);

  console.log(routeParams);

  useEffect(() => {
    dispatch(resetData());
    let gender = "";
    let category = "";
    let price;

    if (routeParams.description) {
      gender = routeParams.description.split(" ")[0];
      category = routeParams.description.split(" ")[1];
    } else {
      if (routeParams.category === "men" || routeParams.category === "women") {
        gender = routeParams.category;
      } else if (
        routeParams.category !== "men" &&
        routeParams.category !== "women" &&
        routeParams.category !== "Offer" &&
        routeParams.category !== "Buy 2 at 999" &&
        routeParams.category !== "Best Seller"
      ) {
        category = routeParams.category;
      } else {
        if (routeParams.category === "Offer") {
          price = 690;
        } else if (routeParams.category === "Buy 2 at 999") {
          price = 390;
        } else if (routeParams.category === "Deal of the Week") {
          price = 1690;
        } else if (routeParams.category === "Best Seller") {
          price = 590;
        } else {
          category = routeParams.category;
        }
      }
    }
    dispatch(
      getProducts({
        gender,
        category,
        price,
        page: 1,
        limit: 100,
        sortBy: "price",
        order: "asc",
      })
    );
  }, [routeParams, dispatch]);

  const updatedProducts = useSelector((state) => state.data.data);

  const allbrands = [
    ...new Set(updatedProducts.map((product) => product.brand)),
  ];
  const allcolors = [
    ...new Set(updatedProducts.map((product) => product.color)),
  ];

  function handleFilterChange(type, value) {
    setFilters((prevState) => {
      const updatedFilters = { ...filters };
      if (type === "brand") {
        const updatedBrands = prevState.brands.includes(value)
          ? prevState.brands.filter((item) => item !== value)
          : [...prevState.brands, value];
        updatedFilters.brands = updatedBrands;
      } else if (type === "color") {
        const updatedColor = prevState.color.includes(value)
          ? prevState.color.filter((item) => item !== value)
          : [...prevState.color, value];
        updatedFilters.color = updatedColor;
      }

      return updatedFilters;
    });
  }
  const filteredProducts = updatedProducts.filter((product) => {
    const matchedbrand =
      filters.brands.length === 0 || filters.brands.includes(product.brand);
    const matchedcolors =
      filters.color.length === 0 || filters.color.includes(product.color);
    return matchedbrand && matchedcolors;
  });

  function handleseeMoreStatus(section) {
    setseeMore((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  }

  function handleaddSingleProduct(item) {
    dispatch(storeSingleProduct(item));
  }

  const handleWishlist = async (productId) => {
    console.log(productId);
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

  return (
    <div>
      {loader && (
        <div className="flex w-[100%] h-[100%] justify-center mt-[100px] bg-opacity-50">
          <img
            src="https://www.bewakoof.com/images/bwkf-loader.gif"
            className="h-[270px] w-[270px] justify-center"
          />
        </div>
      )}
      {!loader && (
        <div className="mt-4 flex w-full h-[1370px]">
          <div className="w-1/4 p-4 border-gray-300 overflow-y-auto h-[700px] scrollbar-none">
            <h3 className="text-xl font-semibold mb-4 inline-block">Filters</h3>
            {(filters.brands.length > 0 || filters.color.length > 0) && (
              <button className="inline-block text-blue-400">Clear All</button>
            )}
            <div className="mb-2 mt-4">
              <div className="w-[100%] text-black text-lg border-b border-gray-200 mt-4"></div>
              <h4 className="font-semibold mb-2">Brand</h4>
              {allbrands.slice(0, 4).map((brand) => (
                <label key={brand} className="block">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleFilterChange("brand", brand)}
                  />
                  {brand}
                </label>
              ))}
              {allbrands.length > 4 && !seeMore.brand && (
                <button
                  className="block"
                  onClick={() => handleseeMoreStatus("brand")}
                >
                  {" "}
                  SeeMore
                </button>
              )}
              {seeMore.brand &&
                allbrands.slice(4, allbrands.length).map((brand) => (
                  <label key={brand} className="block">
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => handleFilterChange("brand", brand)}
                    />
                    {brand}
                  </label>
                ))}
              {allbrands.length > 4 && seeMore.brand && (
                <button
                  className="block"
                  onClick={() => handleseeMoreStatus("brand")}
                >
                  SeeLess
                </button>
              )}
            </div>

            <div className="w-[100%] text-black text-lg border-b border-gray-200 mt-4"></div>

            <div className="mb-4">
              {allcolors.map((color) => (
                <div
                  key={color}
                  className="
                "
                >
                  <label className="block">
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => handleFilterChange("color", color)}
                    />
                    <div
                      className={`inline-block w-4 h-4 border-2 rounded-md`}
                      style={{ backgroundColor: color }}
                    ></div>
                    {color}
                  </label>
                </div>
              ))}
            </div>

            <div className="w-[100%] text-black text-lg border-b border-gray-200 mt-4"></div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Size</h4>
              <label className="block">
                <input type="checkbox" className="mr-2" /> S
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> M
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> L
              </label>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="w-3/4">
              <div className="ml-2">
                <div className="inline-block">
                  <h2 className="text-black text-ms font-bold uppercase">
                    {filteredProducts[0]?.category} FOR{" "}
                    {filteredProducts[0]?.gender}
                  </h2>
                </div>
                <div className="inline-block">
                  <h3 className="text-gray-500">
                    {filteredProducts.length} Products
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-3 w-[1150px] h-full gap-2 overflow-y-auto ml-2 mt-2 scrollbar-none">
                {filteredProducts.map((item) => (
                  <div className="w-[360px] h-[685px] " key={item.id}>
                    <div className="w-[360px] h-[550px] bg-gray-100 flex justify-center items-center relative">
                      {item.toptag && (
                        <div
                          className="absolute top-0 left-0 p-2 w-auto h-auto text-xs font-bold text-white uppercase"
                          style={{
                            backgroundColor:
                              item.toptag === "BUY 3 FOR"
                                ? "Green"
                                : item.toptag === "SALE"
                                ? "Red"
                                : "Gray",
                          }}
                        >
                          {item.toptag === "BUY 3 FOR" ? (
                            <>
                              <div className="inline-flex uppercase">
                                {item.toptag}
                              </div>
                              <div className="inline-flex">{`₹${
                                item.oprice * 3 - 100
                              }`}</div>
                            </>
                          ) : (
                            item.toptag
                          )}
                        </div>
                      )}
                      <Link
                        to={`/products/${item.gender}/${item.category}/${item.id}`}
                        onClick={() => handleaddSingleProduct(item)}
                      >
                        <img
                          src={item.image1}
                          className="h-[550px] w-[360px] object-cover"
                          alt={item.name}
                          onError={(e) => {
                            e.target.src =
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFAP-fHSPTb5yLxrT9nlDKdUVPMM_xjCdCxw&s";
                            e.target.style.height = "150px";
                            e.target.style.width = "160px";
                          }}
                        />
                      </Link>
                    </div>
                    <div className="Details w-[360px] h-[100px] ml-2">
                      <div className="inline-flex justify-between w-[400px]">
                        <div className=" inline-block text-black font-bold text-10">
                          {item.brand}
                        </div>
                        <div className="inline-block  w-18 h-auto mt-[4px]">
                          <div className=" w-20  inline-flex cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-6 h-6"
                              style={{
                                fill: wishlistProducts?.wishlistedItems?.find(
                                  (product) => product.id === item.id
                                )
                                  ? "red"
                                  : "white",
                              }}
                              onClick={() => handleWishlist(item._id)}
                            >
                              <path
                                stroke="#303030"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M12 20S3 14.91 3 8.727c0-1.093.375-2.152 1.06-2.997a4.672 4.672 0 0 1 2.702-1.638 4.639 4.639 0 0 1 3.118.463A4.71 4.71 0 0 1 12 6.909a4.71 4.71 0 0 1 2.12-2.354 4.639 4.639 0 0 1 3.118-.463 4.672 4.672 0 0 1 2.701 1.638A4.756 4.756 0 0 1 21 8.727C21 14.91 12 20 12 20Z"
                              ></path>
                              <defs>
                                <clipPath id="header_icon_wishlist_svg__a">
                                  <path fill="#fff" d="M0 0h24v24H0z"></path>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="block text-gray-600 w-[360px] truncate">
                        {item.description}
                      </div>
                      <div className="inline-flex gap-2">
                        <div className="text-black font-bold">
                          ₹{item.oprice}
                        </div>
                        <div className="text-gray-500 relative">
                          <div className="absolute top-1/2 left-0 right-0 border-b-2 border-gray-500 z-10"></div>
                          ₹{item.price}
                        </div>
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
                      {item.bottomtag && (
                        <div className="block border-2 border-black text-xs text-gray-500 w-[180px] h-auto text-center mt-4">
                          {item.bottomtag}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-auto items-center">
              <img
                className=" w-[500px] h-auto object-cover"
                src="https://cdn.dribbble.com/users/3512533/screenshots/14168376/media/5176b477fc7aa3e30518bab34a4fc596.jpg"
              ></img>
            </div>
          )}
          {wishlistNotification && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-md shadow-lg">
              {wishlistNotification}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientPage;
