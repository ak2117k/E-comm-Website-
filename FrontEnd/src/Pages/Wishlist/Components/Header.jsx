import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="">
      <div className="font-bold text-[22px] text-[rgb(54,53,55)]">
        My Wishlist{" "}
        {user?.myWishlist?.length > 0 && (
          <span className="font-light text-[15px]">
            {user?.myWishlist?.length} Items
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
