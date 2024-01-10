import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface ChartPieProps{
  label: string[], 
  data: number[]
}

export const options = {
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      label:{
        font: {
          size: 28
        }
      }
    },
    tooltip: {
      callbacks: {
        title: function(context: any) {
          const p = context[0].label
          return String(p).replace(/([^\n]{1,32})/g, '[$1]\n');
        },
      },
      yAlign: "top" as 'top',
      xAlign: "left" as 'left',
    },
    datalabels: {
      color: 'black'
    }
  },
  maintainAspectRatio: false,
  width: 200,
};

export default function ChartPie({ label, data }: ChartPieProps) {
  const dataChart = {
    labels: label,
    datasets: [
      {
        label: 'Quantity',
        data: data,
        backgroundColor: [
          'rgb(246, 109, 68)',
          'rgb(254, 174, 101)',
          'rgb(230, 246, 157)',
          'rgb(170, 222, 167)',
          'rgb(100, 194, 166)',
          'rgb(45, 135, 187)'
        ],
        borderColor: 'rgb(203 213 225)',
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={dataChart} options={options}/>;
}
