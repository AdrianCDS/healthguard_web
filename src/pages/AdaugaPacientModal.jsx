import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";

function AdaugaPacientModal({ onClose, onAddPacient }) {
  const [step, setStep] = useState(1);
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [varsta, setVarsta] = useState("");
  const [cnp, setCNP] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [locMunca, setLocMunca] = useState("");
  const [profesie, setProfesie] = useState("");
  const [tara, setTara] = useState("");
  const [oras, setOras] = useState("");
  const [strada, setStrada] = useState("");
  const [numar, setNumar] = useState("");
  const [alergii, setAlergii] = useState([]);
  const optiuniAlergii = [
    { value: "alergie1", label: "Alergie 1" },
    { value: "alergie2", label: "Alergie 2" },
    // Adaugă alte opțiuni aici
  ];
  const formData = new FormData();

  const inputClassName =
    "w-full border-blue-400input rounded px-8 py-2 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md rounded-lg  mb-4";

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

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const pacientNou = {
      nume,
      prenume,
      varsta,
      cnp,
      telefon,
      email,
      locMunca,
      profesie,
      adresa: { tara, oras, strada, numar },
      alergii: [],
    };
    onAddPacient(pacientNou);
    onClose();
  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleAlergiiChange = (selectedOptions) => {
    const alergiiValues = selectedOptions.map((option) => option.value);
    setAlergii(alergiiValues); // Actualizează starea 'alergii'
  };

  const handleAlergiiDelete = (removedAlergie) => {
    const filteredAlergii = alergii.filter(
      (alergie) => alergie !== removedAlergie
    );
    setAlergii(filteredAlergii); // Actualizează starea 'alergii'
  };

  const renderAlergiiChips = () => {
    return alergii.map((alergie, index) => (
      <div key={index} className="chip">
        {alergie}
        <button
          type="button"
          onClick={() => handleAlergiiDelete(alergie)}
        ></button>
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-blue-100 rounded-lg p-8 w-1/2 h-3/4 overflow-y-auto"
      >
        <span className="top-0 right-0 cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <div className="flex justify-between mb-4">
          <button
            className={`bg-blue-400 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full mr-2 ${
              step === 1 ? "bg-blue-900" : ""
            }`}
            onClick={() => setStep(1)}
          >
            Pas 1
          </button>
          <button
            className={`bg-blue-400 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full mr-2 ${
              step === 2 ? "bg-blue-700" : ""
            }`}
            onClick={() => setStep(2)}
            disabled={step === 1}
          >
            Pas 2
          </button>
          <button
            className={`bg-blue-400 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full mr-2 ${
              step === 3 ? "bg-blue-700" : ""
            }`}
            onClick={() => setStep(3)}
            disabled={step === 3}
          >
            Pas 3
          </button>
        </div>
        {step === 1 && (
          <form onSubmit={handleNextStep}>
            <input
              type="text"
              value={nume}
              onChange={(e) => setNume(e.target.value)}
              placeholder="Nume"
              className={inputClassName}
              required
            />
            <input
              type="text"
              value={prenume}
              onChange={(e) => setPrenume(e.target.value)}
              placeholder="Prenume"
              className={inputClassName}
              required
            />
            <select
              value={varsta}
              onChange={(e) => setVarsta(e.target.value)}
              className={inputClassName}
              required
            >
              <option value="">Selectează vârsta</option>
              {Array.from({ length: 101 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={cnp}
              onChange={(e) => {
                const inputCNP = e.target.value;
                if (/^\d{0,13}$/.test(inputCNP)) {
                  setCNP(inputCNP);
                }
              }}
              placeholder="CNP"
              className={inputClassName}
              required
            />

            <input
              type="tel"
              value={telefon}
              onChange={(e) => {
                const inputTelefon = e.target.value;
                if (/^\d{0,15}$/.test(inputTelefon)) {
                  setTelefon(inputTelefon);
                }
              }}
              placeholder="Telefon"
              className={inputClassName}
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={inputClassName}
            />

            <input
              type="text"
              value={locMunca}
              onChange={(e) => setLocMunca(e.target.value)}
              placeholder="Loc de munca"
              className={inputClassName}
            />
            <input
              type="text"
              value={profesie}
              onChange={(e) => setProfesie(e.target.value)}
              placeholder="Profesie"
              className={inputClassName}
            />
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Urmatorul
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleNextStep}>
            <input
              type="text"
              value={tara}
              onChange={(e) => setTara(e.target.value)}
              placeholder="Tara"
              className={inputClassName}
              required
            />
            <input
              type="text"
              value={oras}
              onChange={(e) => setOras(e.target.value)}
              placeholder="Oras"
              className={inputClassName}
              required
            />
            <input
              type="text"
              value={strada}
              onChange={(e) => setStrada(e.target.value)}
              placeholder="Strada"
              className={inputClassName}
              required
            />
            <input
              type="text"
              value={numar}
              onChange={(e) => setNumar(e.target.value)}
              placeholder="Numar"
              className={inputClassName}
              required
            />
            <button
              type="button"
              onClick={handlePrevStep}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Urmatorul
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <div className="alergii-dropdown gap-3">
              <Select
                isMulti
                options={optiuniAlergii}
                value={alergii.map((alergie) => ({
                  label: alergie,
                  value: alergie,
                }))}
                onChange={handleAlergiiChange}
                placeholder="Selectează alergii..."
              />
            </div>
            {/* <div className="alergii-chips  ">{renderAlergiiChips()}</div> */}
            <button
              type="button"
              onClick={handlePrevStep}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Anterior
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Adaugă Pacient
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AdaugaPacientModal;
