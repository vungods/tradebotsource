"use client";

import ErrorPage from "@/components/ErrorPage";
export default function NotFound() {
  return <ErrorPage errorCode={404} errorMessage={"Not found"} />;
}
