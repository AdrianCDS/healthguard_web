import React, { useRef } from "react";

function DeletePacientModal({ onCancel, onConfirm }) {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onCancel();
    }
  };

  // Adăugați un ascultător de eveniment pentru clic în afara modalului
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex flex-col justify-center items-center">
      <div ref={modalRef} className="bg-blue-200 p-6 rounded-lg w-1/3 h-1/3">
        <h2 className="text-xl font-bold mb-4">Confirm delete</h2>
        <p className="mb-4">Are you sure you want to delete this pacient?</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePacientModal;