import React, { useState } from "react";
import AvatarManageAccount from "./AvatarManageAccount";

const Avatar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAvatarClick = () => {
    setShowDropdown(true);
    setTimeout(() => {
      setShowDropdown(false);
    }, 500);
  };

  return (
    <div>
      <div className="avatar online" onClick={handleAvatarClick}>
        <div className="w-24 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      {showDropdown && <AvatarManageAccount />}
    </div>
  );
};

export default Avatar;
