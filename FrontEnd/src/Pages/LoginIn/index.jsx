import React from "react";
import PromotionalBanner from "./Components/PromotionalBanner";
import DetailsForm from "./Components/DetailsForm";

const index = () => {
  return (
    <div className="flex gap-10">
      <div className=" w-[650px]">
        <PromotionalBanner />
      </div>
      <div className=" w-[600px]">
        <DetailsForm />
      </div>
    </div>
  );
};

export default index;
