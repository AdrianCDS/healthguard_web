import { Link } from "react-router-dom";
import { useState } from "react";
import userIcon from "../assets/doctor.png";
import ModalEditarePacient from "./ModalEditarePacient";
import DeletePacientModal from "./DeletePacientModal";

function ContDoctor() {
  // Starea pentru gestionarea butoanelor și a modalelor
  const [activeButton, setActiveButton] = useState(null);
  const [editareModalOpen, setEditareModalOpen] = useState(false);
  const [stergereModalOpen, setStergereModalOpen] = useState(false);

  // Datele despre doctor
  const [doctor, setDoctor] = useState({
    id: "1",
    nume: "Calugar",
    prenume: "Miruna",
    badgeNumber: "12313",
    contact: {
      mail: "maria@gmail.com",
      telefon: "0979766808",
    },
  });

  return (
    <div
      className=""
      style={{ backgroundImage: "url('src/assets/detaliibackground.PNG')" }}
    >
      <div className="h-screen w-full flex flex-col items-center">
        {/* Bara de navigare */}
        <div className="h-1/5 flex w-full justify-between items-center px-4">
          <Link
            to="/dashboard"
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 border-2 border-blue-500 rounded"
          >
            ⟵ Înapoi
          </Link>
        </div>

        {/* Detaliile doctorului */}
        <div className="h-4/5 w-full flex justify-center">
          {/* Div-ul pentru detaliile doctorului */}
          <div className="w-4/5 flex">
            {/* Partea stângă: Imaginea și detaliile personale */}
            <div className="w-1/4 h-full">
              <div className="flex flex-col bg-blue-200 text-white items-center h-full rounded-l-2xl overflow-y-auto">
                <img src={userIcon} alt="Avatar" className="h-20 w-20" />
                <h5 className="text-xl">
                  {doctor.nume} {doctor.prenume}
                </h5>
                <p>Doctor</p>
              </div>
            </div>

            {/* Partea dreaptă: Detaliile contului */}
            <div className="w-3/4">
              <div className="bg-white p-5 rounded-r-2xl">
                {/* Detaliile contului */}
                <h6>Informatii Cont</h6>
                <hr className="mt-2 mb-4 border-gray-400" />
                <div className="flex mb-4">
                  <div className="w-1/2">
                    <h6>Badge Number</h6>
                    <p className="text-gray-600">{doctor.badgeNumber} </p>
                  </div>
                </div>

                {/* Detaliile de contact */}
                <h6>Contact</h6>
                <hr className="mt-2 mb-4 border-gray-400" />
                <div className="flex mb-4">
                  <div className="w-1/2">
                    <h6>Mail</h6>
                    <p className="text-gray-600">{doctor.contact.mail}</p>
                  </div>
                  <div className="w-1/2">
                    <h6>Telefon</h6>
                    <p className="text-gray-600">{doctor.contact.telefon}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContDoctor;
