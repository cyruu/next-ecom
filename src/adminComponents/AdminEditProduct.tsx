import { notify } from "@/helper/notify";
import { Button, Menu, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const AdminEditProduct = ({ editProduct }: any) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState<any>(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [displayCategoryValue, setDisplayCategoryValue] = useState("SELECT");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [categoryList, setCategoryList] = useState([]);
  // category button handle
  const open = Boolean(anchorEl);
  const handleCategoryButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  // choose an category
  const handleCategoryChoose = (e: any) => {
    setDisplayCategoryValue(e.target.innerText);
    const matchedCategory: any = categoryList.find(
      (category: any) => category.categoryName == e.target.innerText
    );
    setCategory(String(matchedCategory._id));
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { data: resData } = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/admin/editproduct`,
        {
          productId: editProduct._id,
          productName: name,
          categoryId: category,
          price,
          image,
          stock,
          description,
        }
      );

      notify(resData.msg, resData.statusCode);
      if (resData.statusCode == 200) {
        setName("");
        setCategory("");
        setPrice("");
        setImage("");
        setStock("");
        setDisplayCategoryValue("SELECT");
        setDescription("");
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  // function to get all catefoires form db
  async function getCategories(editProduct: any) {
    const { data: resData } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/getcategory`
    );
    // console.log(resData);

    setCategoryList(resData.categoryList);
    const tempcategoryList = resData.categoryList.filter(
      (category: any) => category._id == editProduct.categoryId
    );
    // console.log("templist", tempcategoryList);
    setDisplayCategoryValue(tempcategoryList[0].categoryName);
    // console.log("templist name", tempcategoryList[0].categoryName);
  }

  // get all categories
  useEffect(() => {
    getCategories(editProduct);
    setName(editProduct.productName);
    setCategory(editProduct.categoryId);
    setPrice(editProduct.price);
    setImage(editProduct.image);
    setStock(editProduct.stock);
    setDisplayCategoryValue("select");
    setDescription(editProduct.description);
  }, [editProduct]);
  return (
    <div className="bg-gray-50 h-[100%] px-[50px] py-[30px]">
      <p className=" ml-10 mb-1 text-2xl poppins">PRODUCT EDIT</p>
      <div className=" flex">
        <form onSubmit={handleSubmit} className=" w-[50%] ml-10">
          {/* <img src={image} alt="" className="h-[100px] " /> */}
          <div className="my-3 ">
            {/* <label>Product Name:</label> */}
            <TextField
              label="Product Name"
              variant="outlined"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-[90%]"
            />
          </div>

          <div className="my-3 ">
            {/* <label>Image:</label> */}
            <TextField
              label="Image"
              variant="outlined"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="w-[90%]"
            />
          </div>
          <div className="my-3 ">
            {/* <label>Description:</label> */}
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="w-[90%]"
            />
          </div>
          <div className="">
            <label htmlFor="">Category : </label>
            <Button
              className="text-black bg-gray-200 "
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleCategoryButtonClick}
            >
              {displayCategoryValue}
              <ArrowDropDownIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {categoryList.map((category: any) => {
                return (
                  <MenuItem
                    className="px-4"
                    onClick={handleCategoryChoose}
                    key={category.categoryName}
                  >
                    {category.categoryName}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
          <div className="my-3 ">
            {/* <label>Stock:</label> */}
            <TextField
              label="Stock"
              variant="outlined"
              type="number"
              value={stock}
              onChange={(e: any) => setStock(e.target.value)}
              required
              className="w-30%"
            />
          </div>
          <div className="my-3">
            {/* <label>Price:</label> */}
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              value={price}
              onChange={(e: any) => setPrice(e.target.value)}
              required
              className="w-30%"
            />
          </div>

          <Button variant="contained" className="Addproduct" type="submit">
            SAVE EDIT
          </Button>
        </form>
        {/* //card section */}
        <div className="px-[100px] py-[30px]">
          <div
            // onClick={handleClick}
            className="w-[250px] p-3 h-max  bg-white cursor-pointer rounded-lg shadow-md transition-all ease duration-300 "
          >
            {/* image container */}
            <div className="imageContainer bg-gray-200 rounded-lg  overflow-hidden w-full ">
              <img
                className="w-[200px] h-[220px] m-auto object-contain mix-blend-multiply filter "
                src={
                  image
                    ? image
                    : "https://imgvisuals.com/cdn/shop/products/animated-download-linear-ui-icon-775658.gif?v=1697071115"
                }
                alt={name}
              />
            </div>
            {/* product name price */}
            <div className="details mt-3 flex justify-between items-start w-full poppin text-sm">
              <p className="font-light">{name ? name : "Product"}</p>
              <p className=" w-[75px] flex justify-end">
                Rs. {price ? price : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
