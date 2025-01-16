"use client";
import { notify, removeSidebar } from "@/index";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
const Login = () => {
  const [loading, setLoading] = useState<boolean | null>(false);
  const router = useRouter();
  // react hook form
  const { register, handleSubmit, formState, watch } = useForm<any>();
  const { errors } = formState;
  useEffect(() => {
    removeSidebar();
  }, []);

  async function submit(data: any) {
    setLoading(true);
    const { username, password } = data;
    const { data: resData } = await axios.post("/api/users/login", {
      username,
      password,
    });
    // const { data: resData } = await axios.post("/api/users/login", {
    //   username: "asur12345",
    //   password: "asur12345",
    // });
    notify(resData.msg, resData.statusCode);
    if (resData.statusCode == 200) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
    setLoading(false);
  }
  return (
    <form
      className="w-screen h-[90vh] flex justify-center  items-center"
      onSubmit={handleSubmit(submit)}
    >
      <ToastContainer />
      <div className="w-[500px] flex flex-col bg-white  px-10 pb-10 rounded-2xl shadow-md">
        <p className="text-4xl font-bold mx-auto my-5">Login</p>
        {/* username */}
        <TextField
          className="mt-6"
          // autoComplete="off"
          id="standard-basic"
          label="Username"
          variant="standard"
          color={errors.username ? "error" : "primary"}
          {...register("username", {
            pattern: {
              value: /^[a-zA-Z0-9]{5,}$/,
              message: "Username must be at least 5 characters",
            },
            required: {
              value: true,
              message: "* Username required",
            },
          })}
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1">
          {errors.username && String(errors.username.message)}
        </p>
        {/* password */}
        <TextField
          className="mt-6"
          // autoComplete="off"
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          color={errors.password ? "error" : "primary"}
          {...register("password", {
            pattern: {
              value: /^[a-zA-Z0-9@]{8,}$/,
              message: "Must contain at least 8 characters",
            },
            required: {
              value: true,
              message: "* Password required",
            },
          })}
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1">
          {errors.password && String(errors.password.message)}
        </p>
        {/* button */}
        {loading ? (
          <LoadingButton
            size="large"
            color="error"
            loading={loading}
            loadingPosition="end"
            variant="contained"
            className="mt-7"
          >
            <span className="">Log In</span>
          </LoadingButton>
        ) : (
          <Button variant="contained" type="submit" className="mt-7">
            Log In
          </Button>
        )}
        <p className="mt-3 text-sm">
          Don't have account?{" "}
          <Link href="/signup" className="font-bold underline text-blue-500">
            Register here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
