import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PacientDetailsCard from "./PacientDetailsCard";
import AddPacientModal from "./AddPacientModal";
import * as Queries from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants";

function ListPacients() {
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
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [addPacient] = useMutation(Queries.REGISTER_PACIENT_MUTATION, {
    onCompleted: ({ registerPacient }) => {
      console.log("Successfully added pacient!", registerPacient);
      location.reload();
    },
    onError: ({ error }) => {
      console.error("ERROR: " + error);
    },
  });

  const handleAddPacient = async (data) => {
    try {
      await addPacient({
        variables: {
          email: data.email,
          password: "Parola1234!@#",
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          cnp: data.pacientProfile.cnp,
          age: parseInt(data.pacientProfile.age),
          workPlace: data.pacientProfile.workPlace,
          profession: data.pacientProfile.profession,
          country: data.pacientProfile.address.country,
          city: data.pacientProfile.address.city,
          street: data.pacientProfile.address.street,
          streetNumber: parseInt(data.pacientProfile.address.streetNumber),
          medicEmail: "john.doe@gmail.com",
        },
      });
      setPacients(pacients);
    } catch (error) {
      console.error("Error adding pacient:", error);
    }
  };

  const [deleteUser] = useMutation(Queries.DELETE_PACIENT_USER_MUTATION, {
    onCompleted: () => {
      console.log("Successfully deleted!");
    },
    onError: ({ error }) => {
      console.error("ERROR: " + error);
    },
  });

  const deletePacientUser = async (pacientId) => {
    try {
      await deleteUser({ variables: { id: pacientId } });
      setPacients(pacients.filter((pacient) => pacient.id !== pacientId));
    } catch (error) {
      console.error("Error deleting pacient:", error);
    }
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
      className="bg-auto h-screen flex items-center justify-center bg-white"
      style={{
        backgroundImage: "url('src/assets/abstract_background_2.svg')",
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

            <button
              className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 border-2 border-blue-500 rounded"
              onClick={handleOpenModal}
            >
              Add pacient
            </button>
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
                    .reverse()
                    .map((pacient, index) => (
                      <PacientDetailsCard
                        key={index}
                        id={pacient.id}
                        name={`${pacient.firstName} ${pacient.lastName}`}
                        cnp={pacient.cnp}
                        phone_number={pacient.phoneNumber}
                        email={pacient.email}
                        onDelete={() => deletePacientUser(pacient.id)}
                      />
                    ))
                : [...pacients].map((pacient, index) => (
                    <PacientDetailsCard
                      key={index}
                      id={pacient.id}
                      name={`${pacient.firstName} ${pacient.lastName}`}
                      cnp={pacient.cnp}
                      phone_number={pacient.phoneNumber}
                      email={pacient.email}
                      onDelete={() => deletePacientUser(pacient.id)}
                    />
                  ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mx-auto">
          <h1 className="font-bold text-5xl text-center">
            Failed to load pacients!
          </h1>
        </div>
      )}
      {modalOpen && (
        <AddPacientModal
          onClose={handleCloseModal}
          onAddPacient={(data) => handleAddPacient(data)}
        />
      )}
    </div>
  );
}

export default ListPacients;
