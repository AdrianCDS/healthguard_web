import React from "react";

function PatientDetailsSummaryCard({ first_name, last_name, date }) {
  return (
    <div className="border border-blue-100 border-4 p-4 w-full rounded-lg bg-white flex items-center space-x-4">
      <div class="flex space-x-2 items-center">
        <p className="text-lg font-semibold text-blue-500">{first_name}</p>
        <p className="text-lg font-semibold text-blue-500">{last_name}</p>
      </div>
      <div>
        <p className="italic text-blue-400">{date}</p>
      </div>
    </div>
  );
}

export default PatientDetailsSummaryCard;
