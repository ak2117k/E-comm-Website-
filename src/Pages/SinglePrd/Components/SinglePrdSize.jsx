import React, { useState } from "react";
import SinglePrdBag from "./SinglePrdBag";

const SinglePrdSize = (SingleProduct) => {
  const [sizeviewGuide, setsizeviewGuide] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeDimensions, setSelectedSizeDimensions] = useState(null);

  const sizeKey = Object.keys(SingleProduct.singleProduct).find((key) =>
    key.includes("Sizes")
  );
  const sizeValue = sizeKey ? SingleProduct.singleProduct[sizeKey] : null;

  const productCategory = SingleProduct.singleProduct.category;

  function handleSelectSize(size) {
    if (sizeValue[size] === 0) return;
    const dimensions = {
      Bust: "N/A",
      "Front Length": "N/A",
      "Sleeve Length": "N/A",
      "Waist (inches)": "N/A",
      "Outseam Length (inches)": "N/A",
    };

    if (
      productCategory === "jeans" ||
      productCategory === "joggers" ||
      productCategory === "pants"
    ) {
      switch (size) {
        case "S":
          dimensions["Waist (inches)"] = "28";
          dimensions["Outseam Length (inches)"] = "39.5";
          break;
        case "M":
          dimensions["Waist (inches)"] = "30";
          dimensions["Outseam Length (inches)"] = "40.5";
          break;
        case "L":
          dimensions["Waist (inches)"] = "32";
          dimensions["Outseam Length (inches)"] = "41.0";
          break;
        case "XL":
          dimensions["Waist (inches)"] = "34";
          dimensions["Outseam Length (inches)"] = "41.5";
          break;
        case "2XL":
          dimensions["Waist (inches)"] = "36";
          dimensions["Outseam Length (inches)"] = "42.0";
          break;
        default:
          break;
      }
    } else {
      switch (size) {
        case "XS":
          dimensions.Bust = "38.0";
          dimensions["Front Length"] = "26.0";
          dimensions["Sleeve Length"] = "5.25";
          break;
        case "S":
          dimensions.Bust = "40.0";
          dimensions["Front Length"] = "27.0";
          dimensions["Sleeve Length"] = "5.5";
          break;
        case "M":
          dimensions.Bust = "42.0";
          dimensions["Front Length"] = "27.0";
          dimensions["Sleeve Length"] = "5.75";
          break;
        case "L":
          dimensions.Bust = "44.0";
          dimensions["Front Length"] = "28.0";
          dimensions["Sleeve Length"] = "6.0";
          break;
        case "XL":
          dimensions.Bust = "46.0";
          dimensions["Front Length"] = "28.0";
          dimensions["Sleeve Length"] = "6.25";
          break;
        case "2XL":
          dimensions.Bust = "48.0";
          dimensions["Front Length"] = "29.0";
          dimensions["Sleeve Length"] = "6.5";
          break;
        default:
          break;
      }
    }

    setSelectedSize(size);
    setSelectedSizeDimensions(dimensions);
  }

  function handleSizeGuideView() {
    setsizeviewGuide(true);
    window.history.pushState(null, "", "#size");
  }

  function handleCloseSizeGuide() {
    setsizeviewGuide(false);
    window.history.replaceState(null, "", window.location.pathname);
  }
  const sizeStock = Object.keys(sizeValue).reduce((acc, size) => {
    const stock = sizeValue[size];
    if (stock > 0) {
      acc[size] = stock;
    }
    return acc;
  }, {});

  const Product = { ...SingleProduct.singleProduct };
  console.log(Product);

  return (
    <div className="w-full h-auto mt-6">
      <div className="flex justify-between w-full h-auto ">
        <div className="inline-flex text-[16px] tracking-wider">
          Select Size
        </div>
        <button
          className="text-teal-600 inline-flex cursor-pointer text-[14px] font-semibold"
          onClick={handleSizeGuideView}
        >
          SIZE GUIDE
        </button>
      </div>
      <div className="inline-flex gap-2 mt-2">
        {sizeValue &&
          Object.keys(sizeValue).map((key) => {
            const sizeStock = sizeValue[key];
            let borderColor = "black";
            let stockText = null;

            if (sizeStock === 0) {
              borderColor = "gray";
              stockText = "";
            } else if (sizeStock < 3) {
              borderColor = "red";
              stockText = `${sizeStock} left`;
            }

            return (
              <div key={key} className="flex flex-col items-center">
                <div
                  className={`inline-flex w-[45px] h-[34px] rounded-md border-[1px] justify-center items-center cursor-pointer ${
                    sizeStock === 0 ? "cursor-not-allowed" : ""
                  } ${selectedSize === key ? "bg-yellow-400" : ""}`}
                  style={{
                    borderColor: borderColor,
                    color: "black",
                  }}
                  onClick={() => handleSelectSize(key)}
                >
                  <span>{key}</span>
                </div>
                {stockText && (
                  <h3
                    className={`text-xs mt-1 ${
                      borderColor === "red" ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    {stockText}
                  </h3>
                )}
              </div>
            );
          })}
      </div>

      {selectedSize && selectedSizeDimensions && (
        <div className="mt-2">
          <p className="text-sm font-medium">
            {productCategory === "jeans" ||
            productCategory === "joggers" ||
            productCategory === "pants" ? (
              <>
                {`Waist: ${selectedSizeDimensions["Waist (inches)"]} | Outseam Length: ${selectedSizeDimensions["Outseam Length (inches)"]}`}
              </>
            ) : (
              <>
                {`Bust: ${selectedSizeDimensions.Bust} | Front Length: ${selectedSizeDimensions["Front Length"]} | Sleeve Length: ${selectedSizeDimensions["Sleeve Length"]}`}
              </>
            )}
          </p>
        </div>
      )}

      <div className="flex justify-between w-full bg-cyan-50 h-[50px] text-center items-center mt-8 p-2 font-semibold">
        <div className="text-teal-600 ">Couldn't find Your Size?</div>
        <div className="inline-flex items-center ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            className="cursor-pointer"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9v5c0 1.1-.9 2-2 2s-2 .9-2 2h16c0-1.1-.9-2-2-2s-2-.9-2-2V9c0-3.87-3.13-7-7-7zm0 18c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" />
          </svg>
        </div>
      </div>

      {sizeviewGuide && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div
            className="w-[350px] h-auto overflow-y-auto bg-white p-4 rounded-lg relative"
            tabIndex="-1"
            autoFocus
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseSizeGuide}
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
            <div className="w-full h-auto text-center">
              {productCategory === "jeans" ||
              productCategory === "joggers" ||
              productCategory === "pants" ? (
                <img
                  className="max-w-[200px]"
                  src="https://images.bewakoof.com/sizeguide/men_fleece_joggers-1484026100.jpg"
                  alt="Size Guide for Pants, Jeans, Joggers"
                />
              ) : (
                <img
                  className="max-w-[200px]"
                  src="https://images.bewakoof.com/sizeguide/women_tshirts-1484026437.jpg"
                  alt="Size Guide for Tops, Dresses"
                />
              )}
              <table className="table-auto w-full border-collapse mt-4">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Size</th>
                    <th className="border px-2 py-1">Bust</th>
                    <th className="border px-2 py-1">Front Length</th>
                    <th className="border px-2 py-1">Sleeve Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1">XS</td>
                    <td className="border px-2 py-1">38.0</td>
                    <td className="border px-2 py-1">26.0</td>
                    <td className="border px-2 py-1">5.25</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">S</td>
                    <td className="border px-2 py-1">40.0</td>
                    <td className="border px-2 py-1">27.0</td>
                    <td className="border px-2 py-1">5.5</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">M</td>
                    <td className="border px-2 py-1">42.0</td>
                    <td className="border px-2 py-1">27.0</td>
                    <td className="border px-2 py-1">5.75</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">L</td>
                    <td className="border px-2 py-1">44.0</td>
                    <td className="border px-2 py-1">28.0</td>
                    <td className="border px-2 py-1">6.0</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">XL</td>
                    <td className="border px-2 py-1">46.0</td>
                    <td className="border px-2 py-1">28.0</td>
                    <td className="border px-2 py-1">6.25</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">2XL</td>
                    <td className="border px-2 py-1">48.0</td>
                    <td className="border px-2 py-1">29.0</td>
                    <td className="border px-2 py-1">6.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <SinglePrdBag
        Product={Product}
        sizeStock={sizeStock}
        Size={selectedSize}
        setSize={setSelectedSize}
      />
    </div>
  );
};

export default SinglePrdSize;
