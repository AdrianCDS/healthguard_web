import { useState } from "react";
import { Link } from "react-router-dom";
import PacientRequestCard from "./PacientRequestCard";

function PacientRequests() {
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const handleFilterClick = () => {
    setAscendingOrder(!ascendingOrder);
  };

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('src/assets/abstract_background.svg')",
        backgroundSize: "cover",
      }}
    >
      <div className="h-screen w-full flex flex-col items-center ">
        <div className="h-1/5 flex w-4/5 justify-between items-center">
          <Link to="/dashboard">
            <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 border-2 border-blue-500 rounded">
              ⟵ Back
            </button>
          </Link>
        </div>
        <div className="flex flex-col space-y-4 w-full">
          <div className="justify-between items-center px-56 py-4 flex">
            <input
              className="rounded-full bg-blue-100  border-2 border-blue-500  placeholder-blue-400 focus:text-blue-800 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 p-4"
              placeholder="Search for a pacient"
            />
            <button
              className="p-4 rounded-full bg-blue-700 hover:bg-blue-500 text-white font-bold  border-2 border-blue-500 rounded "
              onClick={handleFilterClick}
            >
              {ascendingOrder ? "↑ Ascending" : "↓ Descending"}
            </button>
          </div>
          <div className="w-full flex flex-col gap-3 items-center">
            {/* {pacients.map((pacient, index) => (
              <PacientRequestCard
                key={index}
                first_name={pacient.first_name}
                last_name={pacient.last_name}
                email={pacient.email}
              />
            ))} */}
            N/A
          </div>
        </div>
      </div>
    </div>
  );
}
export default PacientRequests;
