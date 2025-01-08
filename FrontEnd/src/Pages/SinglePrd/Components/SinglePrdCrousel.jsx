import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

const SinglePrdCrousel = ({
  singleProduct,
  imgArr,
  mainImage,
  handleImageChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currImage, setcurrImage] = useState(imgArr[currentIndex]);
  const [transitionDirection, setTransitionDirection] =
    useState("right-to-left");

  const imageHeight = 175;
  let sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
  };

  const handleSideImageClick = (index) => {
    setTransitionDirection(
      index > currentIndex ? "right-to-left" : "left-to-right"
    );
    setCurrentIndex(index);
  };

  useEffect(() => {
    const currimg = imgArr[currentIndex];
    setcurrImage(currimg);
  }, [currentIndex, imgArr]);

  const translateYValue = currentIndex * imageHeight;

  const handleImageUp = () => {
    if (currentIndex > 0 && currentIndex < imgArr.length) {
      setTransitionDirection("left-to-right");
      setCurrentIndex(currentIndex - 1);
    }
  };

  const mainImageStyle = {
    transform:
      transitionDirection === "right-to-left"
        ? "translateX(100%)"
        : "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <div className="flex b h-screen w-[650px] ">
      <div className="w-[140px] h-full overflow-hidden  relative">
        {currentIndex > 0 && (
          <button
            className="absolute top-[-20px] left-[40%] transform -translate-x-1/2 z-50 p-2 bg-white  text-lg font-bold cursor-pointer rounded-full hover:font-light w-10 h-10 text-center"
            onClick={handleImageUp}
          >
            ^
          </button>
        )}

        <div
          className="w-[120px] h-full "
          style={{
            transform: `translateY(-${translateYValue}px)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {imgArr.map((image, index) => (
            <div
              key={index}
              className={`border-3 w-full h-[160px] cursor-pointer mb-4 ${
                currentIndex === index ? "border-2 border-blue-400" : ""
              }`}
              onClick={() => handleSideImageClick(index)}
            >
              <img
                className="w-full h-full object-cover"
                src={singleProduct[image]}
                alt={`side-image-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-[470px] h-screen ">
        <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
          <div style={mainImageStyle}>
            <img
              className="w-full h-full object-cover"
              src={singleProduct[currImage]}
              alt="main-image"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default SinglePrdCrousel;
