import React from "react";
import { useSelector } from "react-redux";
import { add } from "../Storee/CartSlice";
import { removefromWishlist } from "../Storee/WishlistSlice";
import { useDispatch } from "react-redux";

const Waitlist = () => {
  const dispatch = useDispatch();
  function handleGoToBag(item) {
    dispatch(add(item));
    dispatch(removefromWishlist(item.id));
  }
  function handleRemoveFromWhishlist(item) {
    dispatch(removefromWishlist(item.id));
  }
  const products = useSelector((state) => state.wishlist);
  const uniqueProducts = products.reduce((acc, product) => {
    if (!acc.find((item) => item.id === product.id)) {
      acc.push(product);
    }
    return acc;
  }, []);

  const brands = products.reduce((acc, product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  return (
    <div className=" ml-40 mt-10">
      <h2 className="font-bold text-[22px] text-gray-600">
        My Wishlist
        <span className=" text-gray-600 font-light text-[16px] ml-2">
          {uniqueProducts.length > 0 ? `${uniqueProducts.length} items` : ""}
        </span>
      </h2>
      <div className=" mt-6 flex gap-4">
        {brands.map((brand) => (
          <div className="inline-flex h-[30px] w-[120px] text-center items-center justify-center border-[1px] border-gray-400 rounded-md text-gray-600">
            {brand}
          </div>
        ))}
      </div>
      <div className=" mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[200px]">
        {uniqueProducts.map((item) => (
          <div className="w-[290px] h-[470px]   " key={item.id}>
            <div className="w-[290px] h-[330px] bg-gray-100 flex justify-center items-center relative">
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
                      <div className="inline-flex uppercase">{item.toptag}</div>
                      <div className="inline-flex">{`₹${
                        item.oprice * 3 - 100
                      }`}</div>
                    </>
                  ) : (
                    item.toptag
                  )}
                </div>
              )}
              <div className="">
                <img
                  src={item.image1}
                  className="h-[330px] w-[290px] object-cover"
                  alt={item.name}
                  onError={(e) => {
                    e.target.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFAP-fHSPTb5yLxrT9nlDKdUVPMM_xjCdCxw&s";
                    e.target.style.height = "150px";
                    e.target.style.width = "160px";
                  }}
                />
              </div>
            </div>
            <div className="w-[290px] h-[140px] border-[0.5px] border-gray-200">
              <div className=" w-[290px] h-[100px] ml-2">
                <div className="inline-flex justify-between w-[400px]">
                  <div className=" inline-block text-black font-bold text-10">
                    {item.brand}
                  </div>
                </div>

                <div className="block text-gray-600 w-[285px] truncate">
                  {item.description}
                </div>
                <div className="inline-flex gap-2">
                  <div className="text-black font-bold">₹{item.oprice}</div>
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
              <div className="w-[290px] border-t border-gray-200 flex mt-4">
                <div
                  className=" w-[40px] ml-2 border-r border-gray-400 "
                  onClick={() => handleRemoveFromWhishlist(item)}
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
                  onClick={() => handleGoToBag(item)}
                >
                  ADD TO BAG
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Waitlist;
