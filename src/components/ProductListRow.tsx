import React, { useEffect, useState } from "react";
import { Card } from "@/index";
import axios from "axios";
import { CardSkeleton } from "@/index";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

import { Button } from "@mui/material";
const ProductLIstRow = () => {
  let ProductCount = [1, 2, 3, 4, 5];
  const [Products, setProducts] = useState([]);
  const [showCount, setShowCount] = useState(10);

  const [loading, setLoading] = useState(true);
  async function getProducts() {
    setLoading(true);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/getproducts`
    );
    // console.log(data);

    setProducts(data.ProductsList);
    setLoading(false);
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="cardListOneRow p-5 pb-10 rounded-xl flex flex-col w-full bg-white shadow-md">
      <p className="cardListTitle text-xl mb-3 poppins font-light">Explore</p>
      <div className="cardListRow grid grid-cols-5 gap-6 items-start">
        {loading
          ? ProductCount.map((el) => {
              return <CardSkeleton key={el} />;
            })
          : Products.slice(0, showCount).map((Product: any) => {
              return <Card key={Product._id} product={Product} />;
            })}
      </div>
      {/* buttons */}
      {!loading ? (
        <div className="buttons mt-5 w-full flex items-center justify-center">
          {/* buttons */}

          {showCount >= Products.length ? (
            <Button
              onClick={() => setShowCount(10)}
              className="w-max text-gray-500"
            >
              <KeyboardArrowUpOutlinedIcon className="text-md" />
              <p>Show Less</p>
            </Button>
          ) : (
            <Button
              onClick={() => setShowCount((prev) => prev + 5)}
              className="w-max text-gray-500"
            >
              <KeyboardArrowDownOutlinedIcon className="text-md" />
              <p>Load More</p>
            </Button>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductLIstRow;
