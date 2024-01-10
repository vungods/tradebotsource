"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import ForbiddenPage from "forbidden";

type AllowedRoles = string[];

const checkAccess = (
  WrappedComponent: React.ComponentType<any>,
  allowedRoles: AllowedRoles
) => {
  const CheckAccessComponent: React.FC<any> = (props) => {
    const router = useRouter();
    const role = useSelector((state: RootState) => state.userReducer.role);
    if (!role) {
      router.push("/login");
      return;
    } else if (!allowedRoles.includes(role)) {
      return <ForbiddenPage />;
    }
    return <WrappedComponent {...props} />;
  };
  return CheckAccessComponent;
};

export default checkAccess;
