"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import requestApi from "helpers/api";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

interface TradebotDetails {
  tradebot: {
    model_id: number;
    ticket_id: number;
    description: string;
    id: number;
    name: string;
  };
  model_name: string;
  ticket_name: string;
  latest_prediction: {
    predict_price: number;
    tradebot_id: number;
    predict_time: number | null;
    predict_action: number;
    id: number;
  };
  latest_result: {
    timestamp: number;
    won_trades?: number; // Optional as it might not be in all responses
    tradebot_id: number;
    win_ratio?: number; // Optional as it might not be in all responses
    profit: number;
    id: number;
    total_trades?: number; // Optional as it might not be in all responses
    sell_traded: number;
    img_base64: string;
    buy_traded: number;
  };
}

interface requestApiProps {
  endpoint: string;
  method: string;
  params?: any; // Make params optional
  body?: any; // Make body optional
  responseType?: string;
}

const TradebotDetailsPage = () => {
  const [details, setDetails] = useState<TradebotDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const id =1;
  useEffect(() => {
    if (!id) return; // Check if router is ready and 'id' is available

    const fetchDetails = async () => {
      try {
        const response = await requestApi({
          endpoint: `api/tradebots/tradebot/details/${id}`,
          method: "GET",
          params: {},
          body: {},
        });
        setDetails(response.data);
      } catch (error) {
        toast.error("Error fetching tradebot details");
      } finally {
        setIsLoading(false);
      }
    };
    console.log(id)
    fetchDetails();
  }, []);

//   if (isLoading) {
//     return <Loading isLoading />;
//   }

  if (!details) {
    return <div>No tradebot details found</div>;
  }
  
  // Decode base64 image
  const base64Image = details.latest_result.img_base64;
  const imageSrc = `data:image/jpeg;base64,${base64Image}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex space-x-4">
        {/* Container 1: Tradebot Details */}
        <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
          <h1 className="text-2xl font-semibold">
            Tradebot Details: {details.tradebot.name}
          </h1>
          <p className="text-gray-600">Description: {details.tradebot.description}</p>
          <p className="text-gray-600">Model: {details.model_name}</p>
          <p className="text-gray-600">Ticket: {details.ticket_name}</p>
        </div>

        {/* Container 2: Latest Prediction */}
        <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
          <h2 className="text-xl font-semibold">Latest Prediction</h2>
          <p className="text-gray-600">
            Action:{" "}
            <span
              className={`${
                details.latest_prediction.predict_action === 1
                  ? "text-green-600"
                  : "text-red-600"
              } font-semibold`}
            >
              {details.latest_prediction.predict_action === 1 ? "Buy" : "Sell"}
            </span>
          </p>
          <p className="text-gray-600">Predict Price: {details.latest_prediction.predict_price}</p>
        </div>

        {/* Container 3: Latest Result */}
        <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
          <h2 className="text-xl font-semibold">Latest Result</h2>
          <p className="text-gray-600">Profit: {details.latest_result.profit}</p>
          <p className="text-gray-600">Win Ratio: {details.latest_result.win_ratio}</p>
        </div>
        <div>
          <img src={imageSrc} alt="Tradebot Result" />
        </div>
      </div>
    </div>
  );
};

export default TradebotDetailsPage;
