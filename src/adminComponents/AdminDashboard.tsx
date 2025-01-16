import axios from "axios";
import React, { useEffect, useState } from "react";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import Image from "next/image";
import categoryImage from "@/adminComponents/dashboardImages/Category.png";
import usersImage from "@/adminComponents/dashboardImages/users.png";
import reviewsImage from "@/adminComponents/dashboardImages/review.png";
import salesImage from "@/adminComponents/dashboardImages/sales.png";
import productsImage from "@/adminComponents/dashboardImages/products.png";

const AdminDashboard = ({ setActiveComponent }: any) => {
  const [dashboardData, setDashboardData] = useState({
    productsCount: "...",
    categoriesCount: "...",
    usersCount: "...",
    allUserReviewsCount: "...",
    total: "...",
  });
  async function getDashboardDetails() {
    const { data: reqBody } = await axios.get("api/admin/dashboarddetails");
    const {
      productsCount,
      categoriesCount,
      usersCount,
      allUserReviewsCount,
      total,
    } = reqBody;
    setDashboardData({
      productsCount,
      categoriesCount,
      usersCount,
      allUserReviewsCount,
      total, //total sales
    });
    console.log(reqBody);
  }

  useEffect(() => {
    getDashboardDetails();
  }, []);
  return (
    <div className="px-[80px] pt-[30px] pb-[90px]  bg-gray-50">
      <p className="mb-16 ml-10 text-2xl poppins">ADMIN DASHBOARD</p>
      <div className="h-[100%] w-[100%] grid grid-cols-3 gap-y-10 ">
        {/* total products */}
        <div
          onClick={() => setActiveComponent("D")}
          className="relative h-[130px] w-[300px] cursor-pointer m-6 bg-white shadow-md hover:shadow-lg transition ease-in-out duration-200 rounded-2xl border"
        >
          <div className="absolute left-8 -top-11 bg-gray-200 overflow-hidden h-28 w-28 rounded-lg flex items-center justify-center  shadow-md">
            <Image
              src={productsImage}
              className="h-28 object-contain  filter contrast-75"
              alt="products"
            />
          </div>
          <p className="absolute bottom-5 right-7 poppins font-medium text-[1.3rem] cursor-pointer">
            Total Products
          </p>
          <p className="absolute right-7 top-5 w-20 text-xl font-light flex justify-end poppins">
            {dashboardData.productsCount}
          </p>
        </div>
        {/* categories */}
        <div
          onClick={() => setActiveComponent("C")}
          className="relative cursor-pointer h-[130px] w-[300px] m-6 bg-white shadow-md hover:shadow-lg transition ease-in-out duration-200 rounded-2xl border"
        >
          <div className="absolute left-8 -top-11 bg-gray-200 h-28 w-28 rounded-lg flex items-center justify-center  shadow-md">
            <Image
              // src="https://cdn-icons-png.freepik.com/256/15483/15483787.png?semt=ais_hybrid"
              // src="./Category.png"
              src={categoryImage}
              className="h-20 object-contain filter contrast-75"
              alt="category"
            />
          </div>
          <p className="absolute bottom-5 right-7 poppins font-medium text-[1.3rem]">
            Categories
          </p>
          <p className="absolute right-7 top-5 w-20 text-xl font-light flex justify-end poppins">
            {dashboardData.categoriesCount}
          </p>
        </div>
        {/* users */}
        <div
          onClick={() => setActiveComponent("F")}
          className="relative cursor-pointer h-[130px] w-[300px] m-6 bg-white shadow-md hover:shadow-lg transition ease-in-out duration-200 rounded-2xl border"
        >
          <div className="absolute left-8 -top-11 bg-gray-200 h-28 w-28 rounded-lg flex items-center justify-center  shadow-md">
            <Image
              // src="https://cdn-icons-png.freepik.com/256/15483/15483787.png?semt=ais_hybrid"
              // src="./Category.png"
              src={usersImage}
              className="h-20 object-contain  filter contrast-75"
              alt="users"
            />
          </div>
          <p className="absolute bottom-5 right-7 poppins font-medium text-[1.3rem]">
            Users
          </p>
          <p className="absolute right-7 top-5 w-20 text-xl font-light flex justify-end poppins">
            {dashboardData.usersCount}
          </p>
        </div>
        {/* reviews */}

        <div
          onClick={() => setActiveComponent("H")}
          className="relative cursor-pointer h-[130px] w-[300px] m-6 bg-white shadow-md hover:shadow-lg transition ease-in-out duration-200 rounded-2xl border"
        >
          <div className="absolute left-8 -top-11 bg-gray-200 h-28 w-28 rounded-lg flex items-center justify-center  shadow-md">
            <Image
              // src="https://cdn-icons-png.freepik.com/256/15483/15483787.png?semt=ais_hybrid"
              // src="./Category.png"
              src={reviewsImage}
              className="h-20 object-contain  filter contrast-75"
              alt="users"
            />
          </div>
          <p className="absolute bottom-5 right-7 poppins font-medium text-[1.3rem]">
            Total Reviews
          </p>
          <p className="absolute right-7 top-5 w-20 text-xl font-light flex justify-end poppins">
            {dashboardData.allUserReviewsCount}
          </p>
        </div>
        {/* // */}
        {/* / */}
        <div className="relative h-[130px] w-[300px] m-6 bg-white shadow-md hover:shadow-lg transition ease-in-out duration-200 rounded-2xl border">
          <div className="absolute left-8 -top-11 bg-gray-200 h-28 w-28 rounded-lg flex items-center justify-center  shadow-md">
            <Image
              // src="https://cdn-icons-png.freepik.com/256/15483/15483787.png?semt=ais_hybrid"
              // src="./Category.png"
              src={salesImage}
              className="h-24 object-contain  filter contrast-75"
              alt="sales"
            />
          </div>
          <p className="absolute bottom-5 right-7  poppins font-medium text-[1.3rem]">
            Total Sales
          </p>
          <p className="absolute right-7 top-5 w-28 text-xl font-light  poppins">
            Rs. {dashboardData.total}
          </p>
        </div>
        {/* // */}
      </div>
    </div>
  );
};

export default AdminDashboard;
