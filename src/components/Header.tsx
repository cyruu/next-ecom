"use client";
import Link from "next/link";

import React, { useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar, Box, Button, Menu, MenuItem, Modal } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CircularProgress from "@mui/material/CircularProgress";

import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { FaCrown } from "react-icons/fa6";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useDispatch } from "react-redux";

import SideMenu from "./SideMenu";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { getCookieUser } from "@/slices/appslice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import SearchInput from "./SearchInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import { notify } from "@/helper/notify";
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

const Header = () => {
  const loggedInUser = useSelector((state: any) => state.loggedInUser);

  // const userLoading = useSelector((state: any) => state.userLoading);

  // console.log("loggedinuset", loggedInUser);
  const [openmodal, setOpenmodal] = React.useState(false);
  const [loading, setloading] = React.useState(true);
  const [logoutLoading, setlogoutLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  //for logoutmodal
  const handleOpenmodal = () => {
    setOpenmodal(true);
  };
  const handleClosemodal = () => {
    handleClose();
    setOpenmodal(false);
  };

  const open = Boolean(anchorEl);
  const dis = useDispatch<ThunkDispatch<any, any, any>>();
  const path = usePathname();
  //logout
  const handleLogout = async () => {
    setlogoutLoading(true);

    // notify("hello", 200);
    const { data: resData } = await axios.get("api/users/logout");
    setlogoutLoading(false);
    handleClose();
    handleClosemodal();
    notify(resData.msg, resData.statusCode);
    if (resData.statusCode == 200) {
      setTimeout(() => {
        router.push("/login");
        // window.location.href = "/";
      }, 200);
    }
  };
  //required here
  function handleBurgerclick() {
    const sidebar = document.querySelector(".sidebar");
    const closeDiv = document.querySelector(".close-div");
    const body = document.querySelector("body");
    if (sidebar) {
      sidebar.classList.add("showsidebar");
    }
    if (closeDiv) {
      closeDiv.classList.remove("hidden");
      closeDiv.classList.add("flex");
    }
    body?.classList.add("overflow-hidden");
  }
  // dropdown when loggedin
  const handleCategoryButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dis(getCookieUser());
  }, [path]);

  // useEffect(() => {
  //   router.prefetch("/cart"); // Preloads the 'about' page
  //   router.prefetch("/login"); // Preloads the 'about' page
  //   router.prefetch("/signup"); // Preloads the 'about' page
  // }, [router]);
  return (
    <>
      <nav className="flex h-[10vh] items-center justify-between px-[15px] py-[20px] sticky top-0 z-20 bg-white shadow-md">
        <div className=" flex items-center ">
          <ToastContainer />
          <Button onClick={handleBurgerclick} sx={{ color: "white" }}>
            <MenuIcon sx={{ cursor: "pointer", color: "black" }} />
          </Button>

          <Link href="/" className="valofont font-medium text-[1.5rem] ml-20">
            PAC.ify
          </Link>
        </div>

        <SearchInput />
        {/* <div className="border rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-[500px] px-3 py-1 border-none outline-none"
            // value={searchQuery}
            // onChange={handleSearchChange}
          />
          <button type="submit" className="p-1 bg-gray-100 hover:bg-gray-200 ">
            <SearchIcon />
          </button>
        </div> */}

        <div
          className={`w-72 flex bg-red-0 justify-start items-center poppins`}
        >
          {/* not logged in */}
          {!loggedInUser ? (
            <Link href="/login" className="flex items-center">
              <Avatar
                className="text-sm"
                sx={{ height: "1.8rem", width: "1.8rem" }}
              >
                U
              </Avatar>
              <p className="flex items-center poppins text-gray-500">
                <span className="mr-1 ml-2 poppins">Hello, User</span>
              </p>
            </Link>
          ) : (
            <>
              {/* logged in */}
              <Button
                className="relative text-black "
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleCategoryButtonClick}
              >
                <Avatar
                  className="text-sm"
                  sx={{ height: "1.8rem", width: "1.8rem" }}
                >
                  {loggedInUser.username[0].toUpperCase()}
                </Avatar>
                <span className="mr-1 ml-2 text-gray-500 poppins">
                  {loggedInUser.username}
                </span>
                <KeyboardArrowDownIcon
                  sx={{ fontSize: "1.3rem", color: "gray" }}
                />

                {loggedInUser.isadmin == true ? (
                  <>
                    <FaCrown className=" rotate-[20deg] text-[rgba(228,176,49,255)] absolute -top-1 left-5 text-[1rem]" />

                    <p className="absolute top-6 right-8 text-[0.8rem] text-[rgba(228,176,49,255)] poppins text-border">
                      admin
                    </p>
                  </>
                ) : (
                  ""
                )}
              </Button>
              <Menu
                className="mt-4 "
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link href={`/profile?uid=${loggedInUser.userId}`}>
                  <MenuItem
                    className="px-4"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    <PersonOutlinedIcon />
                    <p className="ml-1 ">Profile</p>
                  </MenuItem>
                </Link>
                <Link href={`/order?uid=${loggedInUser.userId}`}>
                  <MenuItem
                    className="px-4 mt-2"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    <CategoryOutlinedIcon />
                    <p className="ml-2 poppins pr-3">My Order</p>
                  </MenuItem>
                </Link>
                {loggedInUser.isadmin == true ? (
                  <Link href={`/admin`}>
                    <MenuItem
                      className="px-4 mt-2"
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <ManageAccountsOutlinedIcon />
                      <p className="ml-2 poppins pr-3">Admin Dashboard</p>
                    </MenuItem>
                  </Link>
                ) : (
                  ""
                )}
                <MenuItem onClick={handleOpenmodal} className="px-4 mt-2">
                  <LogoutIcon />
                  <p className="ml-2 poppins">Logout</p>
                </MenuItem>
                <Modal
                  BackdropProps={{
                    style: { backgroundColor: "rgba(0,0 ,0 , 0.7)" },
                  }}
                  open={openmodal}
                  onClose={handleClosemodal}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                >
                  <Box
                    sx={{ ...style }}
                    className="w-[400px] py-7 text-center rounded-lg"
                  >
                    {logoutLoading ? (
                      <div>
                        <CircularProgress size={50} className="text-gray-500" />
                        <p className="text-gray-500 mt-3 text-xl">
                          Logging out
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="poppins font-bold text-2xl ">
                          Logout Confirmation
                        </p>
                        <p className="text-xs poppins mt-2 mb-7 text-gray-500">
                          Are you sure you want to logout?
                        </p>
                        <div className="flex justify-center">
                          <Button
                            type="submit"
                            variant="contained"
                            size="medium"
                            color="primary"
                            className="mr-3"
                            onClick={handleLogout}
                          >
                            {/* <DeleteForeverOutlinedIcon /> */}
                            Logout
                          </Button>
                          <Button
                            variant="outlined"
                            className="ml-3"
                            size="medium"
                            onClick={handleClosemodal}
                          >
                            {/* <ClearOutlinedIcon /> */}
                            Cancel
                          </Button>
                        </div>
                      </>
                    )}
                  </Box>
                </Modal>
              </Menu>
            </>
          )}

          {loggedInUser ? (
            <Link href={`/cart?uid=${loggedInUser.userId}`} className="ml-8">
              <ShoppingBagOutlinedIcon
                sx={{ fontSize: "1.8rem" }}
                className="text-gray-500"
              />
            </Link>
          ) : (
            <Link href="/login" className="ml-8">
              <ShoppingBagOutlinedIcon
                sx={{ fontSize: "1.8rem" }}
                className="text-gray-500"
              />
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
