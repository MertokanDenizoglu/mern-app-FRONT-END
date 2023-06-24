import React from "react";

const StatisticCard = ({ title, amount, img }) => {
  return (
    <div className="card-item bg-gray-800 flex gap-x-5 p-8 rounded-md my-10">
      <div className="rounded-full bg-white w-16 h-16 p-2">
        <img src={img} alt="..." />
      </div>
      <div>
        <p className="text-white mb-2 text-lg font-medium">{title}</p>
        <p className="text-white text-center font-bold  ">{amount}</p>
      </div>
    </div>
  );
};

export default StatisticCard;
