"use client";
import React, { useState } from "react";
import AddProduct from "@/adminComponents/AddProduct";
// import EditProducts from "@/adminComponents/EditProducts";
import AddCategory from "@/adminComponents/AddCategory";
import AdminProductList from "@/adminComponents/AdminProductList";
import AdminDashboard from "@/adminComponents/AdminDashboard";
import AdminSidebar from "@/adminComponents/AdminSidebar";
import AdminUsers from "@/adminComponents/AdminUsers";
import AdminEditProduct from "@/adminComponents/AdminEditProduct";
import { AdminReviewList } from "@/index";
import { ToastContainer } from "react-toastify";

const page = () => {
  const [editProduct, seteditProduct] = useState<any>({});
  const [activeComponent, setActiveComponent] = useState("E");
  const renderComponent = () => {
    switch (activeComponent) {
      case "A":
        return <AddProduct />;
      case "C":
        return <AddCategory />;
      case "D":
        return (
          <AdminProductList
            seteditProduct={seteditProduct}
            setActiveComponent={setActiveComponent}
          />
        );
      case "E":
        return <AdminDashboard setActiveComponent={setActiveComponent} />;
      case "F":
        return <AdminUsers />;
      // only accessible after clicking on a rpoduct by admin
      case "G":
        return <AdminEditProduct editProduct={editProduct} />;
      case "H":
        return <AdminReviewList />;
      default:
    }
  };
  return (
    <div className="flex min-h-[90vh]">
      <ToastContainer />
      <div className="w-[290px] min-h-full fixed top-10 pt-5 left-0  bg-gray-300">
        <AdminSidebar setActiveComponent={setActiveComponent} />
      </div>
      <div className="w-full min-h-[100vh] bg-white ml-[290px]">
        {renderComponent()}
      </div>
    </div>
  );
};

export default page;
