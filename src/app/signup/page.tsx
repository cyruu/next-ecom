"use client";
import { notify, removeSidebar } from "@/index";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

const Signup = () => {
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
    const { username, email, password } = data;
    const { data: resData } = await axios.post("api/users/signup", {
      username,
      email,
      password,
    });
    // const { data: resData } = await axios.post("api/users/signup", {
    //   username: "asur12345",
    //   email: "asur@gmail.com",
    //   password: "asur12345",
    // });
    notify(resData.msg, resData.statusCode);
    if (resData.statusCode == 200) {
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
    setLoading(false);
  }

  return (
    <form
      className="h-[90vh] w-screen flex justify-center items-center"
      onSubmit={handleSubmit(submit)}
    >
      <ToastContainer />
      <div className="w-[500px] flex flex-col bg-white  px-10 pb-10 rounded-2xl shadow-md">
        <p className="text-4xl font-bold mx-auto mt-5">Signup</p>
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
              message: "*Username required",
            },
          })}
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1">
          {errors.username && String(errors.username.message)}
        </p>
        {/* email */}
        <TextField
          className="mt-6"
          // autoComplete="off"
          id="standard-basic"
          label="Email Address"
          color={errors.email ? "error" : "primary"}
          {...register("email", {
            required: {
              value: true,
              message: "* Email required",
            },
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid Email.",
            },
          })}
          variant="standard"
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1">
          {errors.email && String(errors.email.message)}
        </p>
        {/* password */}
        <TextField
          className="mt-6"
          // autoComplete="off"
          id="standard-basic"
          label="Password"
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
          type="password"
          variant="standard"
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1">
          {errors.password && String(errors.password.message)}
        </p>
        {/* confirm password */}
        <TextField
          className="mt-6"
          // autoComplete="off"
          id="standard-basic"
          label="Confirm Password"
          color={errors.cpassword ? "error" : "primary"}
          {...register("cpassword", {
            required: {
              value: true,
              message: "* Confirm password required",
            },
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          type="password"
          variant="standard"
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1">
          {errors.cpassword && String(errors.cpassword.message)}
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
            <span className="">Sign Up</span>
          </LoadingButton>
        ) : (
          <Button variant="contained" type="submit" className="mt-7">
            Signup
          </Button>
        )}
        <p className="mt-3 text-sm">
          Already have account?{" "}
          <Link href="/login" className="font-bold underline text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
