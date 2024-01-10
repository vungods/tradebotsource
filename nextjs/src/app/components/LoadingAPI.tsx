import React from "react";
import Loading from "./Loading";

interface LoadingAPIProps {
  loading: boolean;
  width?: string;
  children: React.ReactNode;
}
const LoadingAPI = (props: LoadingAPIProps) => {
  return (
    <>
      <Loading isLoading={props.loading} />
      <>{props?.children}</>
    </>
  );
};
export default LoadingAPI;
