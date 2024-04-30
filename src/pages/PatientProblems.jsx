import React from "react";

function PatientProblems({ nume, prenume, probleme }) {
  return (
    <div className="border border-blue-100 border-4 p-4 rounded-lg text-center bg-blue-300 flex flex-row ">
      <span>{nume} </span>
      <span>{prenume}</span>
      <span>: {probleme}</span>
    </div>
  );
}

export default PatientProblems;
