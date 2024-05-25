import React from "react";
import heartalertSvg from "../assets/heartalert.svg";
import WarningCard from "./WarningCard";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import * as Queries from "../queries";

function Alerts() {
  let { pacientId } = useParams();

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
            <img
              src={heartalertSvg}
              className="w-1/2 h-1/2 mt-auto mb-4"
              alt="Heart Alert"
            />
          </div>
          <div className="flex-1 bg-white flex justify-center items-center overflow-y-scroll">
            <div className="w-3/4 mx-auto pt-32 pb-16">
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
                    lastSensorData={pacientLastSensorData}
                  />
                )
              )}
            </div>
          </div>
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
