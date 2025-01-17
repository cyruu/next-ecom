import React, { useEffect, useState } from "react";
import { Card } from "@/index";
import axios from "axios";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { CardSkeleton } from "@/index";
import { Button } from "@mui/material";
const RelatedProducts = ({ productId }: any) => {
  let bestProductCount = [1, 2, 3, 4, 5];
  const [recommendProductList, setrecommendProductList] = useState([]);
  // const [showCount, setShowCount] = useState(1);
  const [showCount, setShowCount] = useState(5);

  const [loading, setLoading] = useState(true);
  async function getrecommendProductList() {
    setLoading(true);
    const { data: resData } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/getcategoryrecommendproducts`,
      { productId }
    );

    setrecommendProductList(resData.recommendProductList);
    setLoading(false);
  }
  useEffect(() => {
    getrecommendProductList();
  }, []);
  return recommendProductList ? (
    <div className="cardListOneRow p-5 pb-10 rounded-xl flex flex-col w-full bg-white shadow-md">
      <p className="cardListTitle text-xl mb-3 poppins font-light">
        Other Products
      </p>
      <div className="cardListRow grid grid-cols-5 items-start">
        {loading
          ? bestProductCount.map((el) => {
              return <CardSkeleton key={el} />;
            })
          : recommendProductList.slice(0, showCount).map((bestProduct: any) => {
              return <Card key={bestProduct._id} product={bestProduct} />;
            })}
      </div>
      {/* buttons */}
      {!loading ? (
        recommendProductList.length < 1 ? (
          //dont show more button
          ""
        ) : (
          <div className="buttons mt-5 w-full flex items-center justify-center">
            {showCount >= recommendProductList.length ? (
              <Button
                onClick={() => setShowCount(5)}
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
        )
      ) : (
        ""
      )}
    </div>
  ) : (
    ""
  );
};

export default RelatedProducts;
