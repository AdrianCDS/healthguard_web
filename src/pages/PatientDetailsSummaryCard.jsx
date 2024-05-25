import React from "react";

function PatientDetailsSummaryCard({ first_name, last_name, date }) {
  const formatDate = (date) => {
    if (!date) return "-";
    const formattedDate = new Date(date);
    return isNaN(formattedDate.getTime())
      ? "-"
      : formattedDate.toLocaleString();
  };

  return (
    <div className="border border-blue-100 border-4 p-4 w-full rounded-lg bg-white flex items-center space-x-4">
      <div className="flex space-x-2 items-center">
        <p className="text-lg font-semibold text-blue-500">{first_name}</p>
        <p className="text-lg font-semibold text-blue-500">{last_name}</p>
      </div>
      <div>
        <p className="italic text-blue-400">{formatDate(date)}</p>
      </div>
    </div>
  );
}

export default PatientDetailsSummaryCard;
