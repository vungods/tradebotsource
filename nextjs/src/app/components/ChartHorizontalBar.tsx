import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface ChartHorizontalBarProps{ 
  data: {}[],
  link: string
}

export default function ChartHorizontalBar({ data, link }: ChartHorizontalBarProps) {

  const dataChartBar = {
    datasets: [
      {
        label: 'MM',
        borderColor: 'rgb(203 213 225)',
        backgroundColor:'rgb(0, 73, 153)',
        barPercentage: 1,
        data: data,
        barThickness: 30,
        maxBarThickness: 20,
        minBarLength: 1,
        categoryPercentage: 1.0,
      }
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: true,
        onClick: function() {},
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
            return String(p).replace(new RegExp(`(?![^\\n]{1,32}$)([^\\n]{1,32})\\s`, 'g'), '$1' + '\n')
          },
        },
        yAlign: "top" as 'top',
        xAlign: "left" as 'left',
      },
      datalabels: {
        formatter: function(value: any, context: any) {
          return value.manMonth;
        },
        color: 'white'
      }
    },
    scales: {
      y: {
        ticks: {
          padding: 15,
          font:{
            size: 14
          },
          callback(value: any) {
            var newthis =this as any
            const label: string = newthis.getLabelForValue(value)
            return `${String(label).substring(0, 10)}...`;
          },
        },
        stacked: true
      },
      x: {
        stacked: true
      }
    },
    maintainAspectRatio: false,
    width: 80,
    parsing: {
      xAxisKey: 'manMonth',
      yAxisKey: 'name'
    },
    onClick: (e: any, activeEls: any) => {
      let datasetIndex = activeEls[0].datasetIndex;
      let dataIndex = activeEls[0].index;
      let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
      window.open(`${link}/${value.id}`,'_blank');
    }
  };

  return ( 
    <div className='h-full'>
      <Bar options={options} data={dataChartBar}/>
    </div>
  );
}

