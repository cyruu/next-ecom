import React, { useEffect, useState } from "react";
import { Card, CardSkeleton } from "@/index";
import axios from "axios";
const CardListOneRow = () => {
  let c = [1, 2, 3, 4];
  const [gridProducts, setgridProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getgridProducts() {
    setLoading(true);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/gridproducts`
    );
    // console.log(data);

    setgridProducts(data.gridProductsList);
    setLoading(false);
  }
  useEffect(() => {
    getgridProducts();
  }, []);
  return (
    <>
      {loading
        ? c.map((el: any) => {
            return <CardSkeleton key={el} />;
          })
        : gridProducts.map((gridProduct: any) => {
            return <Card key={gridProduct._id} product={gridProduct} />;
          })}
      {}
    </>
  );
};

export default CardListOneRow;
