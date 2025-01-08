const calculateProductQty = (category) => {
  let productQty = [];

  if (
    category === "pants" ||
    category === "jeans" ||
    category === "pyjamas" ||
    category === "shorts"
  ) {
    const sizes = ["28", "30", "32", "34", "36", "38"];
    sizes.forEach((size) => {
      const currSize = {
        size: size,
        quantity: Math.floor(Math.random() * 101),
      };
      productQty.push(currSize);
    });
  } else {
    const sizes = ["XS", "S", "M", "L", "XL"];
    sizes.forEach((size) => {
      const currSize = {
        size: size,
        quantity: Math.floor(Math.random() * 101),
      };
      productQty.push(currSize);
    });
  }

  return productQty;
};

const addTopTag = () => {
  const topTags = [
    "OVERSIZED FIT",
    "BOYFRIEND FIT",
    "BUY 3 FOR",
    "SALE",
    "OVERSIZED FIT",
    "SALE",
    "STRAIGHT FIT",
    "TAPERED FIT",
    "OVERSIZED FIT",
    "SALE",
    "BUY 2 FOR",
    "OVERSIZED FIT",
    "SUPERLOOSE FIT",
    "SALE",
    "OVERSIZEDFIT",
    "REVERSIBLE",
    "SALE",
    "SLIM FIT",
    "OVERSIZED FIT",
    "",
  ];
  const randomTagIndex = Math.floor(Math.random() * topTags.length);
  return topTags[randomTagIndex];
};

const addBottomTag = () => {
  const bottomTags = [
    "100% COTTON",
    "SOFT TERRY COTTON",
    "PREMINIUM BLENDED FABRIC",
    "SOFT TERRY COTTON",
    "PREMINIUM BLENDED FABRIC",
    "SOFT AND STURDY",
    "100% COTTON",
    "COMFORT STRETCH",
    "THICK PREMIUM FABRIC",
    "LIGHT WEIGHT FABRIC",
    "LIGHTWEIGHT TERRY FABRIC",
    "SOFT TERRY COTTON",
    "PREMINIUM BLENDED FABRIC",
    "STRONG & DURABLE",
    "100% COTTON",
    "COMFORT STRETCH",
    "",
  ];
  const randomTagIndex = Math.floor(Math.random() * bottomTags.length);
  return bottomTags[randomTagIndex];
};

module.exports = { calculateProductQty, addTopTag, addBottomTag };
