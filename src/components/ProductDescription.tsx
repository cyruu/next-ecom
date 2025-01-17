"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Link from "next/link";
import { notify } from "@/helper/notify";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Button, Skeleton } from "@mui/material";
import { ProductDetailSkeleton } from "@/index";

const ProductDescription = ({ product, loading, productReviews = [] }: any) => {
  const loggedInUser = useSelector((state: any) => state.loggedInUser);
  const [visible, setVisible] = useState(false);
  const [sentimentCount, setSentimentCount] = useState({
    positive: 0,
    negative: 0,
    neutral: 0,
  });

  // handle favorite
  function handleFavorite(e: any) {
    notify("Added to Favorites", 200);
  }

  async function handleCart() {
    console.log("adding to cart", product, loggedInUser);

    if (product && loggedInUser) {
      const { data: resData }: any = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/addtocart`,
        {
          product,
          userId: loggedInUser.userId,
        }
      );
      notify(resData.msg, resData.statusCode);
      console.log(resData);
    } else {
      notify("Something didn't load in product description", 204);
    }
  }

  // useEffect(() => {
  //   if (productReviews && Array.isArray(productReviews)) {
  //     const countObject = productReviews.reduce(
  //       (counts: any, review: any) => {
  //         counts[review.sentiment] = counts[review.sentiment] + 1;
  //         return counts;
  //       },
  //       { positive: 0, negative: 0, neutral: 0 }
  //     );
  //     setSentimentCount(countObject);
  //   }
  // }, [productReviews]);

  function handleMouseEnter() {
    setVisible(true);
  }

  function handleMouseLeave() {
    setVisible(false);
  }

  return (
    <div className="min-h-[90vh] flex flex-col items-center">
      <div className="flex items-start w-full h-[550px] rounded-lg bg-white shadow-md mx-auto my-10">
        <div className="imageContaine rounded-lg overflow-hidden w-[400px] m-5">
          {loading ? (
            <Skeleton
              variant="rectangular"
              height={380}
              width={380}
              className="rounded-lg mt-5"
            />
          ) : (
            <img
              className="w-[380px] h-[380px] m-auto object-contain mix-blend-multiply"
              src={
                product
                  ? product.image
                  : "https://citroen.navigation.com/static/WFS/Shop-CitroenEMEA-Site/-/Shop-CitroenEMEA/en_GB/Product%20Not%20Found.png"
              }
              alt={product.productName}
            />
          )}
        </div>
        {loading ? (
          <ProductDetailSkeleton />
        ) : product ? (
          <div className="detailcontainer h-[500px] pl-10 pt-10 pb-2 pr-20 flex flex-col items-start flex-1 flex-wrap ">
            <h3 className="text-5xl dancingscript font-bold text-[#333] mt-10 mr-4 mb-4">
              {product.productName}
            </h3>
            {product.stock > 0 ? (
              <p className="poppins text-xs bg-green-400 text-white px-2 py-1 rounded-xl">
                In Stock : {product.stock}
              </p>
            ) : (
              <p className="poppins text-xs bg-gray-500 text-white px-2 py-1 rounded-xl">
                Out Of Stock
              </p>
            )}

            <p className="text-sm poppins text-gray-500 mt-5 mb-2 flex-1">
              {product.description}
            </p>

            <div className="price-positive-percent flex items-center justify-between w-full">
              <p className="text-lg my-2 fontlight poppins">
                Rs. {product.price}
              </p>
              {/* <div className="relative flex items-center">
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="p-2 rounded-xl cursor-pointer"
                >
                  <p className="text-lg mb-1 h-[60px] w-[60px] bg-green-400 font-bold mx-auto text-white rounded-full flex items-center justify-center">
                    {Math.floor(
                      (sentimentCount.positive / productReviews.length) * 100 ||
                        0
                    )}
                    %
                  </p>
                  <p className="text-xs text-gray-500">Positive Ratings</p>
                </div>
                <div
                  className={`absolute -left-[260px] transform w-[250px] duration-300 ease-in-out ${
                    visible ? "opacity-100 scale-110" : "opacity-0"
                  }`}
                >
                  <div className="positive-review-section my-1 w-full flex items-center justify-between ">
                    <p className="text-sm text-gray-500">
                      {Math.floor(
                        (sentimentCount.positive / productReviews.length) *
                          100 || 0
                      )}
                      %
                    </p>
                    <div className="gray-bg w-[210px] h-[10px] rounded-lg bg-gray-200 overflow-hidden flex">
                      <div
                        className="positive-bg h-full bg-green-400"
                        style={{
                          width: `${
                            (sentimentCount.positive / productReviews.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="negative-review-section my-1 w-full flex items-center justify-between ">
                    <p className="text-sm text-gray-500">
                      {Math.floor(
                        (sentimentCount.negative / productReviews.length) *
                          100 || 0
                      )}
                      %
                    </p>
                    <div className="gray-bg w-[210px] h-[10px] rounded-lg bg-gray-200 overflow-hidden flex">
                      <div
                        className="negative-bg h-full bg-red-400"
                        style={{
                          width: `${
                            (sentimentCount.negative / productReviews.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="neutral-review-section my-1 w-full flex justify-between items-center ">
                    <p className="text-sm text-gray-500">
                      {Math.floor(
                        (sentimentCount.neutral / productReviews.length) *
                          100 || 0
                      )}
                      %
                    </p>
                    <div className="gray-bg w-[210px] h-[10px] rounded-lg bg-gray-200 overflow-hidden flex">
                      <div
                        className="neutral-bg h-full bg-gray-400"
                        style={{
                          width: `${
                            (sentimentCount.neutral / productReviews.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="buttons w-full ">
              {!loggedInUser ? (
                <Link href="/login">
                  <Button
                    variant="contained"
                    color="primary"
                    className="w-[40%] rounded-lg py-2 bg-gray-700"
                  >
                    <ShoppingCartOutlinedIcon className="mr-2 text-md" />
                    <p className="text-lg">Add to Cart</p>
                  </Button>
                </Link>
              ) : product.stock > 0 ? (
                <Button
                  onClick={handleCart}
                  variant="contained"
                  color="primary"
                  className="w-[40%] rounded-lg  py-2 bg-gray-700"
                >
                  <ShoppingCartOutlinedIcon className="mr-2 text-md" />
                  <p className="text-lg">Add to Cart</p>
                </Button>
              ) : (
                <Button
                  onClick={() => notify("Product Out Of Stock", 204)}
                  variant="contained"
                  color="primary"
                  className="w-[40%] rounded-lg  py-2 bg-gray-700"
                >
                  <ShoppingCartOutlinedIcon className="mr-2 text-md" />
                  <p className="text-lg">Add to Cart</p>
                </Button>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
