import { Link } from "react-router-dom";
import { useState } from "react";
import userIcon from "../assets/doctor.png";
import ModalEditarePacient from "./ModalEditarePacient";
import DeletePacientModal from "./DeletePacientModal";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import { UserPlusIcon } from "@heroicons/react/24/outline";

function Account() {
  // Starea pentru gestionarea butoanelor și a modalelor
  const [activeButton, setActiveButton] = useState(null);
  const [editareModalOpen, setEditareModalOpen] = useState(false);
  const [stergereModalOpen, setStergereModalOpen] = useState(false);

  // Datele despre doctor
  const [doctor, setDoctor] = useState({
    id: "1",
    first_name: "Miruna",
    last_name: "Calugar",
    badge_number: "12313",
    number_of_pacients: 6,
    contact: {
      email: "maria@gmail.com",
      phone_number: "0979766808",
    },
  });

  return (
    <div className="w-full bg-cover h-screen flex justify-between bg-white">
      <div className="w-full flex flex-col items-center p-8">
        <div className="w-full h-full flex">
          <div className="w-1/4 flex flex-col space-y-4">
            <Link
              to="/dashboard"
              className="w-1/4 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 border-2 border-blue-500 rounded "
            >
              ⟵ Back
            </Link>
            <div className="pt-4 flex flex-col bg-blue-200 text-white items-center h-full rounded-l-2xl overflow-y-auto">
              <UserPlusIcon className="w-24 h-24 text-blue-500" />
              <div className="flex space-x-2 items-center">
                <p className="text-xl text-blue-700">Dr. {doctor.first_name}</p>
                <p className="text-xl text-blue-700">{doctor.last_name}</p>
              </div>
            </div>
          </div>
          <div className="w-3/4 flex flex-col divide-y-2 p-4 mt-12">
            <div>
              <p className="text-lg font-semibold pb-2">Account details</p>
              <div className="flex flex-col space-y-4 pt-1 pb-4">
                <div className="w-1/3">
                  <p>Badge number</p>
                  <p className="text-gray-600">{doctor.badge_number}</p>
                </div>
                <div className="w-1/3">
                  <p>Email</p>
                  <p className="text-gray-600">{doctor.contact.email}</p>
                </div>
                <div className="w-1/3">
                  <p>Phone number</p>
                  <p className="text-gray-600">{doctor.contact.phone_number}</p>
                </div>
                <div className="w-1/3">
                  <p>Total pacients</p>
                  <p className="text-gray-600">{doctor.number_of_pacients}</p>
                </div>
              </div>
              <img
                src="/src/assets/bookmarks_artwork.svg"
                className="w-1/2 h-1/2 pt-12"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
