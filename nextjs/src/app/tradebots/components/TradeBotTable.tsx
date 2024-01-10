"use client"

import React, { useEffect, useState } from "react";
import requestApi, { requestApiProps } from "helpers/api";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

interface TradeBot {
    id: number;
    name: string;
    description: string;
    model_name: string; 
    ticket_name: string; 
  }
  

const TradeBotTable = () => {
  const [tradebots, setTradeBots] = useState<TradeBot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTradeBots = async () => {
    const request: requestApiProps = {
      endpoint: "api/tradebots/tradebots_user/1",
      method: "GET",
      params: { skip: 0, limit: 1000 }, 
      body: {},
      responseType: "json", 
    };

    try {
      const response = await requestApi(request);
      setTradeBots(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Lỗi khi lấy danh sách tradebots:", error);
      toast.error("Có lỗi xảy ra khi lấy danh sách tradebots.");
    }
  };

  useEffect(() => {
    getTradeBots();
  }, []);

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Danh sách Trade Bots</h1>
      <table className="w-3/4 mx-auto table-auto border-collapse border border-black">
        <thead>
          <tr>
            <th className="border border-black px-4 py-2">ID</th>
            <th className="border border-black px-4 py-2">Name</th>
            <th className="border border-black px-4 py-2">Description</th>
            <th className="border border-black px-4 py-2">Model Name</th>
            <th className="border border-black px-4 py-2">Ticket Name</th>
            <th className="border border-black px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6}><Loading isLoading={true} /></td>
            </tr>
          ) : tradebots.length === 0 ? (
            <tr><td colSpan={6}>Không có dữ liệu</td></tr>
          ) : (
            tradebots.map((tradebot) => (
              <tr key={tradebot.id}>
                <td className="text-2xl font-semibold mb-4 border border-black px-4 py-2">{tradebot.id}</td>
                <td className="text-2xl font-semibold mb-4 border border-black px-4 py-2">{tradebot.name}</td>
                <td className="text-2xl font-semibold mb-4 border border-black px-4 py-2">{tradebot.description}</td>
                <td className="text-2xl font-semibold mb-4 border border-black px-4 py-2">{tradebot.model_name}</td>
                <td className="text-2xl font-semibold mb-4 border border-black px-4 py-2">{tradebot.ticket_name}</td>
                <td className="text-2xl font-semibold mb-4 border border-black px-4 py-2">
                  <a href={`/tradebots/details/${tradebot.id}`}>Details</a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TradeBotTable;
