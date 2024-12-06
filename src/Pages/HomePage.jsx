import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from "react-router-dom";
import HomePageData from "../Components/DataArr";
import PostNav from "../Components/PostNav";

const HomePage = () => {
  const CarouselData = HomePageData.Carousel;
  console.log(CarouselData);
  let sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3300,
    arrows: false,
  };

  console.log(CarouselData);

  return (
    <div className="">
      <div className="w-[100%]">
        <PostNav />
      </div>

      <div className=" w-[100%] h-[650px] justify-evenly overflow-hidden pb-8">
        <Slider
          ref={(slider) => (sliderRef = slider)}
          {...settings}
          className=""
        >
          {CarouselData.map((data) => (
            <div key={data.id}>
              <Link to={`/products/${data.category}`}>
                <div className="w-[490px] h-[600px]" key={data.id}>
                  <img className="h-[600px] w-[490px]" src={data.image}></img>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      <div className="inline-flex h-[370px] w-[100%] gap-2 mt-4 ">
        <div className=" inline-block w-[750px] h-[350px]">
          <Link to="/products/women">
            <div className="w-[750px] h-[350px]">
              <img
                src="https://images.bewakoof.com/uploads/grid/app/desktop-shop-women--1--1729584658.gif"
                className="w-[750px] h-[350px]"
              ></img>
            </div>
          </Link>
        </div>
        <div className=" inline-block w-[750px] h-[350px]">
          <Link to="/products/men">
            <div className="w-[750px] h-[350px]">
              <img
                src="https://images.bewakoof.com/uploads/grid/app/desktop-shop-men--2--1729584659.gif"
                className="w-[750px] h-[350px]"
              ></img>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-[100%] h-10 justify-center text-center">
        <h2 className="text-black text-lg"> Shop by Category- Men</h2>
      </div>
      <div className="inline-flex w-[100%] bg-gray-200 h-[350px] gap-0 ">
        {HomePageData.MenCategory.slice(0, 6).map((data) => (
          <div className="w-[250px] h-[350px]" key={data.id}>
            <Link to={`/products/men/${encodeURIComponent(data.category)}`}>
              <div className="w-[250px] h-[350px]">
                <img src={data.image} className="h-[350px] w-[100%]"></img>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="inline-flex w-[100%] bg-gray-200 h-[350px] gap-0 mt-4">
        {HomePageData.MenCategory.slice(6, 12).map((data) => (
          <div className="w-[250px] h-[350px]" key={data.id}>
            <Link to={`/products/men/${encodeURIComponent(data.category)}`}>
              <div className="w-[250px] h-[350px]">
                <img src={data.image} className="h-[350px] w-[100%]"></img>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="w-[100%] h-10 justify-center text-center mt-4 mb-2">
        <h2 className="text-black text-lg"> Shop by Category- Women</h2>
      </div>
      <div className="inline-flex w-[100%] bg-gray-200 h-[350px] gap-0 ">
        {HomePageData.WomenCategory.slice(0, 6).map((data) => (
          <div className="w-[250px] h-[350px]" key={data.id}>
            <Link to={`/products/women/${encodeURIComponent(data.category)}`}>
              <div className="w-[250px] h-[350px]">
                <img src={data.image} className="h-[350px] w-[100%]"></img>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="inline-flex w-[100%] bg-gray-200 h-[350px] gap-0 mt-4 ">
        {HomePageData.WomenCategory.slice(6, 12).map((data) => (
          <div className="w-[250px] h-[350px]" key={data.id}>
            <Link to={`/products/women/${encodeURIComponent(data.category)}`}>
              <div className="w-[250px] h-[350px]">
                <img src={data.image} className="h-[350px] w-[100%]"></img>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="w-[100%] mt-4">
        <img
          src="https://images.bewakoof.com/uploads/grid/app/OS-Tshirt-under499-Daily-BB-DIWALI-Deals-Desktop-Thin-banner--1--1730442189.jpg"
          className="w-[100%]"
        ></img>
      </div>
    </div>
  );
};

export default HomePage;
