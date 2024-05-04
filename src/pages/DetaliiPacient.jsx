import { Link } from "react-router-dom";
import { useState } from "react";
import userIcon from "../assets/user.png";
import ModalEditarePacient from "./ModalEditarePacient";
import DeletePacientModal from "./DeletePacientModal";

function DetaliiPacient() {
  const [activeButton, setActiveButton] = useState(null);
  const [editareModalOpen, setEditareModalOpen] = useState(false);
  const [stergereModalOpen, setStergereModalOpen] = useState(false);
  const [pacient, setPacient] = useState({
    id: "1",
    nume: "Miruna Ioana",
    varsta: "36",
    job: "web dev",
    firma: "Nokia",
    adresa: {
      tara: "Romania",
      oras: "Timisoara",
      strada: "Rozelor",
      numar: "25",
    },
    contact: {
      mail: "maria@gmail.com",
      telefon: "0979766808",
    },
    alarme: {
      puls: { valoare: "80bpm", data: "data" },
      ECG: { valoare: "valoare", data: "data" },
      umiditate: { valoare: "valoare", data: "data" },
      temperatura: { valoare: "valoare", data: "data" },
    },
    recomandari: {
      bicicleta: { zile: "2", note: "note", startData: "start date" },
      plimbare: { frecventa: "zilnic", startData: "start data" },
    },
    alergii: {
      alergi1: "lactate",
    },
  });

  const buttonLabels = {
    Editare: "Editare Pacient",
    Stergere: "Stergere Pacient",
    //Alerte: "Adaugare Alerte",
    Recomandare: "Adaugare Recomandare",
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
      className=""
      style={{ backgroundImage: "url('src/assets/detaliibackground.PNG')" }}
    >
      <div className="h-screen w-full flex flex-col items-center">
        <div className="h-1/5 flex w-full justify-between items-center px-4">
          <Link
            to="/ListPacients"
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 border-2 border-blue-500 rounded "
          >
            ⟵ Înapoi
          </Link>
        </div>
        <div className="h-4/5 w-full flex">
          <div className="w-1/5 flex flex-col items-center">
            {Object.entries(buttonLabels).map(([buttonName, buttonText]) => (
              <Link
                key={buttonName}
                to={buttonName === "Recomandare" ? "/recomandari" : ""}
                className={`w-3/4 h-16 p-3 rounded-lg mb-4 focus:outline-none text-lg text-center ${
                  activeButton === buttonName
                    ? "bg-blue-500 border-4 border-blue-800 text-white"
                    : "bg-white border border-blue-700 text-blue-700"
                } hover:bg-blue-300 hover:border-blue-300 hover:text-white transition-colors`}
                onClick={() => handleButtonClick(buttonName)}
              >
                {buttonText}
              </Link>
            ))}
          </div>
          <div className="w-4/5 flex">
            <div className="w-1/4 h-full">
              <div className="flex flex-col bg-blue-200 text-white items-center h-full rounded-l-2xl overflow-y-auto">
                <img src={userIcon} alt="Avatar" className="h-20 w-20" />
                <h5 className="text-xl">{pacient.nume}</h5>
                <p>{pacient.job}</p>
              </div>
            </div>
            <div className="w-3/4">
              <div className="bg-white p-5 rounded-r-2xl">
                <h6>Informatii Pacient</h6>
                <hr className="mt-2 mb-4 border-gray-400" />
                <div className="flex mb-4">
                  <div className="w-1/2">
                    <h6>Varsta</h6>
                    <p className="text-gray-600">{pacient.varsta} ani</p>
                  </div>
                  <div className="w-1/2">
                    <h6>Firma</h6>
                    <p className="text-gray-600">{pacient.firma}</p>
                  </div>
                </div>
              </div>
              <h6>Adresa</h6>
              <hr className="mt-2 mb-4 border-gray-400" />
              <div className="flex mb-4">
                <div className="w-1/2">
                  <h6>Tara</h6>
                  <p className="text-gray-600">{pacient.adresa.tara}</p>
                </div>
                <div className="w-1/2">
                  <h6>Oras</h6>
                  <p className="text-gray-600">{pacient.adresa.oras}</p>
                </div>
              </div>
              <h6>Locuinta</h6>
              <hr className="mt-2 mb-4 border-gray-400" />
              <div className="flex mb-4">
                <div className="w-1/2">
                  <h6>Strada</h6>
                  <p className="text-gray-600">{pacient.adresa.strada}</p>
                </div>
                <div className="w-1/2">
                  <h6>Numar</h6>
                  <p className="text-gray-600">{pacient.adresa.numar}</p>
                </div>
              </div>
              <h6>Contact</h6>
              <hr className="mt-2 mb-4 border-gray-400" />
              <div className="flex mb-4">
                <div className="w-1/2">
                  <h6>Mail</h6>
                  <p className="text-gray-600">{pacient.contact.mail}</p>
                </div>
                <div className="w-1/2">
                  <h6>Telefon</h6>
                  <p className="text-gray-600">{pacient.contact.telefon}</p>
                </div>
              </div>
              <h6>Alarme</h6>
              <hr className="mt-2 mb-4 border-gray-400" />
              <div className="flex mb-4">
                <div className="w-1/2">
                  <h6>Puls</h6>
                  <p className="text-gray-600">{pacient.alarme.puls.valoare}</p>
                  <p className="text-gray-600">{pacient.alarme.puls.data}</p>
                </div>
                <div className="w-1/2">
                  <h6>ECG</h6>
                  <p className="text-gray-600">{pacient.alarme.ECG.valoare}</p>
                  <p className="text-gray-600">{pacient.alarme.ECG.data}</p>
                </div>
              </div>
              <h6>Alarme</h6>
              <hr className="mt-2 mb-4 border-gray-400" />
              <div className="flex mb-4">
                <div className="w-1/2">
                  <h6>Umiditate</h6>
                  <p className="text-gray-600">
                    {pacient.alarme.umiditate.valoare}
                  </p>
                  <p className="text-gray-600">
                    {pacient.alarme.umiditate.data}
                  </p>
                </div>
                <div className="w-1/2">
                  <h6>Temperatura</h6>
                  <p className="text-gray-600">
                    {pacient.alarme.temperatura.valoare}
                  </p>
                  <p className="text-gray-600">
                    {pacient.alarme.temperatura.data}
                  </p>
                </div>
              </div>
              <h6>Recomandari</h6>
              <hr className="mt-2 mb-4 border-gray-400" />
              <div className="flex mb-4">
                <div className="w-1/2">
                  <h6>Bicicleta</h6>
                  <p className="text-gray-600">
                    {pacient.recomandari.bicicleta.zile} zile
                  </p>
                  <p className="text-gray-600">
                    {pacient.recomandari.bicicleta.note}
                  </p>
                  <p className="text-gray-600">
                    {pacient.recomandari.bicicleta.startData}
                  </p>
                </div>
                <div className="w-1/2">
                  <h6>Plimbare</h6>
                  <p className="text-gray-600">
                    {pacient.recomandari.plimbare.frecventa}
                  </p>
                  <p className="text-gray-600">
                    {pacient.recomandari.plimbare.startData}
                  </p>
                </div>
              </div>
              <h6>Alergii</h6>
              <hr className="mt-2 mb-4 border-gray-400" />
              <div className="flex mb-4">
                <div className="w-1/2">
                  <p className="text-gray-600">{pacient.alergii.alergi1}</p>
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

export default DetaliiPacient;
