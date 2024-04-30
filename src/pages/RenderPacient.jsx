import { useState } from "react";
import ModalStergere from "./ModalStergere";
import { Link } from "react-router-dom";
import DetaliiPacient from "./DetaliiPacient";

function RenderPacient({ nume, cnp, telefon, status }) {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    // Aici puteți adăuga logica pentru ștergerea efectivă a pacientului
    setShowModal(false);
  };

  return (
    <div className="w-3/4 h-min flex flex-row justify-between p-2 border border-solid border-blue-500 rounded-lg bg-blue-100 overflow-hidden">
      <p>{nume}</p>
      <p>{cnp}</p>
      <p>{telefon}</p>
      <p>{status}</p>
      <div className="relative w-1/3 h-10 flex flex-row items-center gap-4">
        <Link
          to="/detaliipacient"
          className="w-full text-center h-full hover:bg-blue-700 hover:text-white border border-solid border-blue-500 rounded-lg bg-blue-300"
        >
          <p>Detalii</p>
        </Link>

        <button
          className="w-full h-full hover:bg-blue-700 hover:text-white border border-solid border-blue-500 rounded-lg bg-blue-300"
          onClick={handleDeleteClick}
        >
          <p>Șterge</p>
        </button>
      </div>
      {showModal && (
        <ModalStergere
          onCancel={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default RenderPacient;
