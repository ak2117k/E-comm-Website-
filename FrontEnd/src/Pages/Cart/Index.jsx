import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Components/Header";
import FreeDeliveryTag from "./Components/FreeDeliveryTag";
import Card from "./Components/Card";
import { useState, useEffect, useRef } from "react";
import { Updatecart } from "../../Storee/CartSlice";

const Index = () => {
  const [filterProducts, setfilterProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentSize, setCurrentSize] = useState("");
  const [currentQty, setCurrentQty] = useState(1);

  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.cart.cart);

  const prevFilterProductsRef = useRef([]);

  const haveProductsChanged = (oldProducts, newProducts) => {
    if (oldProducts.length !== newProducts.length) return true;

    for (let i = 0; i < oldProducts.length; i++) {
      const oldProduct = oldProducts[i];
      const newProduct = newProducts[i];

      if (
        oldProduct.Size !== newProduct.Size ||
        oldProduct.Qty !== newProduct.Qty
      ) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const filterCart = cartProducts.reduce((Accumulator, product) => {
      const existingProductIndex = Accumulator.findIndex(
        (item) => item.id === product.id && item.Size === product.Size
      );
      if (existingProductIndex !== -1) {
        Accumulator[existingProductIndex].Qty += product.Qty;
      } else {
        Accumulator.push({ ...product });
      }
      return Accumulator;
    }, []);

    setfilterProducts(filterCart);
  }, [cartProducts, dispatch]);

  useEffect(() => {
    if (haveProductsChanged(prevFilterProductsRef.current, filterProducts)) {
      dispatch(Updatecart(filterCart));
    }

    prevFilterProductsRef.current = filterCart;
  }, [setfilterProducts]);

  console.log(filterProducts);
  console.log(useSelector((state) => state.cart.updatedCart));

  return (
    <div className="w-[1350px] border-2 border-red-400 ml-20">
      <div className="w-full h-20  flex items-center justify-center">
        <Header Products={cartProducts} />
      </div>
      <div className="w-full flex gap-6 border-2 border-blue-300">
        <div className=" w-[65%]">
          <div className="w-full ">
            <FreeDeliveryTag />
          </div>
          <div className="w-full">
            <Card
              Products={cartProducts}
              currentProduct={currentProduct}
              setCurrentProduct={setCurrentProduct}
              currentSize={currentSize}
              setCurrentSize={setCurrentSize}
              currentQty={currentQty}
              setCurrentQty={setCurrentQty}
              filterProducts={filterProducts}
              setfilterProducts={setfilterProducts}
            />
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Index;
