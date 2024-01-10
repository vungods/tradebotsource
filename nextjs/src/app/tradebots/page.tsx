import React from "react";
import TradeBotTable from "./components/TradeBotTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Loading";

function TradeBot() {
  return (
    <div className="h-full min-h-screen">
      <TradeBotTable />
      <ToastContainer />
      <Loading isLoading={false} />
    </div>
  );
}

export default TradeBot;
