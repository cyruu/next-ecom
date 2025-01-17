import { Divider, Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminUsers = () => {
  const [userList, setuserList] = useState([]);
  //fucntion get usrrs
  async function getUsers() {
    console.log("function call");

    const { data: resData } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/admin/getusers`
    );
    console.log(resData);
    setuserList(resData.userList);
  }
  useEffect(() => {
    getUsers();
    return () => {
      console.log("unmounting adminusers.tsx");
    };
  }, []);
  return (
    <div className="bg-gray-50 min-h-[100%] px-[50px] py-[60px] flex items-start ">
      {/* pull categories */}
      <div className=" w-[25vw] h-max ml-10">
        <p className="mb-1 text-2xl poppins">USERS</p>
        <Divider className=" bg-black mb-4" />

        {userList && userList.length > 0 ? (
          <>
            {userList.map((user: any) => (
              <div key={user._id}>
                <div className="flex items-center justify-between">
                  <p className="poppins font-extralight text-lg w-[85%]">
                    {user.username}
                  </p>
                  <p className="poppins font-extralight text-lg w-[85%]">
                    {user.email}
                  </p>
                </div>
                <Divider style={{ margin: ".5rem 0" }} />
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
                  className="flex h-9 items-center justify-between mb-1"
                >
                  <Skeleton variant="text" width={100} height={25} />
                  <Skeleton variant="text" width={200} height={25} />
                </div>
                <Divider className="bg-gray" />
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
