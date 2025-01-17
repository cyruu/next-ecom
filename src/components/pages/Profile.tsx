"use client";
import { notify, ProfileSkeleton, removeSidebar } from "@/index";
import { ClassNames } from "@emotion/react";
import { Avatar, Button, TextField } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const Profile = () => {
  const search = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("User");
  const [createdData, setcreatedDate] = useState<any>(0);
  const uid = search ? search.get("uid") : null;
  // input fields
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");

  const [editEnabled, setEditEnabled] = useState(false);
  // get user data
  async function getUserData() {
    setLoading(true);
    const { data: resData } = await axios.post("api/users/getuserdata", {
      uid,
    });
    setemail(resData.userData[0].email);
    setUsername(resData.userData[0].username);
  }
  // get profile details data
  async function getProfileData() {
    const { data: resData } = await axios.post("api/users/getprofiledata", {
      uid,
    });
    console.log("profile data", resData);

    // profile Data found
    if (resData.statusCode == 200) {
      const { profileData } = resData;
      setfirstName(profileData.firstName);
      setlastName(profileData.lastName);
      setphone(profileData.phone);
      setaddress(profileData.address);
      setcity(profileData.city);
    }
    setLoading(false);
  }
  // handle save
  async function handleSave() {
    setEditEnabled((prev: any) => !prev);
    const { data: resData } = await axios.post("api/users/setprofiledata", {
      uid,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
    });
    if (resData.statusCode == 200) {
      notify(resData.msg, resData.statusCode);
    }
  }
  useEffect(() => {
    getUserData();
    getProfileData();
    removeSidebar();
  }, [uid]);

  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <ToastContainer />
      <div className="profile-container w-[80%] h-[90%] bg-white rounded-lg shadow-md px-10 py-6">
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <>
            {/* first */}
            <div className="profile-first w-full  flex items-center justify-between">
              <div className="pic-name flex items-center">
                <Avatar sx={{ height: "100px", width: "100px" }}>
                  <span className="text-5xl"> {username[0].toUpperCase()}</span>
                </Avatar>
                <div className="name-email ml-4 ">
                  <p className="text-lg font-bold poppins">{username}</p>
                  <p className="text-xs poppins text-gray-500">{email}</p>
                </div>
              </div>
              <Button
                variant="contained"
                disabled={editEnabled}
                onClick={() => setEditEnabled(true)}
              >
                Edit
              </Button>
            </div>
            {/* second */}
            <div className="form-container mt-6">
              <form className="grid grid-cols-2 gap-7">
                <div className="first-name flex flex-col ">
                  <label
                    htmlFor="firstname"
                    className="cursor-pointer mb-1 text-gray-600"
                  >
                    First Name
                  </label>
                  <TextField
                    value={firstName}
                    onChange={({ target }) => setfirstName(target.value)}
                    disabled={!editEnabled}
                    className={`${!editEnabled ? "bg-gray-50" : ""} `}
                    autoComplete="off"
                    size="small"
                    variant="outlined"
                    type="text"
                    id="firstname"
                  />
                </div>
                <div className="last-name flex flex-col ">
                  <label
                    htmlFor="lastname"
                    className="cursor-pointer mb-1 text-gray-600"
                  >
                    Last Name
                  </label>
                  <TextField
                    value={lastName}
                    onChange={({ target }) => setlastName(target.value)}
                    disabled={!editEnabled}
                    className={`${!editEnabled ? "bg-gray-50" : ""} `}
                    autoComplete="off"
                    size="small"
                    variant="outlined"
                    type="text"
                    id="lastname"
                  />
                </div>
                <div className="phone flex flex-col ">
                  <label
                    htmlFor="phone"
                    className="cursor-pointer mb-1 text-gray-600"
                  >
                    Phone
                  </label>
                  <TextField
                    value={phone}
                    onChange={({ target }) => setphone(target.value)}
                    disabled={!editEnabled}
                    className={`${!editEnabled ? "bg-gray-50" : ""} `}
                    autoComplete="off"
                    size="small"
                    variant="outlined"
                    type="text"
                    id="phone"
                  />
                </div>
                <div className="address flex flex-col ">
                  <label
                    htmlFor="address"
                    className="cursor-pointer mb-1 text-gray-600"
                  >
                    Address
                  </label>
                  <TextField
                    value={address}
                    onChange={({ target }) => setaddress(target.value)}
                    disabled={!editEnabled}
                    className={`${!editEnabled ? "bg-gray-50" : ""} `}
                    autoComplete="off"
                    size="small"
                    variant="outlined"
                    type="text"
                    id="address"
                  />
                </div>
                <div className="city flex flex-col ">
                  <label
                    htmlFor="city"
                    className="cursor-pointer mb-1 text-gray-600"
                  >
                    City
                  </label>
                  <TextField
                    value={city}
                    onChange={({ target }) => setcity(target.value)}
                    disabled={!editEnabled}
                    className={`${!editEnabled ? "bg-gray-50" : ""} `}
                    autoComplete="off"
                    size="small"
                    variant="outlined"
                    type="text"
                    id="city"
                  />
                </div>
                <div className="country flex flex-col ">
                  <label
                    htmlFor="country"
                    className="cursor-pointer mb-1 text-gray-600"
                  >
                    Country
                  </label>
                  <TextField
                    className="bg-gray-50"
                    autoComplete="off"
                    size="small"
                    variant="outlined"
                    type="text"
                    id="country"
                    value="Nepal"
                    disabled
                  />
                </div>
                <p className="text-md text-gray-500">
                  * This information is automatically used as checkout details.
                </p>
              </form>
              <Button
                variant="contained"
                disabled={!editEnabled}
                onClick={handleSave}
                className="mt-6"
              >
                Save Changes
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
