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
import { Avatar, Box, Button, CircularProgress, Modal } from "@mui/material";
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
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 0,
};
const SideMenu = () => {
  const cookieLoggedInUser = useSelector((state: any) => state.loggedInUser);
  const [logoutLoading, setlogoutLoading] = useState(false);
  const [categoryList, setCategoryList] = useState<any[]>([]); // Ensure it's initialized as an empty array
  const [showCount, setShowCount] = useState(4);
  const path = usePathname();
  const router = useRouter();
  const dis = useDispatch<ThunkDispatch<any, any, any>>();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    setlogoutLoading(true);
    const { data: resData } = await axios.get("/api/users/logout");
    setlogoutLoading(false);
    handleClose();
    notify(resData.msg, resData.statusCode);
    if (resData.statusCode === 200) {
      setTimeout(() => {
        router.push("/login");
      }, 200);
    }
  };

  const getCategories = async () => {
    try {
      const { data: resData } = await axios.get(`/api/products/getcategory`);
      setCategoryList(resData.categoryList || []); // Ensure an empty array is set if no categories
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoryList([]); // Fallback in case of error
    }
  };

  useEffect(() => {
    getCategories();
  }, []); // Fetch categories on initial load

  useEffect(() => {
    dis(getCookieUser());
  }, [path]);

  return (
    <div>
      <div
        onClick={removeSidebar}
        className="close-div bg-[rgb(0,0,0,.3)] hidden h-screen w-screen fixed top-0"
        style={{ zIndex: "40" }}
      ></div>
      <ToastContainer />
      <div className="sidebar fixed-scrollbar w-[300px] h-[100vh] fixed top-0 overflow-y-auto overflow-x-hidden">
        {/* Sidebar content */}
        <div className="hello-user sticky top-0 h-[70px] bg-[rgb(50,50,50)] flex items-center justify-between">
          {/* User login section */}
          {!cookieLoggedInUser ? (
            <Link href="/login" className="flex items-center ml-7">
              <Avatar sx={{ height: "1.8rem", width: "1.8rem" }}>U</Avatar>
              <p className="flex items-center text-gray-500">
                <span className="ml-2">Hello, User</span>
              </p>
            </Link>
          ) : (
            <>
              <Button className="text-white ml-7" id="basic-button">
                <Avatar sx={{ height: "1.8rem", width: "1.8rem" }}>
                  {cookieLoggedInUser.username[0].toUpperCase()}
                </Avatar>
                <span className="ml-2 text-white">
                  {cookieLoggedInUser.username}
                </span>
              </Button>
            </>
          )}
          <Button onClick={removeSidebar}>
            <CloseIcon sx={{ color: "white", fontSize: "2rem" }} />
          </Button>
        </div>

        {/* Categories section */}
        <div className="category-section mt-8">
          <div className="side-menu-title ml-7 my-3 flex items-center">
            <AppsIcon className="mr-2" />
            <p className="text-xl font-bold">Categories</p>
          </div>
          <div className="categories">
            {categoryList && categoryList.length > 0 ? (
              categoryList.slice(0, showCount).map((category: any) => (
                <Link
                  href={`/category?cid=${category._id}&cname=${category.categoryName}`}
                  key={category._id}
                >
                  <div className="category pl-14 pr-7 py-3 text-md flex items-center justify-between cursor-pointer transition-all ease duration-200 hover:bg-[rgb(235,235,235)]">
                    <p>{category.categoryName}</p>
                    <KeyboardArrowRightIcon
                      sx={{ fontSize: "1.4rem", color: "gray" }}
                    />
                  </div>
                </Link>
              ))
            ) : (
              <p>No categories available</p>
            )}
            {categoryList.length < 5 ? null : (
              <div className="buttons mt-5 w-full flex items-center justify-center">
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
        </div>
        <Divider sx={{ marginBlock: "1.1rem" }} />

        {/* Account Section */}
        <div className="side-menu-title ml-7 my-3 flex items-center">
          <ManageAccountsIcon className="mr-2" />
          <p className="text-xl font-bold">Account</p>
        </div>
        {cookieLoggedInUser ? (
          <>
            <Link
              className="category pl-14 pr-7 py-3 text-md flex items-center justify-between cursor-pointer transition-all ease duration-200 hover:bg-[rgb(235,235,235)]"
              href={`/profile?uid=${cookieLoggedInUser.userId}`}
            >
              <p>Profile</p>
              <KeyboardArrowRightIcon />
            </Link>
            <Link
              className="category pl-14 pr-7 py-3 text-md flex items-center justify-between cursor-pointer transition-all ease duration-200 hover:bg-[rgb(235,235,235)]"
              href={`/order?uid=${cookieLoggedInUser.userId}`}
            >
              <p>My Order</p>
              <KeyboardArrowRightIcon />
            </Link>
            <div
              onClick={handleOpen}
              className="category pl-14 pr-7 py-3 mb-6 text-md flex items-center justify-between cursor-pointer transition-all ease duration-200 hover:bg-[rgb(235,235,235)]"
            >
              <p>Logout</p>
              <KeyboardArrowRightIcon
                sx={{ fontSize: "1.4rem", color: "gray" }}
              />
            </div>
            {/* Logout Modal */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
              BackdropProps={{
                style: { backgroundColor: "rgba(0,0 ,0 , 0.7)" },
              }}
            >
              <Box
                sx={{ ...style }}
                className="w-[400px] py-7 text-center rounded-lg"
              >
                {logoutLoading ? (
                  <div>
                    <CircularProgress size={50} className="text-gray-500" />
                    <p className="text-gray-500 mt-3 text-xl">Logging out</p>
                  </div>
                ) : (
                  <>
                    <p className="font-bold text-2xl">Logout Confirmation</p>
                    <p className="text-xs mt-2 mb-7 text-gray-500">
                      Are you sure you want to logout?
                    </p>
                    <div className="flex justify-center">
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        onClick={handleLogout}
                        className="mr-3"
                      >
                        Logout
                      </Button>
                      <Button
                        variant="outlined"
                        size="medium"
                        onClick={handleClose}
                        className="ml-3"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </Box>
            </Modal>
          </>
        ) : (
          <>
            <Link href="/login">
              <div className="category pl-14 pr-7 py-3 text-md flex items-center justify-between cursor-pointer transition-all ease duration-200 hover:bg-[rgb(235,235,235)]">
                <p>Login</p>
                <KeyboardArrowRightIcon
                  sx={{ fontSize: "1.4rem", color: "gray" }}
                />
              </div>
            </Link>
            <Link href="/signup" className="mb-6">
              <div className="category pl-14 pr-7 py-3 text-md flex items-center justify-between cursor-pointer transition-all ease duration-200 hover:bg-[rgb(235,235,235)]">
                <p>Sign up</p>
                <KeyboardArrowRightIcon
                  sx={{ fontSize: "1.4rem", color: "gray" }}
                />
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default SideMenu;
