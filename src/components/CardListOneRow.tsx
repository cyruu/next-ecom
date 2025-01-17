import React, { useEffect, useState } from "react";
import { Card } from "@/index";
import axios from "axios";
import { CardSkeleton } from "@/index";
const CardListOneRow = () => {
  let bestProductCount = [1, 2, 3, 4, 5];
  const [bestProducts, setbestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getBestProducts() {
    setLoading(true);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/getbestproducts`
    );
    // console.log(data);

    setbestProducts(data.bestProductsList);
    setLoading(false);
  }
  useEffect(() => {
    getBestProducts();
  }, []);
  return (
    <div className="cardListOneRow p-5 pb-10 rounded-xl flex flex-col w-full bg-white shadow-md">
      <p className="cardListTitle text-xl mb-3 poppins font-light">
        Best Of Products
      </p>
      <div className="cardListRow flex justify-between items-top">
        {loading
          ? bestProductCount.map((el) => {
              return <CardSkeleton key={el} />;
            })
          : bestProducts.map((bestProduct: any) => {
              return <Card key={bestProduct._id} product={bestProduct} />;
            })}
      </div>
    </div>
  );
};

export default CardListOneRow;
