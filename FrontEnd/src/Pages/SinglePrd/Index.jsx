// Index.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../Storee/Data";
import SinglePrdCrousel from "./Components/SinglePrdCrousel";
import SinglePrdDetails from "./Components/SinglePrdDetails";
import SinglePrdSize from "./Components/SinglePrdSize";
import SinglePrdBag from "./Components/SinglePrdBag";
import Delievery from "./Components/Delievery";
import KeyHighlights from "./Components/KeyHighlights";
import ProductDescription from "./Components/ProductDescription";
import Return from "./Components/Return";
import Tags from "./Components/Tags";
import Reviews from "./Components/Reviews";

const Index = () => {
  const singleProduct = useSelector((state) => state.data.singleProduct);
  const error = useSelector((state) => state.data.error);
  const loader = useSelector((state) => state.data.isLoading);

  const [imagePtr, setImagePtr] = useState({});
  const [imgArr, setImgArr] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const productParams = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(productParams.id));
  }, [productParams, dispatch]);

  useEffect(() => {
    if (singleProduct) {
      const imgKeys = Object.keys(singleProduct).filter((key) =>
        key.includes("image")
      );
      setImgArr(imgKeys);

      let newPtr = {};
      imgKeys.forEach((key) => {
        newPtr[key] = false;
      });
      setImagePtr(newPtr);

      if (imgKeys.length > 0) {
        setMainImage(imgKeys[0]);
        newPtr[imgKeys[0]] = true;
        setImagePtr(newPtr);
      }
    }
  }, [singleProduct]);

  function handleImageChange(image) {
    let newPtr = { ...imagePtr };
    for (let key in imagePtr) {
      newPtr[key] = false;
    }
    newPtr[image] = true;
    setMainImage(image);
  }

  return (
    <div>
      {loader && (
        <div className="flex w-full h-full justify-center mt-[100px] bg-opacity-50">
          <img
            src="https://www.bewakoof.com/images/bwkf-loader.gif"
            className="h-[270px] w-[270px] justify-center"
            alt="Loading..."
          />
        </div>
      )}
      {!loader && !error && singleProduct && (
        <div className="flex border-2 border-red-500 h-screen w-[1250px] ml-[140px] mt-8">
          <div className="h-screen w-[680px] ">
            <SinglePrdCrousel
              singleProduct={singleProduct}
              imgArr={imgArr}
              mainImage={mainImage}
              handleImageChange={handleImageChange}
            />
          </div>
          <div className="overflow-y-auto w-full scrollbar-none ">
            <div className="w-full h-auto">
              <SinglePrdDetails singleProduct={singleProduct} />
            </div>
            <div className="block w-full h-auto">
              <SinglePrdSize singleProduct={singleProduct} />
            </div>
            <div className="w-full">
              <Delievery />
            </div>
            <div className="w-full">
              <KeyHighlights />
            </div>
            <div className="w-full ">
              <ProductDescription />
            </div>
            <div className="w-full">
              <Return />
            </div>
            <div className="">
              <Tags />
            </div>
            <div className="w-full">
              <Reviews />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
