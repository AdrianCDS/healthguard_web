import React, { useEffect, useRef, useState } from "react";
import heartalertSvg from "../assets/heartalert.svg";
import WarningCard from "./WarningCard";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import * as Queries from "../queries";
import Modal from "react-modal";

const inputClassName =
  "w-full border-blue-400 input rounded px-8 py-2 border-2 border-transparent focus:outline-none focus:border-blue-500  transition-all duration-300 shadow-md rounded-lg  mb-4";

const classNameElement =
  "mt-2 w-full max-w-md border-2 border-blue-200 h-10 pl-3 rounded-lg focus:outline-none overflow-hidden  transition-all duration-500 hover:border-blue-500 focus:border-blue-500 focus:shadow-outline focus:bg-white";

function Alerts() {
  let { pacientId } = useParams();
  const [sensorType, setSelectedSensorType] = useState("");
  const [minValue, setSelectedMinValue] = useState(0);
  const [maxValue, setSelectedMaxValue] = useState(0);
  const [message, setSelectedMessage] = useState("");
  const [activityType, setSelectedActivityType] = useState("");
  const [addAlertModalOpen, setAddAlertModalOpen] = useState(false);

  const modalRef = useRef();

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setAddAlertModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseModal);
    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, []);

  const pacientQueryResult = useQuery(Queries.GET_USER_BY_PACIENT_ID_QUERY, {
    variables: { id: pacientId },
  });

  const pacient = pacientQueryResult.data?.getUserByPacientId;
  const lastReadSensorData =
    pacientQueryResult.data?.getPacientLastReadSensorData;

  let bpm, ecg, temperature, humidity;

  lastReadSensorData?.forEach((item) => {
    switch (item.type) {
      case "BPM":
        bpm = item;
        break;
      case "ECG":
        ecg = item;
        break;
      case "TEMPERATURE":
        temperature = item;
        break;
      case "HUMIDITY":
        humidity = item;
        break;
      default:
        console.log(`Unknown type: ${item.type}`);
    }
  });

  const pacientLastSensorData = {
    bpm: bpm,
    humidity: humidity,
    temperature: temperature,
    ecg: ecg,
  };

  const [addAlert] = useMutation(Queries.ADD_ALERT_TO_PACIENT_MUTATION, {
    onCompleted: ({ addAlert }) => {
      console.log("Successfully added alert!", addAlert);
      setAddAlertModalOpen(false);
    },
    onError: ({ error }) => {
      console.error("ERROR: " + error);
    },
  });

  const handleAddAlert = async () => {
    try {
      await addAlert({
        variables: {
          pacientId: pacientId,
          minValue: parseFloat(minValue),
          maxValue: parseFloat(maxValue),
          message: message,
          sensorType: sensorType,
          activityType: activityType,
        },
      });
    } catch (error) {
      console.error("Error adding alert:", error);
    }
  };

  return (
    <div
      className="w-full bg-cover h-screen flex justify-between bg-white"
      style={{ backgroundImage: "url('src/assets/abstract_background_2.svg')" }}
    >
      {pacient && pacientLastSensorData ? (
        <div className="w-full h-screen flex">
          <div className="w-1/5 bg-blue-300 flex flex-col items-center">
            <h1 className="text-white text-6xl text-center font-bold pt-8 pb-2 text-blue-700">
              Alerts
            </h1>
            <p className="text-xl text-blue-700 mb-0">{`${pacient.firstName} ${pacient.lastName}`}</p>
            <button
              className="w-3/4 bg-white hover:bg-blue-50 font-semibold text-blue-700 py-2 px-4 rounded-lg mt-8 border-2 border-blue-700"
              onClick={() => setAddAlertModalOpen(true)}
            >
              Define new alert
            </button>
            <img
              src={heartalertSvg}
              className="w-1/2 h-1/2 mt-auto mb-4"
              alt="Heart Alert"
            />
          </div>
          <div className="w-full flex-1 bg-white flex justify-center items-center overflow-y-scroll">
            <div className="w-3/4 grid grid-cols-2 gap-4 mx-auto mt-32 pb-8">
              {pacient.pacientProfile.healthWarnings.length ? (
                <div className="w-3/4 grid grid-cols-2 gap-4 mx-auto mt-32 pb-8">
                  {pacient.pacientProfile.healthWarnings.map(
                    (healthWarning, index) => (
                      <WarningCard
                        key={index}
                        triggered={healthWarning.triggered}
                        activityType={healthWarning.activityType.type}
                        minValue={healthWarning.minValue}
                        maxValue={healthWarning.maxValue}
                        definedDate={healthWarning.definedDate}
                        triggeredDate={healthWarning.triggeredDate}
                        sensorType={healthWarning.type}
                        message={healthWarning.message}
                        lastSensorData={pacientLastSensorData}
                      />
                    )
                  )}
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <p className="font-bold text-2xl pb-64 mb-64">
                    This pacient doesn't have any alerts
                  </p>
                </div>
              )}
            </div>
          </div>
          <Modal
            isOpen={addAlertModalOpen}
            onRequestClose={handleCloseModal}
            ariaHideApp={false}
            contentLabel="Add new alert"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div
              ref={modalRef}
              className="relative bg-blue-100 rounded-lg p-8 w-1/2 h-3/4 overflow-y-auto"
            >
              <span
                className="absolute top-2 right-5 cursor-pointer"
                onClick={() => setAddAlertModalOpen(false)}
              >
                &times;
              </span>

              <form>
                <div className="mb-4">
                  <label
                    htmlFor="sensorType"
                    className="block font-bold mb-1 text-xl"
                  >
                    For sensor
                  </label>
                  <select
                    id="sensorType"
                    className={classNameElement}
                    onChange={(e) => setSelectedSensorType(e.target.value)}
                  >
                    <option value="">Choose an option</option>
                    <option>{"BPM"}</option>
                    <option>{"TEMPERATURE"}</option>
                    <option>{"ECG"}</option>
                    <option>{"HUMIDITY"}</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="activityType"
                    className="block font-bold mb-1 text-xl"
                  >
                    For activity
                  </label>
                  <select
                    id="activityType"
                    className={classNameElement}
                    onChange={(e) => setSelectedActivityType(e.target.value)}
                  >
                    <option value="">Choose an option</option>
                    <option>{"SEDENTARY"}</option>
                    <option>{"WALKING"}</option>
                    <option>{"JOGGING"}</option>
                    <option>{"RUNNING"}</option>
                    <option>{"CYCLING"}</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="minValue" className="block mb-1">
                    Min value
                  </label>
                  <input
                    type="text"
                    name="minValue"
                    onChange={(e) => setSelectedMinValue(e.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="maxValue" className="block mb-1">
                    Max value
                  </label>
                  <input
                    type="text"
                    name="maxValue"
                    onChange={(e) => setSelectedMaxValue(e.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block mb-1">
                    Notes for this alert (optional)
                  </label>
                  <input
                    type="textarea"
                    name="message"
                    onChange={(e) => setSelectedMessage(e.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => setAddAlertModalOpen(false)}
                    className="btn-secondary w-1/6 rounded-full h-1/2 bg-blue-100 hover:bg-blue-700 text-blue-800 hover:text-white font-bold border-2 border-blue-500 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddAlert}
                    className="btn-primary w-1/6 rounded-full h-1/2 bg-blue-100 hover:bg-blue-700 text-blue-800 hover:text-white font-bold border-2 border-blue-500 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      ) : (
        <div className="flex items-center justify-center mx-auto">
          <h1 className="font-bold text-5xl text-center">
            Failed to load pacient!
          </h1>
        </div>
      )}
    </div>
  );
}

export default Alerts;
