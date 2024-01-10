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

interface ChartStackBarProps{ 
  data: {status: string, data: number[], backgroundColor: string}[],
  labelChart: string[],
}

export default function ChartStackBar({ data, labelChart }: ChartStackBarProps) {
  var dataset: Array<{label: string, borderColor: string, backgroundColor: string, barPercentage: number, data: number[], barThickness: number}> = []
  data.forEach(item => {
    dataset.push({
      label: item.status,
      borderColor: 'rgb(203 213 225)',
      backgroundColor: item.backgroundColor,
      barPercentage: 1,
      data: item.data,
      barThickness: 30,
    })
  });
  
  const dataChartBar = {
    labels: labelChart,
    datasets: dataset,
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
        formatter: function(value: any) {
          if(value==0){
            return ''
          }
          return value
        },
        color: 'black',
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
      x:{
        stacked: true
      }
    },
    maintainAspectRatio: false,
    width: 80,
  };

  return ( 
    <div className='h-full'>
      <Bar options={options} data={dataChartBar}/>
    </div>
  );
}

