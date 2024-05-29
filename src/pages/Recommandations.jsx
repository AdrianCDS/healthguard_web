import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import * as Queries from "../queries";

const classNameElement =
  "mt-2 w-full max-w-md border-2 border-blue-200 h-10 pl-3 rounded-lg focus:outline-none overflow-hidden  transition-all duration-500 hover:border-blue-500 focus:border-blue-500 focus:shadow-outline focus:bg-white";

const DisplayRecommandations = ({ pacient }) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="font-bold text-xl">Active recommandations</h2>
      <div className="flex flex-col space-y-4 recommandations-container">
        {pacient.pacientProfile.recommandations.map((recommandation, index) => (
          <div
            key={index}
            className=" h-min flex justify-between p-4 border border-solid border-blue-500 rounded-lg bg-blue-100 overflow-hidden"
          >
            <div className="w-[40%] flex flex-col space-y-1 items-start">
              <h1>{recommandation.activityType.type}</h1>
              <h1>{recommandation.recommandation}</h1>
            </div>

            <p className="w-[10%]">Days: {recommandation.daysDuration}</p>
            <p className="w-[30%]">Notes: {recommandation.note}</p>
            <p className="w-[20%]">Start Date: {recommandation.startDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Recommandations() {
  let { pacientId } = useParams();
  const [start_date, setStartDate] = useState("");
  const [days_duration, setDaysDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedRecommandation, setSelectedRecommandation] = useState("");
  const [typedRecommandation, setTypedRecommandation] = useState("");
  const [predefinedRecommandations, setPredifinedRecommandations] = useState([
    { text: "Walk at least 30 minutes a day", type: "WALKING" },
    { text: "Do 15 minute jogging in the morning", type: "JOGGING" },
    { text: "Run 1 mile every other day", type: "RUNNING" },
    {
      text: "Make sure to get up and stretch every 15 minutes",
      type: "SEDENTARY",
    },
    { text: "Once a week use bicycle for 2 hours", type: "CYCLING" },
  ]);

  const pacientQueryResult = useQuery(Queries.GET_USER_BY_PACIENT_ID_QUERY, {
    variables: { id: pacientId },
  });

  const pacient = pacientQueryResult.data?.getUserByPacientId;

  const [addRecommandation] = useMutation(
    Queries.ADD_RECOMMANDATION_TO_PACIENT_MUTATION,
    {
      onCompleted: ({ addRecommandation }) => {
        console.log("Successfully added recommandation!", addRecommandation);
      },
      onError: ({ error }) => {
        console.error("ERROR: " + error);
      },
    }
  );

  const handleAddRecommandation = (newRecommandation) => {
    setPredifinedRecommandations((prevRecommandation) => [
      ...prevRecommandation,
      newRecommandation,
    ]);
  };

  const handleAddNewRecommandation = () => {
    if (typedRecommandation.trim() !== "") {
      handleAddRecommandation(typedRecommandation);
      setTypedRecommandation("");
    }
  };

  const handleAddPacientRecommandation = async () => {
    let date = start_date.split(".");
    let isoDate = date[2] + "-" + date[1] + "-" + date[0] + "T00:00:00Z";

    const option = selectedRecommandation.split("||");

    try {
      await addRecommandation({
        variables: {
          id: pacientId,
          recommandation: option[0],
          startDate: isoDate,
          daysDuration: parseInt(days_duration),
          note: notes,
          activityType: option[1],
        },
      });
    } catch (error) {
      console.error("Error adding recommandation:", error);
    }
  };

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: "url('src/assets/abstract_background_2.svg')",
        backgroundSize: "cover",
      }}
    >
      {pacient ? (
        <div className="flex flex-col items-start h-full">
          <Link
            to={`/pacients/details/${pacientId}`}
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 border-2 border-blue-500 rounded ml-28 mt-16"
          >
            ⟵ Back
          </Link>
          <div className="h-screen w-full pl-12 flex items-start justify-center mx-auto">
            <div className="w-1/2 pt-24 px-16 h-full">
              <DisplayRecommandations pacient={pacient} />
            </div>
            <div className="w-1/2 h-full flex flex-col px-8 pt-24">
              <div className="w-full max-w-md">
                <div className="mb-4">
                  <label
                    htmlFor="recommandations"
                    className="block font-bold mb-1 text-xl"
                  >
                    New recommandation
                  </label>
                  <select
                    id="recommandations"
                    className={classNameElement}
                    onChange={(e) => setSelectedRecommandation(e.target.value)}
                  >
                    <option value="">Choose a pre-defined option</option>
                    {predefinedRecommandations.map((recommandation, index) => (
                      <option
                        key={index}
                        value={`${recommandation.text}||${recommandation.type}`}
                      >
                        {recommandation.text} ({recommandation.type})
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 flex items-center">
                    <input
                      type="text"
                      className={classNameElement}
                      value={typedRecommandation}
                      onChange={(e) => setTypedRecommandation(e.target.value)}
                      placeholder="Add a custom recommandation"
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-2"
                      onClick={handleAddNewRecommandation}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-md">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start date"
                    className="w-full"
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString("ro-RO");
                      setStartDate(d);
                    }}
                  />
                </LocalizationProvider>
              </div>
              <input
                className={classNameElement}
                type="text"
                placeholder="Duration in days"
                onChange={(e) => setDaysDuration(e.target.value)}
              />
              <textarea
                className="mt-4 w-full max-w-md border-2 border-gray-300 h-32 pl-3 pt-3 rounded-lg focus:outline-none resize-none bg-blue-100"
                placeholder="Notes (optional)"
                onChange={(e) => setNotes(e.target.value)}
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
      ) : (
        <div className="flex items-center justify-center mx-auto">
          <h1 className="font-bold text-5xl text-center">
            Failed to load pacient!
          </h1>
        </div>
      )}
    </div>
  );
}
