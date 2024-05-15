import React from "react";
import heartWarningImage from "../assets/heartwarning.png";

function WarningCard({ type, value, date }) {
  const formatDate = (date) => {
    if (!date) return "Invalid Date";
    const formattedDate = new Date(date);
    return isNaN(formattedDate.getTime())
      ? "Invalid Date"
      : formattedDate.toLocaleString();
  };

  return (
    <div className="bg-blue-200 p-4 rounded-md shadow-md flex items-center mb-4">
      <img
        src={heartWarningImage}
        alt="Warning Icon"
        className="w-20 h-20 mr-4"
      />
      <div className="flex flex-col">
        <p className="text-red-800 font-semibold">
          Warning: {type} exceeded the limit!
        </p>
        <p className="text-yellow-700">Current value: {value}</p>
        <p className="text-yellow-700">
          Suggestive message to avoid this situation...
        </p>
      </div>
      <div className="ml-auto text-right">
        <p className="text-gray-900">Alert Date: {formatDate(date)}</p>
      </div>
    </div>
  );
}

export default WarningCard;
