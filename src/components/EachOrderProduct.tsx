import React from "react";

const EachOrderProduct = ({ item }: any) => {
  return (
    <div className="shadow-md w-[170px] h-[200px] mb-5 flex flex-col rounded-lg overflow-hidden">
      <div className="img-container flex items-center justify-center h-[120px] w-full bg-gray-200">
        <img
          src={item.image}
          alt={item.productName}
          className="h-full w-full m-auto object-contain mix-blend-multiply "
        />
      </div>
      <div className="details flex-1 flex flex-col justify-between  p-3">
        <p className="text-xs flex-1 text-gray-500 poppins">
          {item.productName}
        </p>
        <p className="price-quantity flex  justify-between items-center">
          <p className="text-sm font-medium">Rs. {item.price}</p>
          <p className="text-xs font-medium poppins bg-gray-400 text-white flex items-center justify-center rounded-full h-[25px] w-[25px]">
            x<span className="text-xs ml-0.5 ">{item.quantity}</span>
          </p>
        </p>
      </div>
    </div>
  );
};

export default EachOrderProduct;
