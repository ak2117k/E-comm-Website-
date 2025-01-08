import React, { useState } from "react";

// Helper function to generate random reviews
const generateRandomReviews = () => {
  const reviews = [
    {
      username: "John Doe",
      rating: 4,
      review: "Great product! Highly recommend.",
    },
    {
      username: "Jane Smith",
      rating: 5,
      review: "Amazing quality, will buy again.",
    },
    {
      username: "Mike Jordan",
      rating: 3,
      review: "Good but needs improvement.",
    },
    {
      username: "Lisa Brown",
      rating: 2,
      review: "Not what I expected. Disappointed.",
    },
  ];

  // Shuffle and return a random selection of reviews
  const shuffledReviews = reviews.sort(() => 0.5 - Math.random());
  return shuffledReviews.slice(0, 3); // Return 3 random reviews
};

const Reviews = () => {
  const [containerType, setContainerType] = useState(null);
  const [productReviews, setProductReviews] = useState([]);

  // Function to handle container switch
  const handleContainerView = (value) => {
    setContainerType(value);

    // Generate random product reviews when Product Reviews tab is clicked
    if (value === "Product") {
      setProductReviews(generateRandomReviews());
    }
  };

  // Function to generate rating scale with a green bar
  const RatingScale = ({ percentage }) => {
    return (
      <div className="relative w-1/2 h-2 bg-gray-200 mt-2 rounded">
        <div
          className="absolute left-0 top-0 h-full bg-green-500 rounded"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between border-b border-transparent">
        <div
          className={`w-1/2 text-center py-4 cursor-pointer ${
            containerType === "Product" ? "border-b-4 border-yellow-500" : ""
          }`}
          onClick={() => handleContainerView("Product")}
        >
          Product Reviews
        </div>
        <div
          className={`w-1/2 text-center py-4 cursor-pointer ${
            containerType === "Brand" ? "border-b-4 border-yellow-500" : ""
          }`}
          onClick={() => handleContainerView("Brand")}
        >
          Brand Reviews
        </div>
      </div>

      {/* Product Reviews Container */}
      {containerType === "Product" && (
        <div className="product-reviews mt-6 w-[80%] mx-auto">
          <h3 className="font-semibold text-lg mb-4">Product Reviews</h3>
          {productReviews.length > 0 ? (
            productReviews.map((review, index) => (
              <div key={index} className="review-item mb-4 flex items-center">
                <span className="font-semibold">{review.username}</span>
                <span className="ml-2 text-yellow-500">{`⭐ ${review.rating}`}</span>
                <p className="text-sm ml-4">{review.review}</p>
              </div>
            ))
          ) : (
            <div>No reviews available</div>
          )}
        </div>
      )}

      {/* Brand Reviews Container */}
      {containerType === "Brand" && (
        <div className="brand-reviews mt-6 w-[80%] mx-auto">
          <h3 className="font-semibold text-lg mb-4">Brand Reviews</h3>
          {/* Brand Rating Stats */}
          <div className="rating-statistics mb-6">
            <div className="flex flex-col">
              <div className="text-xl">4.6</div>
              <div className="mt-2">10M+ Ratings</div>
              <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
            </div>
          </div>

          {/* Brand Rating Scale */}
          <div className="rating-scale flex justify-between items-center mb-4">
            <div className="text-sm w-1/3">5 Stars</div>
            <RatingScale percentage={60} />
            <div className="text-green-600 text-sm">{`60%`}</div>
          </div>
          <div className="rating-scale flex justify-between items-center mb-4">
            <div className="text-sm w-1/3">4 Stars</div>
            <RatingScale percentage={25} />
            <div className="text-green-500 text-sm">{`25%`}</div>
          </div>
          <div className="rating-scale flex justify-between items-center mb-4">
            <div className="text-sm w-1/3">3 Stars</div>
            <RatingScale percentage={10} />
            <div className="text-green-400 text-sm">{`10%`}</div>
          </div>
          <div className="rating-scale flex justify-between items-center mb-4">
            <div className="text-sm w-1/3">2 Stars</div>
            <RatingScale percentage={4} />
            <div className="text-green-300 text-sm">{`4%`}</div>
          </div>
          <div className="rating-scale flex justify-between items-center mb-4">
            <div className="text-sm w-1/3">1 Star</div>
            <RatingScale percentage={1} />
            <div className="text-green-200 text-sm">{`1%`}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
