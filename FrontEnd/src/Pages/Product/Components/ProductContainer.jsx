import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const ProductContainer = ({ fetchProducts, loaderRef, filters }) => {
  const products = useSelector((state) => state.product.data);
  const productsCount = useSelector((state) => state.product.totalProducts);
  const categories = useSelector((state) => state.product.category);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  console.log(products.length, products.length < productsCount);

  const handleScroll = () => {
    if (loaderRef.current) {
      const bottom = loaderRef.current.getBoundingClientRect().bottom;
      const isBottom = bottom <= window.innerHeight;
      if (isBottom && products.length < productsCount) {
        // Fetch the next page of products
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, products, productsCount]);

  useEffect(() => {
    if (page > 1) {
      // Fetch more products when the page number changes
      fetchProducts(page, filters);
    }
  }, [dispatch, page]);

  return (
    <div className="h-full  overflow-y-auto scrollbar-none">
      <div className="">
        <h2 className="text-gray-600">{productsCount} Products </h2>
      </div>

      <div className="grid grid-cols-3   gap-2ml-2 mt-2 ">
        {products.map((item) => (
          <Link to={`/p/${item.info}`} key={item._id}>
            <div className="w-[360px] h-[685px]">
              {/* Product Image Section */}
              <div className="w-[360px] h-[550px] bg-gray-100 flex justify-center items-center relative">
                {item.topTag && (
                  <div
                    className="absolute top-0 left-0 p-2 text-xs font-bold text-white uppercase"
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
                <img
                  src={item.image1}
                  className="h-[550px] w-[360px] object-cover"
                  alt={item.info}
                  onError={(e) => {
                    e.target.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFAP-fHSPTb5yLxrT9nlDKdUVPMM_xjCdCxw&s";
                    e.target.style.height = "150px";
                    e.target.style.width = "160px";
                  }}
                />
              </div>

              {/* Product Details Section */}
              <div className="Details w-[360px] h-[100px] ml-2">
                <div className="flex justify-between">
                  <span className="text-black font-bold text-sm">
                    {item.brand}
                  </span>
                  <div className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                      style={{ fill: "white" }}
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
                <p className="text-gray-600 truncate">{item.description}</p>
                <div className="flex gap-2">
                  <span className="text-black font-bold">₹{item.oprice}</span>
                  {item.price !== item.oprice && (
                    <span className="relative text-gray-500">
                      <span className="absolute top-1/2 left-0 right-0 border-b-2 border-gray-500"></span>
                      ₹{item.price}
                    </span>
                  )}
                  {item.price !== item.oprice && (
                    <span className="text-green-500">
                      {(
                        ((item.price - item.oprice) / item.price) *
                        100
                      ).toFixed(0)}
                      % OFF
                    </span>
                  )}
                </div>
                {item.bottomTag && (
                  <div className="mt-4 border-2 border-black text-xs text-gray-500 text-center">
                    {item.bottomTag}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {products.length < productsCount && products.length > 0 && (
        <div ref={loaderRef} style={{ height: "30px", marginTop: "20px" }}>
          {/* <div className="flex h-[30px] justify-center mt-[100px] bg-opacity-50">
            <img
              src="https://www.bewakoof.com/images/bwkf-loader.gif"
              className="h-[270px] w-[270px] justify-center"
            />
          </div> */}
          <p>Loading more products...</p>
        </div>
      )}
    </div>
  );
};

export default ProductContainer;
