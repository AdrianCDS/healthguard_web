import { useState } from "react";
import RejectPacientRequestModal from "./RejectPacientRequestModal";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { gql, useMutation, useQuery } from "@apollo/client";
import * as Queries from "../queries";

function PacientRequestCard({
  id,
  name,
  cnp,
  phone_number,
  email,
  onReject,
  onAccept,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleRejectClick = () => {
    setShowModal(true);
  };

  const handleAcceptClick = () => {
    onAccept();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmReject = () => {
    onReject();
    setShowModal(false);
  };

  return (
    <div className="w-3/4 h-min flex flex-row items-center justify-between p-2 border border-solid border-blue-500 rounded-lg bg-blue-100 overflow-hidden">
      <div className="flex space-x-2 items-center">
        <UserCircleIcon className="w-6 h-6 text-blue-500" />
        <p>{name}</p>
      </div>
      <p>{email}</p>
      <p>{phone_number}</p>
      <p>{cnp}</p>
      <div className="relative w-1/3 h-10 flex flex-row items-center gap-4">
        <button
          className="flex items-center justify-center w-full h-full hover:bg-blue-700 hover:text-white border border-solid border-blue-500 rounded-lg bg-blue-300"
          onClick={handleAcceptClick}
        >
          <p>Accept</p>
        </button>

        <button
          className="flex items-center justify-center w-full h-full hover:bg-blue-700 hover:text-white border border-solid border-blue-500 rounded-lg bg-blue-300"
          onClick={handleRejectClick}
        >
          <p>Reject</p>
        </button>
      </div>
      {showModal && (
        <RejectPacientRequestModal
          onCancel={handleCloseModal}
          onConfirm={handleConfirmReject}
        />
      )}
    </div>
  );
}

export default PacientRequestCard;
