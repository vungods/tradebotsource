import React from "react";

interface EstimateCardProps {
  estimate: {
    status: string,
    quantity: number,
    manMonth: number
  }
}
const changeStatus = (str: string) => {
  var status = ''
  switch(str) {
    case 'win':
      status = "Win"
      break;
    case 'new':
      status = "New"
      break;
    case 'in_progress':
      status = "In progress"
      break;
    case 'pending':
      status = "Pending"
      break;
    case 'fail':
      status = "Fail"
      break;
    case 'cancel':
      status = "Cancel"
      break;
  }
  return status
}

export default function EstimateCard({ estimate }: EstimateCardProps) {
  return (
    <div
      className="m-4 block rounded-lg bg-white overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-full max-w-xs min-w-fit">
        <div className={`relative overflow-hidden bg-cover bg-no-repeat text-center rounded-t-lg bg-${estimate.status}`}>
          <h5
            className="py-4 text-xl font-medium leading-tight text-gray-700 dark:text-neutral-50" >
            {changeStatus(estimate.status)}
          </h5>
        </div>
        <div className="p-6">
          <div className="flex flex-row justify-between text-inherit flex-wrap">
            <h6 className="font-semibold text-gray-700">EST</h6>
            <h6 className="text-gray-700">{estimate.quantity}</h6>
          </div>
          <div className="flex flex-row justify-between text-inherit flex-wrap">
            <h6 className="font-semibold text-gray-700">MM</h6>
            <h6 className="text-gray-700">{estimate.manMonth.toFixed(2)}</h6>
          </div>
        </div>
    </div>
  );
}