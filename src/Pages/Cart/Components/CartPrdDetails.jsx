import React from "react";
import { useState } from "react";

const CartPrdDetails = ({
  Product,
  currentProduct,
  setCurrentProduct,
  currentSize,
  setCurrentSize,
  currentQty,
  setCurrentQty,
  setfilterProducts,
  filterProducts,
  index,
}) => {
  const [isSizeContOpen, setisSizeContOpen] = useState(false);
  const [isQtyContOpen, setisQtyContOpen] = useState(false);

  let sizeValue;
  let sizeKey;
  if (currentProduct) {
    sizeKey = Object?.keys(currentProduct).find((key) => key.includes("Sizes"));
    sizeValue = currentProduct[sizeKey];
  }

  function handleOpenSizeCont(Product) {
    setisSizeContOpen(true);
    setCurrentProduct(Product);
  }

  function handleOpenQtyCotainer() {
    if (currentSize === "") setCurrentSize(Product.Size);
    setisQtyContOpen(true);
    setCurrentProduct(Product);
  }

  function handleCloseSizeCont() {
    setisSizeContOpen(false);
  }

  function handleCloseQtyCont() {
    setisQtyContOpen(false);
  }

  function handlesizeClick(size) {
    if (sizeValue[size] === 0) return;
    setCurrentSize(size);
  }
  function handleQtyClick(Qty) {
    if (sizeValue[currentSize] === 0 || Qty > sizeValue[currentSize]) return;
    setCurrentQty(Qty);
  }

  function handleSaveSizeChanges() {
    const UpdatedProduct = { ...Product, Size: currentSize, Qty: currentQty };
    const UpdatedProductList = [...filterProducts];
    UpdatedProductList[index] = UpdatedProduct;
    setfilterProducts(UpdatedProductList);
    setisSizeContOpen(false);
  }

  function handleSaveQtyChanges() {
    const UpdatedProduct = { ...Product, Size: currentSize, Qty: currentQty };
    const UpdatedProductList = [...filterProducts];
    UpdatedProductList[index] = UpdatedProduct;
    setfilterProducts(UpdatedProductList);
    setisQtyContOpen(false);
  }

  return (
    <div className=" w-full pr-1 pt-1">
      <div className="flex justify-between">
        <h3 className="text-sm font-semibold">{Product.brand}</h3>
        <div className="text-gray-500 font-semibold">X</div>
      </div>
      <div className="text-gray-400 text-xs font-semibold">{Product.info}</div>
      <div className="flex items-center text-gray-400 text-sm mt-2">
        <span className="flex items-center justify-center w-[14px] h-[14px] bg-green-200 text-green-500 rounded-full text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M1 6l4 4L9 3" />
          </svg>
        </span>
        ships within a few days
      </div>
      <div className="w-40 flex gap-2 mt-12">
        <div className="w-1/2 flex items-center justify-center rounded-sm bg-blue-100 text-xs font-bold">
          <span className="text-blue-400">Size :</span>
          <span className="">{Product.Size}</span>
          <span
            className="flex items-center justify-center text-blue-400 cursor-pointer"
            onClick={() => handleOpenSizeCont(Product)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </span>{" "}
        </div>
        <div className="w-1/2 flex items-center justify-center rounded-sm bg-blue-100 text-xs font-bold">
          <span className="text-blue-400">Qty :</span>
          <span className="">{Product.Qty}</span>
          <span
            className="flex items-center justify-center text-blue-400 cursor-pointer "
            onClick={() => handleOpenQtyCotainer(Product)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </span>{" "}
        </div>
      </div>
      {isSizeContOpen && currentProduct && (
        <div className="h-60 w-80">
          <div className="w-full flex p-2 items-center justify-between border-b border-gray-300">
            <span className="font-semibold">Choose your perfect fit!</span>
            <span
              className="text-gray-400 text-md cursor-pointer"
              onClick={handleCloseSizeCont}
            >
              x
            </span>
          </div>
          <div className="flex gap-4">
            {Object.keys(sizeValue).map((key) => (
              <div
                className="h-10 w-40 rounded-md border-[1px]  flex items-center justify-center"
                key={key}
                onClick={() => handlesizeClick(key)}
                style={{
                  backgroundColor:
                    sizeValue[key] === 0
                      ? "gray"
                      : currentSize === key
                      ? "rgb(255, 210, 50)"
                      : "white",
                  borderColor:
                    sizeValue[key] < 3 && sizeValue[key] !== 0
                      ? "red"
                      : sizeValue[key] === 0
                      ? "none"
                      : "black",
                }}
              >
                <span
                  className="block"
                  style={{
                    cursor: sizeValue[key] === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  {key}
                </span>
                {sizeValue[key] < 3 && sizeValue[key] !== 0 && (
                  <span className="text-xs text-red-500 block">{`${sizeValue[key]} left`}</span>
                )}
              </div>
            ))}
          </div>
          <div className=""></div>
          <button
            className="bg-yellow-500 w-full text-center mt-6 font-semibold"
            onClick={handleSaveSizeChanges}
          >
            CONFIRM
          </button>
        </div>
      )}

      {isQtyContOpen && currentProduct && currentSize && (
        <div className="h-60 w-80">
          <div className="w-full flex p-2 items-center justify-between border-b border-gray-300">
            <span className="font-semibold">Select Quantity</span>
            <span
              className="text-gray-400 text-md cursor-pointer"
              onClick={handleCloseQtyCont}
            >
              x
            </span>
          </div>
          <div className="grid grid-cols-7 gap-4">
            {[...Array(10).keys()].map((num) => (
              <div
                key={num}
                className="flex items-center justify-center "
                onClick={() => handleQtyClick(num + 1)}
                style={{
                  backgroundColor:
                    num + 1 > sizeValue[currentSize]
                      ? "gray"
                      : num + 1 === currentQty
                      ? "rgb(255, 210, 50)"
                      : "white",
                  cursor:
                    num + 1 > sizeValue[currentSize]
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {" "}
                {num + 1}
              </div>
            ))}
          </div>
          <button
            className="bg-yellow-500 w-full text-center mt-6 font-semibold"
            onClick={handleSaveQtyChanges}
          >
            CONFIRM
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPrdDetails;
