import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";

function AddPacientModal({ onClose, onAddPacient }) {
  const [step, setStep] = useState(1);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [cnp, setCNP] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [work_place, setWorkPlace] = useState("");
  const [occupation, setOccupation] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [street_number, setStreetNumber] = useState("");
  const [alergies, setAlergies] = useState([]);
  const optionsAlergies = [
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
      first_name,
      last_name,
      age,
      cnp,
      phone_number,
      email,
      work_place,
      occupation,
      adresa: { country, city, street, street_number },
      alergies: [],
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

  const handleAlergiesChange = (selectedOptions) => {
    const alergiesValues = selectedOptions.map((option) => option.value);
    setAlergies(alergiesValues); // Actualizează starea 'alergies'
  };

  const handleAlergiesDelete = (removedAlergie) => {
    const filteredAlergies = alergies.filter(
      (alergie) => alergie !== removedAlergie
    );
    setAlergies(filteredAlergies); // Actualizează starea 'alergies'
  };

  const renderAlergiesChips = () => {
    return alergies.map((alergie, index) => (
      <div key={index} className="chip">
        {alergie}
        <button
          type="button"
          onClick={() => handleAlergiesDelete(alergie)}
        ></button>
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative bg-blue-100 rounded-lg p-8 w-1/2 h-3/4 overflow-y-auto"
      >
        <span
          className="absolute top-1 right-4 cursor-pointer text-2xl"
          onClick={onClose}
        >
          &times;
        </span>
        <div className="flex justify-between mb-4">
          <button
            className={`bg-blue-400 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full mr-2 ${
              step === 1 ? "bg-blue-900" : ""
            }`}
            onClick={() => setStep(1)}
          >
            Step 1
          </button>
          <button
            className={`bg-blue-400 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full mr-2 ${
              step === 2 ? "bg-blue-700" : ""
            }`}
            onClick={() => setStep(2)}
            disabled={step === 1}
          >
            Step 2
          </button>
          <button
            className={`bg-blue-400 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full mr-2 ${
              step === 3 ? "bg-blue-700" : ""
            }`}
            onClick={() => setStep(3)}
            disabled={step === 3}
          >
            Step 3
          </button>
        </div>
        {step === 1 && (
          <form onSubmit={handleNextStep}>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className={inputClassName}
              required
            />
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className={inputClassName}
              required
            />
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={inputClassName}
              required
            >
              <option value="">Select age</option>
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
              value={phone_number}
              onChange={(e) => {
                const inputPhoneNumber = e.target.value;
                if (/^\d{0,15}$/.test(inputPhoneNumber)) {
                  setPhoneNumber(inputPhoneNumber);
                }
              }}
              placeholder="Phone number"
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
              value={work_place}
              onChange={(e) => setWorkPlace(e.target.value)}
              placeholder="Work place"
              className={inputClassName}
            />
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="Occupation"
              className={inputClassName}
            />
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Next
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleNextStep}>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className={inputClassName}
              required
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className={inputClassName}
              required
            />
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street"
              className={inputClassName}
              required
            />
            <input
              type="text"
              value={street_number}
              onChange={(e) => setStreetNumber(e.target.value)}
              placeholder="Street number"
              className={inputClassName}
              required
            />
            <button
              type="button"
              onClick={handlePrevStep}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Next
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="alergies-dropdown gap-3">
              <Select
                isMulti
                options={optionsAlergies}
                value={alergies.map((alergie) => ({
                  label: alergie,
                  value: alergie,
                }))}
                onChange={handleAlergiesChange}
                placeholder="Select alergies..."
              />
            </div>
            {/* <div className="alergies-chips  ">{renderAlergiesChips()}</div> */}
            <div>
              <button
                type="button"
                onClick={handlePrevStep}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add pacient
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddPacientModal;
