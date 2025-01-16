"use client";
import ContactInfoSkeleton from "@/components/ContactInfoSkeleton";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const ContactInformation = (props: any) => {
  const {
    profileDataObject,
    register,
    errors,
    reset,
    setValue,
    loading,
    paymentmethod,
    setpaymentmethod,
  } = props;
  const [useProfileData, setuseProfileData] = useState(false);

  function fillProfileData() {
    // setcontactDataObject(profileDataObject);
    setValue("firstName", profileDataObject.firstName);
    setValue("lastName", profileDataObject.lastName);
    setValue("email", profileDataObject.email);
    setValue("phone", profileDataObject.phone);
    setValue("address", profileDataObject.address);
    setValue("city", profileDataObject.city);
  }
  useEffect(() => {
    if (useProfileData && profileDataObject) {
      fillProfileData();
    } else {
      reset();
    }
  }, [useProfileData, profileDataObject]);
  return (
    <div className="w-[100%] h-max bg-white pb-7 mb-20 shadow-md px-10 rounded-2xl">
      {loading ? (
        <ContactInfoSkeleton />
      ) : (
        <>
          <div className="flex items-center justify-between my-4 mb-7">
            <p className="text-xl poppins">Contact Information</p>
            <div className="user-profile-data">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={useProfileData}
                    onChange={() => setuseProfileData((prev) => !prev)}
                  />
                }
                label="Use saved details"
                className="cursor-pointer"
                sx={{ fontSize: ".5rem" }}
              />
            </div>
          </div>
          <div className="name flex justify-between w-full">
            {/* first name */}
            <div className="inp-field text-sm mb-4 flex flex-col flex-1 mr-5 ">
              <p className="mb-1 text-gray-500">First Name</p>
              <TextField
                className="w-full"
                id="outlined-basic"
                variant="outlined"
                size="small"
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "* First name required",
                  },
                })}
              />
              <p className="mr-auto text-xs m-0 text-red-700 mt-1">
                {errors.firstName && String(errors.firstName.message)}
              </p>
            </div>
            {/* last name */}
            <div className="inp-field text-sm mb-4 flex flex-col flex-1 ml-5">
              <p className="mb-1 text-gray-500">Last Name</p>
              <TextField
                className="w-full"
                id="outlined-basic"
                variant="outlined"
                size="small"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "* Last name required",
                  },
                })}
              />
              <p className="mr-auto text-xs m-0 text-red-700 mt-1">
                {errors.lastName && String(errors.lastName.message)}
              </p>
            </div>
          </div>
          {/* email */}
          <div className="inp-field text-sm mb-4 flex flex-col">
            <p className="mb-1 text-gray-500">Email Address</p>
            <TextField
              sx={{ marginRight: "1rem" }}
              className="w-full"
              id="outlined-basic"
              variant="outlined"
              size="small"
              {...register("email", {
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid Email.",
                },
                required: {
                  value: true,
                  message: "* Email required",
                },
              })}
            />
            <p className="mr-auto text-xs m-0 text-red-700 mt-1">
              {errors.email && String(errors.email.message)}
            </p>
          </div>
          {/* Phone */}
          <div className="inp-field text-sm mb-4 flex flex-col">
            <p className="mb-1 text-gray-500">Phone</p>
            <TextField
              sx={{ marginRight: "1rem" }}
              className="w-full"
              id="outlined-basic"
              variant="outlined"
              size="small"
              {...register("phone", {
                pattern: {
                  value: /^\d{10}$/, // Regex for exactly 10 digits
                  message: "Phone number must be exactly 10 digits",
                },
                required: {
                  value: true,
                  message: "* Phone number required",
                },
              })}
            />
            <p className="mr-auto text-xs m-0 text-red-700 mt-1">
              {errors.phone && String(errors.phone.message)}
            </p>
          </div>
          {/* address */}
          <div className="inp-field text-sm mb-4 flex flex-col">
            <p className="mb-1 text-gray-500">Address</p>
            <TextField
              sx={{ marginRight: "1rem" }}
              className="w-full"
              id="outlined-basic"
              variant="outlined"
              size="small"
              {...register("address", {
                required: {
                  value: true,
                  message: "* Address required",
                },
              })}
            />
            <p className="mr-auto text-xs m-0 text-red-700 mt-1">
              {errors.address && String(errors.address.message)}
            </p>
          </div>
          <div className="city-country flex justi">
            {/* city */}
            <div className="inp-field text-sm mb-4 flex flex-col flex-1 mr-5">
              <p className="mb-1 text-gray-500">City</p>
              <TextField
                className="w-full"
                id="outlined-basic"
                variant="outlined"
                size="small"
                {...register("city", {
                  required: {
                    value: true,
                    message: "* City required",
                  },
                })}
              />
              <p className="mr-auto text-xs m-0 text-red-700 mt-1">
                {errors.city && String(errors.city.message)}
              </p>
            </div>
            {/* country */}
            <div className="inp-field text-sm mb-4 flex flex-col flex-1 ml-5">
              <p className="mb-1 text-gray-500">Country</p>
              <TextField
                value={"Nepal"}
                className="w-full"
                id="outlined-basic"
                variant="outlined"
                size="small"
                disabled
              />
            </div>
          </div>
          {/* payment method */}
          <p className="text-gray-500 text-md mb-2">Payment Method</p>
          <div className="payment-method mb-2">
            <FormControlLabel
              control={
                <Checkbox
                  checked={paymentmethod === "cod"}
                  onChange={() => setpaymentmethod("cod")}
                />
              }
              label="Cash on delivery"
              className="cursor-pointer"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={paymentmethod === "esewa"}
                  onChange={() => setpaymentmethod("esewa")}
                />
              }
              label="E-sewa"
              className="cursor-pointer"
            />
          </div>
          <Button variant="contained" type="submit" className="w-full mt-3">
            Confirm Order
          </Button>
        </>
      )}
    </div>
  );
};

export default ContactInformation;
