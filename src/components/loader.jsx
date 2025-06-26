import React from "react";
import { ShoppingBag } from "lucide-react";

const ShoppingBagLoader = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <div className="flex flex-col items-center space-y-4 animate-pulse">
        <div className="animate-bounce">
          <ShoppingBag className="w-16 h-16 text-blue-600" />
        </div>
        <p className="text-lg font-semibold text-gray-700">Loading Adify...</p>
      </div>
    </div>
  );
};

export default ShoppingBagLoader;
