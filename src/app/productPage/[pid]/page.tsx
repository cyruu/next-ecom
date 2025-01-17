// app/productPage/page.tsx
"use client"; // Make sure this is a client component
import { RelatedProducts, ProductReviews } from "@/index";
import ProductDescription from "@/components/ProductDescription";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = ({ params }: any) => {
  const pid = params.pid; //get id from url
  const [loading, setLoading] = useState(true);
  const [reviewUpdated, setReviewUpdated] = useState(true);
  const [productReviews, setProductReviews] = useState([]);
  const [thisProduct, setthisProduct] = useState({});
  async function getthisProduct() {
    setLoading(true);
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/thisproduct`,
      { pid }
    );
    // console.log(data);

    setthisProduct(data.thisproduct[0]);
  }
  // get reviews
  async function getReviews() {
    // console.log("getting reviews");

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/getreviews`,
      { pId: pid }
    );

    console.log("Reviews in pid page", data.ReviewsList);
    setProductReviews(data.ReviewsList);
    setLoading(false);

    // console.log(productReviews);
  }
  useEffect(() => {
    getthisProduct();
  }, []);
  useEffect(() => {
    getReviews();
  }, [reviewUpdated]);
  return (
    <div>
      <ToastContainer />
      <div className="px-40">
        <ProductDescription
          product={thisProduct}
          productReviews={productReviews}
          loading={loading}
        />
        <ProductReviews
          loading={loading}
          productReviews={productReviews}
          pId={pid}
          setReviewUpdated={setReviewUpdated}
        />
      </div>
      <div className=" mx-16 mb-10">
        <RelatedProducts productId={pid} />
      </div>
    </div>
  );
};

export default page;
