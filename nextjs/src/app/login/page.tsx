"use client";
import React, { useState, useEffect } from "react";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import PrimaryButton from "@/components/PrimaryButton";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { login } from "../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface FormData {
  username: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const [data, setData] = useState<FormData>({
    username: "",
    password: "",
  });
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, []);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const body = {
        username: data.username,
        password: data.password,
      };
      try {
        const response = await axios.post(
          `${process.env.APP_API_URL}api/user_login/auth/login/`,
          body
        );
        console.log("Response:", response.data);
        if (response) {
          dispatch(
            login({
              token: response?.data.access_token,
              user: response?.data.user,
              role: response?.data.role,
            })
          );
        }
        router.push("/");
      } catch (error) {
        console.error("Error:", error);
      }
    } catch (error: any) {
      if (error) {
        const messages = error?.response?.data?.message;
        if (Array.isArray(messages)) {
          toast.error(messages.join("\n"));
        } else {
          toast.error(error?.response?.data?.message);
        }
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <h2 className="text-center font-bold">
        <span className="text-lg block capitalize">TRADING REALTIME</span>
        <span className="text-xl block">SUPPORT TRADING SYSTEM</span>
      </h2>
      <div className="mt-4">
        <InputLabel forInput="username" value="Username">
          Username
        </InputLabel>
        <TextInput
          id="username"
          type="text"
          name="username"
          value={data.username}
          className="mt-1 block w-full"
          autoComplete="username"
          handleKeyDown={handleKeyDown}
          handleChange={onHandleChange}
          required={true}
          placeHolder={"Username"}
        />
      </div>

      <div className="mt-4">
        <InputLabel forInput="password" value="Password">
          Password
        </InputLabel>
        <TextInput
          id="password"
          type="password"
          name="password"
          className="mt-1 block w-full"
          autoComplete="current-password"
          handleKeyDown={handleKeyDown}
          handleChange={onHandleChange}
          value={data.password}
          required={true}
          placeHolder={"Password"}
        />
      </div>

      <div className="flex items-center justify-end mt-4">
        <PrimaryButton
          type="submit"
          processing={false}
          className="ml-4"
          onClick={handleLogin}
        >
          Login
        </PrimaryButton>
      </div>

      <ToastContainer />
    </>
  );
}
