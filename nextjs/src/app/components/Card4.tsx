import React from "react";

interface Card4Props {
  title1: string;
  content1: number | undefined;
  title2: string;
  content2: number | undefined;
  title3: string;
  content3: number | undefined;
  title4: string;
  content4: number | undefined;
  titleHeight?: React.CSSProperties["height"];
  className?: string;
}

export default function Card4({
  title1,
  title2,
  title3,
  title4,
  content1,
  content2,
  content3,
  content4,
  titleHeight,
  className,
}: Card4Props) {
  return (
    <div className="flex justify-evenly">
      <div
        className={`overflow-hidden rounded-lg w-36 my-4 text-center border border-inherit shadow-md ${
          className ?? ""
        }`}
      >
        <div
          style={{ height: titleHeight }}
          className="bg-indigo-200 py-2 flex items-center justify-center"
        >
          {title1}
        </div>
        <div className="py-2 bg-slate-50">{content1}</div>
      </div>
      <div
        className={`overflow-hidden rounded-lg w-36 my-4 text-center border border-inherit shadow-md ${
          className ?? ""
        }`}
      >
        <div
          style={{ height: titleHeight }}
          className="bg-red-200 py-2 flex items-center justify-center"
        >
          {title2}
        </div>
        <div className="py-2 bg-slate-50">{content2}</div>
      </div>
      <div
        className={`overflow-hidden rounded-lg w-36 my-4 text-center border border-inherit shadow-md ${
          className ?? ""
        }`}
      >
        <div
          style={{ height: titleHeight }}
          className="bg-teal-200 py-2 flex items-center justify-center"
        >
          {title3}
        </div>
        <div className="py-2 bg-slate-50">{content3}</div>
      </div>
      <div
        className={`overflow-hidden rounded-lg w-36 my-4 text-center border border-inherit shadow-md ${
          className ?? ""
        }`}
      >
        <div
          style={{ height: titleHeight }}
          className="bg-blue-200 py-2 flex items-center justify-center"
        >
          {title4}
        </div>
        <div className="py-2 bg-slate-50">{content4}</div>
      </div>
    </div>
  );
}
