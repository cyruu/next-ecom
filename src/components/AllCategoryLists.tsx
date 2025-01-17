"use client";
import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import Divider from "@mui/material/Divider";
import Slider from "@mui/material/Slider";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import { Box, Button, CircularProgress } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getCookieUser, setLoggedInUser } from "@/slices/appslice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { notify, removeSidebar } from "@/index";
import { ToastContainer } from "react-toastify";

const AllCategoryLists = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [showCount, setShowCount] = useState(4);
  async function getCategories() {
    setCategoryLoading(true);
    const { data: resData } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/getcategory`
    );
    console.log("categories in sidemenu", resData);
    setCategoryList(resData.categoryList);
    setCategoryLoading(false);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <div className="category-section ">
        {/* menutitle */}
        <div className="side-menu-title ml-7 my-3 flex items-center">
          <AppsIcon className="mr-2" />
          <p className="text-xl font-bold ">Categories</p>
        </div>
        {categoryLoading ? (
          <p
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="inherit" size={50} />
          </p>
        ) : (
          <>
            <div className="categories">
              {categoryList.slice(0, showCount).map((category: any) => {
                return (
                  <Link
                    href={`/category?cid=${category._id}&cname=${category.categoryName}`}
                    key={category._id}
                  >
                    <div className="category pl-14 pr-7 py-3 text-md flex items-center justify-between cursor-pointer transition-all ease duration-200 hover:bg-[rgb(235,235,235)]">
                      <p className="">{category.categoryName}</p>
                      <KeyboardArrowRightIcon
                        sx={{ fontSize: "1.4rem", color: "gray" }}
                      />
                    </div>
                  </Link>
                );
              })}
              {categoryList.length < 5 ? (
                //dont show more button
                ""
              ) : (
                <div className="buttons mt-5 w-full flex items-center justify-center">
                  {/* buttons */}
                  {showCount >= categoryList.length ? (
                    <Button
                      onClick={() => setShowCount(4)}
                      className="w-max text-gray-500"
                    >
                      <KeyboardArrowUpOutlinedIcon className="text-md" />
                      <p>Show Less</p>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setShowCount((prev) => prev + 4)}
                      className="w-max text-gray-500"
                    >
                      <KeyboardArrowDownOutlinedIcon className="text-md" />
                      <p>Show More</p>
                    </Button>
                  )}
                </div>
              )}
            </div>
            <Divider
              sx={{ marginBlock: "1rem", width: "90%", marginInline: "auto" }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AllCategoryLists;
