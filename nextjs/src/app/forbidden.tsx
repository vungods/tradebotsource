"use client";

import ErrorPage from "@/components/ErrorPage";

export default function ForbiddenPage() {
  return <ErrorPage errorCode={403} errorMessage={"Forbidden"} />;
}
