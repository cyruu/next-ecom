import React from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import RateReviewIcon from "@mui/icons-material/RateReview";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import ViewListIcon from "@mui/icons-material/ViewList";
import Image from "next/image";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import logo from "@/app/favicon.ico";
import { Height } from "@mui/icons-material";

const AdminSidebar = ({ setActiveComponent }: any) => {
  return (
    <div className="w-[100%] h-[100%] flex flex-col  font-light text-[1.1rem]">
      <div className="flex justify-center items-center py-5">
        <Image
          src={logo}
          alt="pacify"
          className="rounded-full mr-3 h-[100px] w-[100px]"
        />
        <div className="">
          <p className="valofont text-[1.5rem]">PAC.IFY</p>
          <p className="text-gray-600 text-xs ">Admin</p>
        </div>
      </div>
      <button
        className="adminSideButtons"
        onClick={() => setActiveComponent("E")}
      >
        <DashboardOutlinedIcon />
        <p>Dashboard</p>
      </button>
      <button
        className="adminSideButtons"
        onClick={() => setActiveComponent("D")}
      >
        <ViewListIcon />
        <p>Products</p>
      </button>
      <button
        className="adminSideButtons"
        onClick={() => setActiveComponent("H")}
      >
        <RateReviewIcon />
        <p>Reviews</p>
      </button>
      <button
        className="adminSideButtons"
        onClick={() => setActiveComponent("A")}
      >
        <AddBoxOutlinedIcon />
        <p>Add product</p>
      </button>
      {/* <button
        className="adminSideButtons"
        onClick={() => setActiveComponent("B")}
      >
        <DriveFileRenameOutlineOutlinedIcon />
        <p>Edit product</p>
      </button> */}
      <button
        className="adminSideButtons"
        onClick={() => setActiveComponent("C")}
      >
        <CategoryIcon />
        <p>Categoies</p>
      </button>
      <button
        className="adminSideButtons"
        onClick={() => setActiveComponent("F")}
      >
        <SupervisedUserCircleOutlinedIcon />
        <p>Users</p>
      </button>
    </div>
  );
};

export default AdminSidebar;
