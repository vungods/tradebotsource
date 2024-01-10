"use client";
import React from "react";
import ApplicationLogo from "./ApplicationLogo";
import Dropdown from "@/components/Dropdown";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/userSlice";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";

const Header = () => {
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onLogout = async () => {
    try {
      dispatch(logout());
      toast.success("Logout Success");
      router.push("/login");
    } catch (err) {
      toast.error("Logout Error");
    }
  };

  const pathname = usePathname();
  // Nếu là trang login thì không hiển thị header
  if (pathname === "/login") {
    return null;
  }

  return (
    <header className="relative my-16">
      <div className="bg-white border-b border-gray-100 flex items-center justify-between fixed w-full z-50 shadow-lg shadow-gray-300/40 top-0 left-0 right-0">
        <div className="flex items-center">
          <div className="shrink-0 flex items-center py-2 px-3">
            <a href="/">
              <ApplicationLogo width={60} />
            </a>
          </div>
          {/* Các Dropdown đã được loại bỏ */}
        </div>
        <div className="flex items-center py-2 px-3">
          <p className="text-gray-600 mr-4">
            Logged in as{" "}
            <span className="text-xl font-medium">{user}</span>
          </p>
          <button className="text-gray-600" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;