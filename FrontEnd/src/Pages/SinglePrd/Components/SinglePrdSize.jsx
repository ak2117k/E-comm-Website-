import React, { useState } from "react";
import SinglePrdBag from "./SinglePrdBag";

const SinglePrdSize = ({ singleProduct }) => {
  const [sizeGuideVisible, setSizeGuideVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeDimensions, setSelectedSizeDimensions] = useState(null);

  // Extract sizes and quantities from product data
  const sizeStock = extractSizeStock(singleProduct.productQty);
  const productCategory = singleProduct.category;

  // Handle size selection
  const handleSelectSize = (size) => {
    const dimensions = getSizeDimensions(size, productCategory);
    setSelectedSize(size);
    setSelectedSizeDimensions(dimensions);
  };

  // Handle showing the size guide
  const handleSizeGuideView = () => {
    setSizeGuideVisible(true);
    window.history.pushState(null, "", "#size");
  };

  // Handle closing the size guide
  const handleCloseSizeGuide = () => {
    setSizeGuideVisible(false);
    window.history.replaceState(null, "", window.location.pathname);
  };

  return (
    <div className="w-full h-auto mt-6">
      <Header onSizeGuideClick={handleSizeGuideView} />
      <SizeSelector
        sizeStock={sizeStock}
        selectedSize={selectedSize}
        onSizeSelect={handleSelectSize}
      />
      {selectedSize && selectedSizeDimensions && (
        <SizeDimensionsDisplay
          category={productCategory}
          dimensions={selectedSizeDimensions}
        />
      )}
      <StockAvailability sizeStock={sizeStock} />
      {sizeGuideVisible && <SizeGuide onClose={handleCloseSizeGuide} />}
      <SinglePrdBag
        Product={singleProduct}
        sizeStock={sizeStock}
        Size={selectedSize}
        setSize={setSelectedSize}
      />
    </div>
  );
};

// Header with size guide link
const Header = ({ onSizeGuideClick }) => (
  <div className="flex justify-between w-full h-auto">
    <div className="inline-flex text-[16px] tracking-wider">Select Size</div>
    <button
      className="text-teal-600 inline-flex cursor-pointer text-[14px] font-semibold"
      onClick={onSizeGuideClick}
    >
      SIZE GUIDE
    </button>
  </div>
);

// Size Selector component
const SizeSelector = ({ sizeStock, selectedSize, onSizeSelect }) => (
  <div className="inline-flex gap-2 mt-2">
    {Object.keys(sizeStock).map((size) => (
      <SizeOption
        key={size}
        size={size}
        stock={sizeStock[size]}
        isSelected={selectedSize === size}
        onSelect={() => onSizeSelect(size)}
      />
    ))}
  </div>
);

// Size Option component
const SizeOption = ({ size, stock, isSelected, onSelect }) => {
  const borderColor = getBorderColor(stock);
  const stockText = stock === 0 ? "" : stock < 3 ? `${stock} left` : null;

  return (
    <div className="flex flex-col items-center">
      <div
        className={`inline-flex w-[45px] h-[34px] rounded-md border-[1px] justify-center items-center cursor-pointer ${
          stock === 0 ? "cursor-not-allowed" : ""
        } ${isSelected ? "bg-yellow-400" : ""}`}
        style={{ borderColor }}
        onClick={onSelect}
      >
        <span>{size}</span>
      </div>
      {stockText && <StockText stockText={stockText} />}
    </div>
  );
};

// Stock text component
const StockText = ({ stockText }) => (
  <h3
    className={`text-xs mt-1 ${
      stockText.includes("left") ? "text-red-500" : "text-gray-400"
    }`}
  >
    {stockText}
  </h3>
);

// Get the border color based on stock
const getBorderColor = (stock) => {
  if (stock === 0) return "gray";
  if (stock < 3) return "red";
  return "black";
};

// Display size dimensions based on selected size
const SizeDimensionsDisplay = ({ category, dimensions }) => {
  const dimensionText =
    category === "jeans" || category === "joggers" || category === "pants"
      ? `Waist: ${dimensions["Waist (inches)"]} | Outseam Length: ${dimensions["Outseam Length (inches)"]}`
      : `Bust: ${dimensions.Bust} | Front Length: ${dimensions["Front Length"]} | Sleeve Length: ${dimensions["Sleeve Length"]}`;

  return (
    <div className="mt-2">
      <p className="text-sm font-medium">{dimensionText}</p>
    </div>
  );
};

// Display availability of stock for the selected size
const StockAvailability = ({ sizeStock }) => (
  <div className="flex justify-between w-full bg-cyan-50 h-[50px] text-center items-center mt-8 p-2 font-semibold">
    <div className="text-teal-600">Couldn't find Your Size?</div>
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
);

// Size Guide Modal
const SizeGuide = ({ onClose }) => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <div
      className="w-[350px] h-auto overflow-y-auto bg-white p-4 rounded-lg relative"
      tabIndex="-1"
      autoFocus
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={onClose}
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
        <img
          className="max-w-[200px]"
          src="https://images.bewakoof.com/sizeguide/men_fleece_joggers-1484026100.jpg"
          alt="Size Guide"
        />
        <SizeGuideTable />
      </div>
    </div>
  </div>
);

// Render the size guide table
const SizeGuideTable = () => (
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
      {["XS", "S", "M", "L", "XL", "2XL"].map((size) => (
        <tr key={size}>
          <td className="border px-2 py-1">{size}</td>
          <td className="border px-2 py-1">{getSizeBust(size)}</td>
          <td className="border px-2 py-1">{getSizeFrontLength(size)}</td>
          <td className="border px-2 py-1">{getSizeSleeveLength(size)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Helper function to extract size and stock information
const extractSizeStock = (productQty) =>
  productQty.reduce((acc, item) => {
    acc[item.size] = item.quantity;
    return acc;
  }, {});

// Helper function to get size dimensions based on size and product category
const getSizeDimensions = (size, category) => {
  const dimensions = {
    Bust: "N/A",
    "Front Length": "N/A",
    "Sleeve Length": "N/A",
    "Waist (inches)": "N/A",
    "Outseam Length (inches)": "N/A",
  };

  if (category === "jeans" || category === "joggers" || category === "pants") {
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

  return dimensions;
};

// Helper functions to get size specific details (used in size guide table)
const getSizeBust = (size) => {
  const bust = {
    XS: "38.0",
    S: "40.0",
    M: "42.0",
    L: "44.0",
    XL: "46.0",
    "2XL": "48.0",
  };
  return bust[size] || "N/A";
};

const getSizeFrontLength = (size) => {
  const frontLength = {
    XS: "26.0",
    S: "27.0",
    M: "27.0",
    L: "28.0",
    XL: "28.0",
    "2XL": "29.0",
  };
  return frontLength[size] || "N/A";
};

const getSizeSleeveLength = (size) => {
  const sleeveLength = {
    XS: "5.25",
    S: "5.5",
    M: "5.75",
    L: "6.0",
    XL: "6.25",
    "2XL": "6.5",
  };
  return sleeveLength[size] || "N/A";
};

export default SinglePrdSize;
