import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";

function EditPacientModal({ isOpen, onClose, initialData }) {
  const [editedPacient, setEditedPacient] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPacient((prevPacient) => ({
      ...prevPacient,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pacient modificat:", editedPacient);
    onClose();
  };

  const inputClassName =
    "w-full border-blue-400 input rounded px-8 py-2 border-2 border-transparent focus:outline-none focus:border-blue-500  transition-all duration-300 shadow-md rounded-lg  mb-4";

  const modalRef = useRef();

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseModal);
    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editare Pacient"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        ref={modalRef}
        className="bg-blue-100 rounded-lg p-8 w-1/2 h-3/4 overflow-y-auto"
      >
        <span className="top-0 right-0 cursor-pointer" onClick={onClose}>
          &times;
        </span>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Nume</label>
            <input
              type="text"
              name="name"
              value={editedPacient.name}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Varsta</label>
            <input
              type="text"
              name="age"
              value={editedPacient.age}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Firma</label>
            <input
              type="text"
              name="work_place"
              value={editedPacient.work_place}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Tara</label>
            <input
              type="text"
              name="country"
              value={editedPacient.address.country}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Oras</label>
            <input
              type="text"
              name="city"
              value={editedPacient.address.city}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Strada</label>
            <input
              type="text"
              name="street"
              value={editedPacient.address.street}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Numar</label>
            <input
              type="text"
              name="street_number"
              value={editedPacient.address.street_number}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="text"
              name="email"
              value={editedPacient.contact.email}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Telefon</label>
            <input
              type="text"
              name="phone_number"
              value={editedPacient.contact.phone_number}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Profesie</label>
            <input
              type="text"
              name="occupation"
              value={editedPacient.occupation}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Alergii</label>
            <input
              type="text"
              name="allergies"
              value={editedPacient.allergies.allergy_1}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          {/* Adaugă restul câmpurilor aici, la fel cum am adăugat cele de mai sus */}

          <div className="flex justify-between mt-8">
            <button
              type="submit"
              className="btn-primary w-1/6 rounded-full h-1/2 bg-blue-100 hover:bg-blue-700 text-blue-800 hover:text-white font-bold border-2 border-blue-500 rounded"
            >
              Salvează
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary w-1/6 rounded-full h-1/2 bg-blue-100 hover:bg-blue-700 text-blue-800 hover:text-white font-bold border-2 border-blue-500 rounded"
            >
              Anulează
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditPacientModal;
