import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PacientDetailsCard from "./PacientDetailsCard";
import AddPacientModal from "./AddPacientModal";
import * as Queries from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants";
import PacientRequestCard from "./PacientRequestCard";

function PacientRequests() {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [pacients, setPacients] = useState([]);

  const userQueryResult = useQuery(Queries.GET_USER_BY_TOKEN_QUERY, {
    variables: { token: authToken },
  });

  const medic = userQueryResult.data?.getUserByToken;

  const handleFilterClick = () => {
    setAscendingOrder(!ascendingOrder);
  };

  const rejectRequest = (pacientId) => {
    console.log("REJECTED");
  };

  const {
    data: pacientsData,
    loading,
    error,
  } = useQuery(Queries.GET_MEDIC_PACIENTS_DATA_QUERY, {
    variables: { id: medic?.id },
  });

  useEffect(() => {
    if (!loading && !error) {
      setPacients(pacientsData?.getMedicPacients || []);
    }
  }, [loading, error, pacientsData]);

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('src/assets/abstract_background.svg')",
        backgroundSize: "cover",
      }}
    >
      {authToken && medic && pacients ? (
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
              {ascendingOrder
                ? [...pacients]
                    .filter(
                      (pacient) => pacient.pacientProfile.state == "PENDING"
                    )
                    .reverse()
                    .map((pacient, index) => (
                      <PacientRequestCard
                        key={index}
                        id={pacient.id}
                        name={`${pacient.firstName} ${pacient.lastName}`}
                        cnp={pacient.cnp}
                        phone_number={pacient.phoneNumber}
                        email={pacient.email}
                        onReject={() => rejectRequest(pacient.id)}
                      />
                    ))
                : [...pacients].map((pacient, index) => (
                    <PacientRequestCard
                      key={index}
                      id={pacient.id}
                      name={`${pacient.firstName} ${pacient.lastName}`}
                      cnp={pacient.cnp}
                      phone_number={pacient.phoneNumber}
                      email={pacient.email}
                      onReject={() => rejectRequest(pacient.id)}
                    />
                  ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="font-bold text-5xl text-center">
            Failed to load pacients!
          </h1>
        </div>
      )}
    </div>
  );
}
export default PacientRequests;
