import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

const classNameElement =
  "mt-2 w-full max-w-md border-2 border-blue-200 h-10 pl-3 rounded-lg focus:outline-none overflow-hidden  transition-all duration-500 hover:border-blue-500 focus:border-blue-500 focus:shadow-outline focus:bg-white";

// Component pentru dropdown cu recomandări
const DropdownRecomandari = ({ recomandari, onRecomandareAdaugata }) => {
  const [nouaRecomandare, setNouaRecomandare] = useState("");

  const handleChange = (event) => {
    setNouaRecomandare(event.target.value);
  };

  const handleAdaugaRecomandare = () => {
    if (nouaRecomandare.trim() !== "") {
      onRecomandareAdaugata(nouaRecomandare);
      setNouaRecomandare("");
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="recomandari" className="block font-bold mb-1">
        Recomandări doctor
      </label>
      <select id="recomandari" className={classNameElement}>
        <option value="">Alege o recomandare</option>
        {recomandari.map((recomandare, index) => (
          <option key={index}>{recomandare}</option>
        ))}
      </select>
      <div className="mt-2 flex items-center">
        <input
          type="text"
          value={nouaRecomandare}
          onChange={handleChange}
          className={classNameElement}
          placeholder="Adaugă o recomandare nouă"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-2"
          onClick={handleAdaugaRecomandare}
        >
          Adaugă
        </button>
      </div>
    </div>
  );
};

const AfiseazaRecomandari = ({ recomandari }) => {
  return (
    <div className="mb-6">
      <h2>Recomandări</h2>
      <div className="recomandari-container">
        {Object.entries(recomandari).map(([recomandare, detalii]) => (
          <div
            key={recomandare}
            className="w-3/4 h-min flex  justify-between p-2 border border-solid border-blue-500 rounded-lg bg-blue-100 overflow-hidden ml-5 mt-2 "
          >
            <h3>{recomandare}</h3>
            <p>Zile: {detalii.zile}</p>
            <p>Note: {detalii.note}</p>
            <p>Start Date: {detalii.startData}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Recomandari() {
  const [pacient, setPacient] = useState({
    recomandari: {
      bicicleta: { zile: "2", note: "note", startData: "start date" },
      plimbare: { frecventa: "zilnic", startData: "start data" },
    },
  });

  const [recomandariDoctor, setRecomandariDoctor] = useState([
    "Mers pe jos 30 de minute zilnic",
    "Consumul a minim 2 litri de apă pe zi",
    "Alimentație echilibrată și bogată în legume și fructe",
    "Odihna adecvată, minim 7-8 ore de somn pe noapte",
    "Evitarea consumului de alcool și fumatului",
  ]);

  const handleRecomandareAdaugata = (nouaRecomandare) => {
    setRecomandariDoctor((prevRecomandari) => [
      ...prevRecomandari,
      nouaRecomandare,
    ]);
  };

  const handleAdaugaRecomandarePacient = () => {
    const numarRecomandari = Object.keys(pacient.recomandari).length + 1;
    const numeRecomandare = `Recomandare ${numarRecomandari}`;
    setPacient((prevPacient) => ({
      recomandari: {
        ...prevPacient.recomandari,
        [numeRecomandare]: { zile: "", note: "", startData: "" },
      },
    }));
  };

  return (
    <div
      className="bg-cover h-screen "
      style={{
        backgroundImage: "url('src/assets/login-background.PNG')",
        backgroundSize: "cover",
      }}
    >
      <div className="h-screen flex justify-center items-center">
        <div className="w-1/2">
          <AfiseazaRecomandari recomandari={pacient.recomandari} />
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <div className="mt-4 w-full max-w-md">
            <DropdownRecomandari
              recomandari={recomandariDoctor}
              onRecomandareAdaugata={handleRecomandareAdaugata}
              className="w-full"
            />
          </div>
          <div className="mt-4 w-full max-w-md">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Start date" className="w-full" />
            </LocalizationProvider>
          </div>
          <input
            className={classNameElement}
            type="text"
            placeholder="Durata zile"
          />
          <textarea
            className="mt-4 w-full max-w-md border-2 border-gray-300 h-32 pl-3 pt-3 rounded-lg focus:outline-none resize-none bg-blue-100"
            placeholder="Notițe"
          ></textarea>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
            onClick={handleAdaugaRecomandarePacient}
          >
            Adaugă Recomandare Pacient
          </button>
        </div>
      </div>
    </div>
  );
}
