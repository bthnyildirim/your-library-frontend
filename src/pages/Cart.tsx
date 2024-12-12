import React from "react";

const Cart: React.FC = () => {
  return (
    <div className="container mx-auto p-6 text-gray-800">
      <div className="flex flex-col items-center">
        <img
          src={require("../images/work-in-progress.JPG")}
          alt="Work in Progress"
          className="w-1/2 h-auto mb-6"
        />
        <p className="text-center text-lg">
          This View Cart page is currently under construction. Please check back
          soon for updates.
        </p>
      </div>
    </div>
  );
};

export default Cart;
