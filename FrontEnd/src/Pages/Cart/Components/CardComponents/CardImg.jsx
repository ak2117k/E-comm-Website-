import React from "react";

const CardImg = ({ PrdImg }) => {
  return (
    <div className="w-full ">
      <img className="w-full object-cover p-2" src={PrdImg}></img>
    </div>
  );
};

export default CardImg;
