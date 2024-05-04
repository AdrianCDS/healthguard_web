import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { Link } from "react-router-dom";

const classNameElement =
  "mt-2 w-full max-w-md border-2 border-blue-200 h-10 pl-3 rounded-lg focus:outline-none overflow-hidden  transition-all duration-500 hover:border-blue-500 focus:border-blue-500 focus:shadow-outline focus:bg-white";

// Component pentru dropdown cu recomandări
const RecommandationsDropdown = ({
  recommandations,
  onAddedRecommandation,
}) => {
  const [newRecommandation, setNewRecommandation] = useState("");

  const handleChange = (event) => {
    setNewRecommandation(event.target.value);
  };

  const handleAdaugaRecomandare = () => {
    if (newRecommandation.trim() !== "") {
      onAddedRecommandation(newRecommandation);
      setNewRecommandation("");
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="recommandations" className="block font-bold mb-1 text-xl">
        New recommandation
      </label>
      <select id="recommandations" className={classNameElement}>
        <option value="">Choose a pre-defined option</option>
        {recommandations.map((recomandare, index) => (
          <option key={index}>{recomandare}</option>
        ))}
      </select>
      <div className="mt-2 flex items-center">
        <input
          type="text"
          value={newRecommandation}
          onChange={handleChange}
          className={classNameElement}
          placeholder="Add a custom recommandation"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-2"
          onClick={handleAdaugaRecomandare}
        >
          Add
        </button>
      </div>
    </div>
  );
};

const DisplayRecommandations = ({ recommandations }) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="font-bold text-xl">Active recommandations</h2>
      <div className="flex flex-col space-y-4 recommandations-container">
        {Object.entries(recommandations).map(([recommandation, details]) => (
          <div
            key={recommandation}
            className=" h-min flex justify-between p-4 border border-solid border-blue-500 rounded-lg bg-blue-100 overflow-hidden"
          >
            <h3 className="w-1/8">{recommandation}</h3>
            <p className="w-1/8">Days: {details.days}</p>
            <p className="w-2/4 pl-4">Notes: {details.notes}</p>
            <p className="w-1/4">Start Date: {details.start_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Recommandations() {
  const [pacient, setPacient] = useState({
    recommandations: {
      Bicycle: {
        days: "2",
        notes: "30 minutes rounds with 10 minutes rest in-between",
        start_date: "12 Dec 2023",
      },
      Walk: {
        days: "30",
        notes: "30 minute walk daily in the mornings",
        start_date: "12 Dec 2023",
      },
    },
  });

  const [predefinedRecommandations, setRecommandations] = useState([
    "Walk at least 30 minutes a day",
    "Drink at least 3L of water",
    "Eat more fruits and vegetables",
    "Aim to get at least 8 hours of sleep each night",
    "Avoid smoking and drinking",
  ]);

  const handleAddRecommandation = (newRecommandation) => {
    setRecommandations((prevRecommandation) => [
      ...prevRecommandation,
      newRecommandation,
    ]);
  };

  const handleAddPacientRecommandation = () => {
    const numarRecomandari = Object.keys(pacient.recommandations).length + 1;
    const numeRecomandare = `Recomandare ${numarRecomandari}`;
    setPacient((prevPacient) => ({
      recommandations: {
        ...prevPacient.recommandations,
        [numeRecomandare]: { zile: "", note: "", startData: "" },
      },
    }));
  };

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: "url('src/assets/abstract_background_2.svg')",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-start h-full">
        <Link
          to="/pacients/details/id"
          className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 border-2 border-blue-500 rounded ml-28 mt-16"
        >
          ⟵ Back
        </Link>

        <div className="h-screen w-full pl-12 flex items-start justify-center mx-auto">
          <div className="w-1/2 pt-24 px-16 h-full">
            <DisplayRecommandations recommandations={pacient.recommandations} />
          </div>
          <div className="w-1/2 h-full flex flex-col px-8 pt-24">
            <div className="w-full max-w-md">
              <RecommandationsDropdown
                recommandations={predefinedRecommandations}
                onAddedRecommandation={handleAddRecommandation}
                className="w-full"
              />
            </div>
            <div className="w-full max-w-md">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Start date" className="w-full" />
              </LocalizationProvider>
            </div>
            <input
              className={classNameElement}
              type="text"
              placeholder="Duration in days"
            />
            <textarea
              className="mt-4 w-full max-w-md border-2 border-gray-300 h-32 pl-3 pt-3 rounded-lg focus:outline-none resize-none bg-blue-100"
              placeholder="Notes (optional)"
            ></textarea>
            <button
              className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
              onClick={handleAddPacientRecommandation}
            >
              Add recommandation to this pacient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
