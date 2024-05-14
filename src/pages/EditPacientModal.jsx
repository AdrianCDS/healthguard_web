import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";

function EditPacientModal({ isOpen, onClose, initialPacientData, onSave }) {
  const [firstName, setFirstName] = useState(initialPacientData.firstName);
  const [lastName, setLastName] = useState(initialPacientData.lastName);
  const [phoneNumber, setPhoneNumber] = useState(
    initialPacientData.phoneNumber
  );
  const [email, setEmail] = useState(initialPacientData.email);
  const [age, setAge] = useState(initialPacientData.pacientProfile.age);
  const [workPlace, setWorkPlace] = useState(
    initialPacientData.pacientProfile.workPlace
  );
  const [profession, seteProfession] = useState(
    initialPacientData.pacientProfile.profession
  );
  const [country, setCountry] = useState(
    initialPacientData.pacientProfile.address &&
      initialPacientData.pacientProfile.address.country
  );
  const [city, setCity] = useState(
    initialPacientData.pacientProfile.address &&
      initialPacientData.pacientProfile.address.city
  );
  const [street, setStreet] = useState(
    initialPacientData.pacientProfile.address &&
      initialPacientData.pacientProfile.address.street
  );
  const [streetNumber, setStreetNumber] = useState(
    initialPacientData.pacientProfile.address &&
      initialPacientData.pacientProfile.address.streetNumber
  );

  const handleChange = (e, event) => {
    event(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pacient = {
      id: parseInt(initialPacientData.pacientProfile.id),
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      age: parseInt(age),
      workPlace: workPlace,
      profession: profession,
      country: country,
      city: city,
      street: street,
      streetNumber: parseInt(streetNumber),
    };

    onSave(pacient);
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
      ariaHideApp={false}
      contentLabel="Edit pacient"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      {initialPacientData ? (
        <div
          ref={modalRef}
          className="relative bg-blue-100 rounded-lg p-8 w-1/2 h-3/4 overflow-y-auto"
        >
          <span
            className="absolute top-2 right-5 cursor-pointer"
            onClick={onClose}
          >
            &times;
          </span>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">First name</label>
              <input
                type="text"
                name="name"
                value={firstName}
                onChange={(e) => handleChange(e.target.value, setFirstName)}
                className={inputClassName}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Last name</label>
              <input
                type="text"
                name="name"
                value={lastName}
                onChange={(e) => handleChange(e.target.value, setLastName)}
                className={inputClassName}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Age</label>
              <input
                type="text"
                name="age"
                value={age}
                onChange={(e) => handleChange(e.target.value, setAge)}
                className={inputClassName}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Work place</label>
              <input
                type="text"
                name="work_place"
                value={workPlace}
                onChange={(e) => handleChange(e.target.value, setWorkPlace)}
                className={inputClassName}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={country}
                onChange={(e) => handleChange(e.target.value, setCountry)}
                className={inputClassName}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">City</label>
              <input
                type="text"
                name="city"
                value={city}
                onChange={(e) => handleChange(e.target.value, setCity)}
                className={inputClassName}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Street</label>
              <input
                type="text"
                name="street"
                value={street}
                onChange={(e) => handleChange(e.target.value, setStreet)}
                className={inputClassName}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Street Number</label>
              <input
                type="text"
                name="street_number"
                value={streetNumber}
                onChange={(e) => handleChange(e.target.value, setStreetNumber)}
                className={inputClassName}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => handleChange(e.target.value, setEmail)}
                className={inputClassName}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Phone number</label>
              <input
                type="text"
                name="phone_number"
                value={phoneNumber}
                onChange={(e) => handleChange(e.target.value, setPhoneNumber)}
                className={inputClassName}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={profession}
                onChange={(e) => handleChange(e.target.value, seteProfession)}
                className={inputClassName}
              />
            </div>
            {/* <div className="mb-4">
              <label className="block mb-1">Allergies</label>
              <input
                type="text"
                name="allergies"
                value=""
                onChange={(e) => handleChange(e.target.value, "")}
                className={inputClassName}
              />
            </div> */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary w-1/6 rounded-full h-1/2 bg-blue-100 hover:bg-blue-700 text-blue-800 hover:text-white font-bold border-2 border-blue-500 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary w-1/6 rounded-full h-1/2 bg-blue-100 hover:bg-blue-700 text-blue-800 hover:text-white font-bold border-2 border-blue-500 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-center mx-auto">
          <h1 className="font-bold text-5xl text-center">Loading...</h1>
        </div>
      )}
    </Modal>
  );
}

export default EditPacientModal;
