import { Link } from "react-router-dom";
import { useState } from "react";
import ModalEditarePacient from "./ModalEditarePacient";
import DeletePacientModal from "./DeletePacientModal";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function PacientDetails() {
  const [activeButton, setActiveButton] = useState(null);
  const [editareModalOpen, setEditareModalOpen] = useState(false);
  const [stergereModalOpen, setStergereModalOpen] = useState(false);
  const [pacient, setPacient] = useState({
    id: "1",
    name: "Miruna Ioana",
    age: "36",
    occupation: "web dev",
    work_place: "Nokia",
    address: {
      country: "Romania",
      city: "Timisoara",
      street: "Rozelor",
      street_number: "25",
    },
    contact: {
      email: "maria@gmail.com",
      phone_number: "0979766808",
    },
    alerts: {
      bpm: { value: "80bpm", date: "12 Dec 2023" },
      ECG: { value: "[12 34.2 30.7 56.1]", date: "12 Dec 2023" },
      humidity: { value: "50", date: "12 Dec 2023" },
      temperature: { value: "36.8", date: "12 Dec 2023" },
    },
    recommandations: {
      bicycle: {
        days: "2",
        notes: "Do rounds of 30 min with a 15 minute break in-between",
        start_date: "12 Dec 2023",
      },
    },
    allergies: {
      allergy_1: "lactate",
    },
  });

  const buttonLabels = {
    Edit: "Edit pacient",
    Delete: "Delete pacient",
    //Alerte: "Adaugare Alerte",
    Recommandation: "Add recommandation",
  };

  const handleButtonClick = (buttonName) => {
    console.log(`Butonul ${buttonName} a fost apăsat.`);
    setActiveButton(buttonName);
    if (buttonName === "Editare") {
      setEditareModalOpen(true);
    }
    if (buttonName === "Stergere") {
      setStergereModalOpen(true);
    }
  };

  const closeStergereModal = () => {
    setStergereModalOpen(false);
  };

  const handleConfirmStergere = () => {
    console.log("Pacientul a fost șters.");
    setStergereModalOpen(false);
  };

  const closeEditareModal = () => {
    setEditareModalOpen(false);
  };

  return (
    <div
      className="w-full bg-cover h-screen flex justify-between bg-white"
      style={{ backgroundImage: "url('src/assets/detaliibackground.PNG')" }}
    >
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
              <h5 className="text-xl text-blue-700">{pacient.name}</h5>
              <p className="text-blue-500 pb-6">{pacient.occupation}</p>
              {Object.entries(buttonLabels).map(([buttonName, buttonText]) => (
                <Link
                  key={buttonName}
                  to={buttonName === "Recommandation" ? "/recommandations" : ""}
                  className={`w-3/4 h-16 p-3 rounded-lg mb-4 focus:outline-none text-lg text-center flex items-center justify-center ${
                    activeButton === buttonName
                      ? "bg-blue-500 border-4 border-blue-800 text-white"
                      : "bg-white border border-blue-700 text-blue-700"
                  } hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-colors`}
                  onClick={() => handleButtonClick(buttonName)}
                >
                  <p>{buttonText}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-3/4 flex flex-col divide-y-2 p-4 mt-12">
            <div>
              <p className="text-lg">Pacient info</p>
              <div className="flex pt-1 pb-4">
                <div className="w-1/2">
                  <p>Age</p>
                  <p className="text-gray-600">{pacient.age} years old</p>
                </div>
                <div className="w-1/2">
                  <p>Work place</p>
                  <p className="text-gray-600">{pacient.work_place}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg pt-2">Address</p>
              <div className="flex pt-1 pb-4">
                <div className="w-1/2">
                  <h6>Country</h6>
                  <p className="text-gray-600">{pacient.address.country}</p>
                </div>
                <div className="w-1/2">
                  <h6>City</h6>
                  <p className="text-gray-600">{pacient.address.city}</p>
                </div>
              </div>
              <div className="flex pt-1 pb-4">
                <div className="w-1/2">
                  <h6>Street</h6>
                  <p className="text-gray-600">{pacient.address.street}</p>
                </div>
                <div className="w-1/2">
                  <h6>Number</h6>
                  <p className="text-gray-600">
                    {pacient.address.street_number}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg pt-2">Contact</p>
              <div className="flex pt-1 pb-4">
                <div className="w-1/2">
                  <h6>Email</h6>
                  <p className="text-gray-600">{pacient.contact.email}</p>
                </div>
                <div className="w-1/2">
                  <h6>Phone number</h6>
                  <p className="text-gray-600">
                    {pacient.contact.phone_number}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg pt-2">Alerts</p>
              <div className="flex pt-1 pb-4">
                <div className="w-1/2">
                  <div className="flex space-x-2 items-center">
                    <p>BPM</p>
                    <p className="text-gray-600">{pacient.alerts.bpm.value}</p>
                  </div>
                  <p className="text-gray-600">{pacient.alerts.bpm.date}</p>
                </div>
                <div className="w-1/2">
                  <div className="flex space-x-2 items-center">
                    <p>ECG</p>
                    <p className="text-gray-600">{pacient.alerts.ECG.value}</p>
                  </div>
                  <p className="text-gray-600">{pacient.alerts.ECG.date}</p>
                </div>
              </div>
              <div className="flex pt-1 pb-4">
                <div className="w-1/2">
                  <div className="flex space-x-2 items-center">
                    <p>Humidity</p>
                    <p className="text-gray-600">
                      {pacient.alerts.humidity.value}
                    </p>
                  </div>
                  <p className="text-gray-600">
                    {pacient.alerts.humidity.date}
                  </p>
                </div>
                <div className="w-1/2">
                  <div className="flex space-x-2 items-center">
                    <p>Temperature</p>
                    <p className="text-gray-600">
                      {pacient.alerts.temperature.value}
                    </p>
                  </div>
                  <p className="text-gray-600">
                    {pacient.alerts.temperature.date}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg pt-2">Recommandations</p>
              <div className="flex pt-1 pb-4">
                <div className="w-1/2">
                  <div className="flex space-x-2 items-center">
                    <p>Bicycle</p>
                    <p className="text-gray-600">
                      {pacient.recommandations.bicycle.days} days
                    </p>
                  </div>
                  <p className="text-gray-600 italic">
                    {pacient.recommandations.bicycle.notes}
                  </p>
                  <p className="text-gray-600">
                    {pacient.recommandations.bicycle.start_date}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg pt-2">Allergies</p>
              <div className="flex pt-1 pb-4">
                <div className="w-1/2">
                  <p className="text-gray-600">{pacient.allergies.allergy_1}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalEditarePacient
        isOpen={editareModalOpen}
        onClose={closeEditareModal}
        initialData={pacient}
      />
      {stergereModalOpen && (
        <DeletePacientModal
          onCancel={closeStergereModal}
          onConfirm={handleConfirmStergere}
        />
      )}
    </div>
  );
}

export default PacientDetails;
