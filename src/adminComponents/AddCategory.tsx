"use client";
import React, { useEffect, useRef, useState } from "react";
import { notify, ProductForm } from "@/index";
import {
  Box,
  Button,
  Divider,
  Modal,
  Skeleton,
  TextField,
} from "@mui/material";
import axios from "axios";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  py: 4,
};

// opened delete modal
function ChildModal({ id, setReloadCategories }: any) {
  const [open, setOpen] = React.useState(false);
  const _id = id;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  async function handleDeleteCategory(e: any) {
    console.log("delete function called");

    const { data: resData } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/admin/deletecategory`,
      {
        _id,
      }
    );
    notify(resData.msg, resData.statusCode);
    if (resData.statusCode === 200) {
      setReloadCategories((prev: any) => !prev); // Trigger category reload after successful edit
      handleClose();
    }
  }
  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleOpen} color="error">
        <DeleteForeverOutlinedIcon />
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, borderRadius: "20px" }}>
          <h2 className="poppins font-extralight text-2xl text-center mb-5">
            Confirm Delete ?
          </h2>
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              variant="contained"
              className="mr-4"
              color="error"
              onClick={handleDeleteCategory}
            >
              <DeleteForeverOutlinedIcon />
              Delete
            </Button>
            <Button
              variant="outlined"
              className="outline-none"
              // className="bg-red-500"
              onClick={handleClose}
            >
              <ClearOutlinedIcon /> Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
function ChildModal2({ id, categoryName, setReloadCategories }: any) {
  const [open, setOpen] = React.useState(false);
  const _id = id;
  //react hook
  const { register, reset, handleSubmit, formState, watch } = useForm<any>();
  const { errors } = formState;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  async function handleEditCategory(data: any, e: any) {
    e.preventDefault();
    const { editCategoryName } = data;

    console.log("name", editCategoryName);

    const { data: resData } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/admin/editcategory`,
      {
        editCategoryName,
        _id,
      }
    );
    notify(resData.msg, resData.statusCode);
    if (resData.statusCode === 200) {
      setReloadCategories((prev: any) => !prev); // Trigger category reload after successful edit
      handleClose();
    }
  }

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        variant="contained"
        className="poppins font-extralight text-base ml-8 mr-4"
      >
        <EditOutlinedIcon className="mr-1" />
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400, borderRadius: "20px" }}>
          <form id="addForm" onSubmit={handleSubmit(handleEditCategory)}>
            <TextField
              className="w-[300px] ml-8 mt-5 poppins font-extralight text-xl"
              label="Category Name"
              variant="outlined"
              defaultValue={categoryName}
              color={errors.editCategoryName ? "error" : "primary"}
              {...register("editCategoryName", {
                pattern: {
                  value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                  message: "Only letters and cannot be spaces-only",
                },
              })}
              required
              // onChange={({ target }) => setEditCategoryName(target.value)}
            />
            <p className="text-xs text-red-700 ml-8">
              {errors.editCategoryName &&
                String(errors.editCategoryName.message)}
            </p>
            <div className="flex ml-8 mt-5 ">
              <Button
                type="submit"
                variant="contained"
                className="poppins font-extralight text-base mr-4"
              >
                <EditOutlinedIcon className="mr-2" />
                Save Edit
              </Button>
              <Button
                variant="outlined"
                // className="bg-red-500"

                onClick={handleClose}
              >
                <ClearOutlinedIcon className="mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const page = () => {
  // const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [reloadCategories, setReloadCategories] = useState(false); // State to trigger category reload

  const [addCategoryShow, setaddCategoryShow] = useState(false);
  const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({});
  //ref for making cursor in the form
  const textFieldRef = useRef<any>(null); // Declare the ref for the TextField input

  //react hook
  const { register, reset, handleSubmit, formState, watch } = useForm<any>();
  const { errors } = formState;

  const [open, setOpen] = React.useState(false);
  // Function to handle opening a specific modal
  const handleOpen = (id: any, categoryName: string) => {
    setOpenModals((prev) => ({ ...prev, [id]: true }));
  };

  // Function to handle closing a specific modal
  const handleClose = (id: any) => {
    setOpenModals((prev) => ({ ...prev, [id]: false }));
  };
  //getcategoriew function
  async function getCategories() {
    const { data: resData } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/getcategory`
    );
    console.log(resData);
    setCategoryList(resData.categoryList);
  }

  async function handleAddCategory(data: any, e: any) {
    e.preventDefault();
    const { categoryName } = data;
    const { data: resData } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/addcategory`,
      {
        categoryName,
      }
    );
    notify(resData.msg, resData.statusCode);
    reset();
    setReloadCategories((prev: any) => !prev); // Trigger category reload after successful edit
  }

  function showAdd() {
    setaddCategoryShow((prev) => !prev);
    if (textFieldRef.current) {
      textFieldRef.current.focus(); // Focus on the TextField when toggled on
    }
    // console.log("this is ", addCategoryShow);
  }
  useEffect(() => {
    getCategories();
  }, [reloadCategories]);
  return (
    <div className=" min-h-[90vh] px-[50px] py-[60px] flex items-start ">
      {/* pull categories */}
      <div className=" w-[25vw] h-max ml-10">
        <div className="title-addcategory flex justify-between items-center ">
          <p className=" mb-1 text-2xl poppins">CATEGORIES</p>
          {/* Always show the Add Category button */}
          <div className="flex">
            <p
              onClick={showAdd}
              className="addButton poppins font-light text-md cursor-pointer text-blue-500 hover:text-blue-400"
            >
              + Add Category
            </p>
          </div>
        </div>
        <Divider className=" bg-black mb-5" />

        {categoryList && categoryList.length > 0 ? (
          <>
            {categoryList.map((category: any) => (
              <div key={category._id} className="">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="poppins font-light text-lg w-[85%]">
                    {category.categoryName}
                  </p>
                  <button
                    onClick={() =>
                      handleOpen(category._id, category.categoryName)
                    }
                    className="w-[30px] h-[30px] rounded-[50%] transition duration-300 ease-in-out hover:rotate-45 hover:scale-110"
                  >
                    <SettingsOutlinedIcon
                      sx={{ color: "black", fontSize: "1.4rem" }}
                    />
                  </button>
                  <Modal
                    BackdropProps={{
                      style: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
                    }}
                    open={!!openModals?.[category._id]}
                    onClose={() => handleClose(category._id)}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box sx={{ ...style, width: 400, borderRadius: "20px" }}>
                      <TextField
                        className="w-[300px] ml-8 mt-5 mb-5 poppins font-extralight text-xl"
                        label="Category Name"
                        variant="outlined"
                        value={category.categoryName}
                        aria-readonly={true}
                        InputProps={{
                          readOnly: true, // Set this to make the TextField readonly
                        }}
                      />
                      <div className="flex">
                        {/* initial edit button modal with ml-8 mr-4*/}
                        <ChildModal2
                          id={category._id}
                          categoryName={category.categoryName}
                          setReloadCategories={setReloadCategories}
                        />
                        {/* initial delete button modal */}
                        <ChildModal
                          id={category._id}
                          setReloadCategories={setReloadCategories}
                        />
                      </div>
                    </Box>
                  </Modal>
                </div>
                <Divider sx={{ margin: ".5rem 0" }} />
              </div>
            ))}
          </>
        ) : (
          <div>
            {/* Skeleton loader for categories */}
            {[...Array(5)].map((_, index) => (
              <>
                <div
                  key={index}
                  className="flex h-10 items-center justify-between mb-1"
                >
                  <Skeleton variant="text" width={300} height={30} />
                  <Skeleton variant="circular" width={30} height={30} />
                </div>
                <Divider className="bg-gray" />
              </>
            ))}
          </div>
        )}
      </div>

      {/* categorey add */}
      <form
        id="addForm"
        onSubmit={handleSubmit(handleAddCategory)}
        className={`addForm bg-green ml-32 flex-col ${
          addCategoryShow ? "flex" : "hidden"
        }`}
      >
        <p className="mb-1 ml-8 text-2xl poppins">ADD CATEGORY</p>

        <TextField
          inputRef={textFieldRef} // Attach ref for focusing
          className="w-[300px] ml-8 mt-5 poppins font-extralight text-xl"
          label="Category Name"
          variant="outlined"
          color={errors.categoryName ? "error" : "primary"}
          {...register("categoryName", {
            pattern: {
              value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
              message: "Only letters and cannot be spaces-only",
            },
          })}
          required
          // onChange={({ target }) => setCategoryName(target.value)}
        />
        <p className="text-xs text-red-700 ml-8">
          {errors.categoryName && String(errors.categoryName.message)}
        </p>
        <Button
          type="submit"
          variant="contained"
          className="poppins font-extralight text-base w-[200px] ml-8 mt-5"
        >
          Add category
        </Button>
      </form>
    </div>
  );
};

export default page;
