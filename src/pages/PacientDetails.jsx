import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import EditPacientModal from "./EditPacientModal";
import DeletePacientModal from "./DeletePacientModal";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useQuery, useMutation } from "@apollo/client";
import * as Queries from "../queries";

function PacientDetails() {
  const [activeButton, setActiveButton] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  let { pacientId } = useParams();

  const pacientQueryResult = useQuery(Queries.GET_USER_BY_PACIENT_ID_QUERY, {
    variables: { id: pacientId },
  });

  const pacient = pacientQueryResult.data?.getUserByPacientId;

  const buttonLabels = {
    Edit: "Edit pacient",
    Delete: "Delete pacient",
    Recommandation: "Recommandations",
    Alerts: "Alerts",
  };

  const [deleteUser] = useMutation(Queries.DELETE_PACIENT_USER_MUTATION, {
    onCompleted: () => {
      console.log("Successfully deleted!");
      navigate("/pacients");
    },
    onError: ({ error }) => {
      console.error("ERROR: " + error);
    },
  });

  const deletePacientUser = async (pacientId) => {
    try {
      await deleteUser({ variables: { id: pacientId } });
    } catch (error) {
      console.error("Error deleting pacient:", error);
    }
  };

  const [updatePacientMutation] = useMutation(
    Queries.UPDATE_PACIENT_USER_MUTATION,
    {
      onCompleted: () => {
        console.log("Successfully updated user!");
      },
      onError: (error) => {
        console.error("ERROR: " + error);
      },
    }
  );

  const updatePacient = async (pacientData) => {
    console.log(pacientData);
    try {
      await updatePacientMutation({
        variables: {
          id: pacientData.id,
          email: pacientData.email,
          firstName: pacientData.firstName,
          lastName: pacientData.lastName,
          phoneNumber: pacientData.phoneNumber,
          age: pacientData.age,
          workPlace: pacientData.workPlace,
          profession: pacientData.profession,
          country: pacientData.country,
          city: pacientData.city,
          street: pacientData.street,
          streetNumber: pacientData.streetNumber,
        },
      });
      location.reload();
    } catch (error) {
      console.log("Error updating pacient: " + error);
    }
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === "Edit") {
      setEditModalOpen(true);
    }
    if (buttonName === "Delete") {
      setDeleteModalOpen(true);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    deletePacientUser(pacient.pacientProfile.id);
    setDeleteModalOpen(false);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <div
      className="w-full bg-cover h-screen flex justify-between bg-white"
      style={{ backgroundImage: "url('src/assets/abstract_background_2.svg')" }}
    >
      {pacient ? (
        <div className="w-full flex flex-col items-center p-8">
          <div className="w-full flex">
            <div className="w-1/4 flex flex-col space-y-4">
              <Link
                to="/pacients"
                className="w-1/4 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 border-2 border-blue-500 rounded "
              >
                ⟵ Back
              </Link>
              <div className="pt-4 flex flex-col bg-blue-200 text-white items-center h-full rounded-l-2xl overflow-y-auto">
                <UserCircleIcon className="w-24 h-24 text-blue-500" />
                <h5 className="text-xl text-blue-700">{`${pacient.firstName} ${pacient.lastName}`}</h5>
                <p className="text-blue-500 pb-6">
                  {pacient.pacientProfile.profession}
                </p>
                {Object.entries(buttonLabels).map(
                  ([buttonName, buttonText]) => (
                    <Link
                      key={buttonName}
                      to={
                        buttonName === "Recommandation"
                          ? `/pacients/recommandations/${pacientId}`
                          : buttonName === "Alerts"
                          ? `/pacients/alerts/${pacientId}`
                          : ""
                      }
                      className={`w-3/4 h-16 p-3 rounded-lg mb-4 focus:outline-none text-lg text-center flex items-center justify-center ${
                        activeButton === buttonName
                          ? "bg-blue-500 border-4 border-blue-800 text-white"
                          : "bg-white border border-blue-700 text-blue-700"
                      } hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-colors`}
                      onClick={() => handleButtonClick(buttonName)}
                    >
                      <p>{buttonText}</p>
                    </Link>
                  )
                )}
              </div>
            </div>
            <div className="w-3/4 flex flex-col divide-y-2 p-4 mt-12">
              <div>
                <p className="text-lg font-semibold">Pacient info</p>
                <div className="flex pt-1 pb-4">
                  <div className="w-1/2">
                    <p>Age</p>
                    <p className="text-gray-600">
                      {pacient.pacientProfile.age} years old
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p>Work place</p>
                    <p className="text-gray-600">
                      {pacient.pacientProfile.workPlace}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold pt-2">Address</p>
                <div className="flex pt-1 pb-4">
                  <div className="w-1/2">
                    <h6>Country</h6>
                    <p className="text-gray-600">
                      {pacient.pacientProfile.address
                        ? pacient.pacientProfile.address.country
                        : ""}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <h6>City</h6>
                    <p className="text-gray-600">
                      {pacient.pacientProfile.address
                        ? pacient.pacientProfile.address.city
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="flex pt-1 pb-4">
                  <div className="w-1/2">
                    <h6>Street</h6>
                    <p className="text-gray-600">
                      {pacient.pacientProfile.address
                        ? pacient.pacientProfile.address.street
                        : ""}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <h6>Number</h6>
                    <p className="text-gray-600">
                      {pacient.pacientProfile.address
                        ? pacient.pacientProfile.address.streetNumber
                        : ""}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold pt-2">Contact</p>
                <div className="flex pt-1 pb-4">
                  <div className="w-1/2">
                    <h6>Email</h6>
                    <p className="text-gray-600">{pacient.email}</p>
                  </div>
                  <div className="w-1/2">
                    <h6>Phone number</h6>
                    <p className="text-gray-600">{pacient.phoneNumber}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold pt-2">Allergies</p>
                <div className="flex pt-1 pb-4">
                  <div className="w-1/2">
                    <p className="text-gray-600">N/A</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EditPacientModal
            isOpen={editModalOpen}
            onClose={closeEditModal}
            onSave={(pacientData) => updatePacient(pacientData)}
            initialPacientData={pacient}
          />
          {deleteModalOpen && (
            <DeletePacientModal
              onCancel={closeDeleteModal}
              onConfirm={handleConfirmDelete}
            />
          )}
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

export default PacientDetails;
