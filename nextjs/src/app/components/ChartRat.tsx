import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import React from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController
);

export default function ChartRat({
  title,
  labels,
  billData,
  calendarData,
  eeData,
  className,
}: {
  title: string;
  labels: string[];
  billData: string[];
  calendarData: string[];
  eeData: number[];
  className?: string;
}) {
  const chartOptions = {
    maintainAspectRatio: false,
    width: 80,
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "#ff6384",
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: "Bill",
        data: billData.map((value) => parseFloat(value)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y",
      },
      {
        type: "bar" as const,
        label: "Calendar",
        data: calendarData.map((value) => parseFloat(value)),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        yAxisID: "y",
      },
      {
        type: "line" as const,
        label: "EE(%)",
        data: eeData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)", //
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div className={`h-full ${className}`}>
      <Chart type="bar" options={chartOptions} data={data} />
    </div>
  );
}
