import React, { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "@/index";
import { Button, TextField } from "@mui/material";
import { ToastContainer } from "react-toastify";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const ProductForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [displayCategoryValue, setDisplayCategoryValue] =
    useState("Choose Category");
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
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/addproduct`,
        {
          productName: name,
          categoryId: category,
          price,
          image,
          stock,
          description,
        }
      );

      notify(resData.msg, resData.statusCode);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // function to get all catefoires form db
  async function getCategories() {
    const { data: resData } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/getcategory`
    );
    console.log(resData);
    setCategoryList(resData.categoryList);
  }

  // get all categories
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <div>
        <label>Name:</label>
        <TextField
          variant="outlined"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Stock:</label>
        <TextField
          variant="outlined"
          type="number"
          value={stock}
          onChange={(e: any) => setStock(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <TextField
          variant="outlined"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="">Category</label>
        <Button
          className="text-black"
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
      <div>
        <label>Price:</label>
        <TextField
          variant="outlined"
          type="number"
          value={price}
          onChange={(e: any) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <TextField
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button variant="contained" className="Addproduct" type="submit">
        Add Product
      </Button>
    </form>
  );
};

export default ProductForm;
