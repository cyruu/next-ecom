import React, { useEffect, useState } from "react";
import { Card, notify, products } from "@/index";
import axios from "axios";
import { CardSkeleton } from "@/index";
import AdminCard from "./AdminCard";
import { Box, Button, Modal } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Link from "next/link";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 0,
  pt: 2,
  px: 4,
  pb: 3,
};

const ProductLIstRow = ({ setActiveComponent, seteditProduct }: any) => {
  let ProductCount = [1, 2, 3, 4, 5, 6, 7, 8];
  const [productsList, setproductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  async function handleProductEdit(product: any) {
    console.log("edit function called");
    seteditProduct(product);
    setActiveComponent("G");
  }
  // product delete function
  async function handleDeleteProduct(_id: any) {
    console.log("delete function called");

    const { data: resData } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/admin/deleteproduct`,
      {
        _id,
      }
    );
    notify(resData.msg, resData.statusCode);
    if (resData.statusCode === 200) {
      setproductsList(resData.productList);
      // setReloadCategories((prev: any) => !prev); // Trigger category reload after successful edit
      handleClose();
    }
  }
  async function getProducts() {
    setLoading(true);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/getproducts`
    );
    // console.log(data);

    setproductsList(data.ProductsList);
    setLoading(false);
  }
  useEffect(() => {
    getProducts();
  }, [productsList.length]);
  return (
    <div className="cardListOneRow px-10 py-5 rounded-xl flex flex-col w-full h-max shadow-md">
      <p className=" ml-10 mb-3 text-2xl poppins">PRODUCTS</p>

      <div className="cardListRow grid gap-6 items-start grid-cols-4">
        {loading
          ? ProductCount.map((el) => (
              <>
                <div className="">
                  <CardSkeleton key={el} />
                </div>
              </>
            ))
          : productsList.map((Product: any) => (
              <div
                key={Product._id}
                className="group relative w-[250px] h-[300px] rounded-lg  "
              >
                <div className="bg-[rgba(0,0,0,0.2)] hidden  flex-col items-center justify-center ease absolute z-10 top-0 left-0 w-[250px] h-[300px] rounded-lg group-hover:flex">
                  <Button
                    variant="contained"
                    sx={{}}
                    className="mb-5 transition-all ease-in-out duration-150 hover:scale-110"
                    onClick={() => handleProductEdit(Product)}
                  >
                    <EditOutlinedIcon className="mr-1" />
                    Edit
                  </Button>
                  {/* //modal button */}
                  <Button
                    variant="contained"
                    sx={{}}
                    className="bg-red-500 transition-all ease-in-out duration-150 hover:scale-110"
                    onClick={handleOpen}
                  >
                    <DeleteForeverOutlinedIcon className="mr-1" />
                    Remove
                  </Button>
                  <Modal
                    BackdropProps={{
                      style: { backgroundColor: "rgba(0,0 ,0 , 0.05)" },
                    }}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                  >
                    <Box sx={{ ...style, width: 300, borderRadius: "20px" }}>
                      <h2 className="poppins font-extralight text-2xl text-center mb-5">
                        Confirm Delete ?
                      </h2>
                      <div className="flex justify-between">
                        <Button
                          type="submit"
                          variant="contained"
                          className="bg-green-500"
                          onClick={() => handleDeleteProduct(Product._id)}
                        >
                          <DeleteForeverOutlinedIcon />
                          DELETE
                        </Button>
                        <Button
                          variant="contained"
                          className="bg-red-500"
                          onClick={handleClose}
                        >
                          <ClearOutlinedIcon />
                          CANCEL
                        </Button>
                      </div>
                    </Box>
                  </Modal>

                  {/* //modal end */}
                </div>
                <div className="bg-blue-500 w-[250px] h-max rounded-lg transition ease-in-out duration-500 ">
                  <AdminCard key={Product._id} product={Product} />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProductLIstRow;
