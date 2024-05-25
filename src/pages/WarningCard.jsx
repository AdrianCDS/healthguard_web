import React from "react";
import heartWarningImage from "../assets/heartwarning.png";

function WarningCard({
  activityType,
  sensorType,
  minValue,
  maxValue,
  definedDate,
  triggeredDate,
  message,
  triggered,
  lastSensorData,
}) {
  const formatDate = (date) => {
    if (!date) return "-";
    const formattedDate = new Date(date);
    return isNaN(formattedDate.getTime())
      ? "-"
      : formattedDate.toLocaleString();
  };

  let typeOfSensor = {
    value: "",
  };

  switch (sensorType) {
    case "BPM":
      typeOfSensor = lastSensorData.bpm;
      break;

    case "TEMPERATURE":
      typeOfSensor = lastSensorData.temperature;
      break;

    case "HUMIDITY":
      typeOfSensor = lastSensorData.humidity;
      break;

    case "ECG":
      typeOfSensor = lastSensorData.ecg;
      break;

    default:
      break;
  }

  return (
    <div className="bg-blue-200 p-4 rounded-md shadow-md flex items-center mb-4">
      <img
        src={heartWarningImage}
        alt="Warning Icon"
        className="w-20 h-20 mr-4"
      />
      <div className="flex flex-col">
        <p className="text-red-900 font-bold">For: {activityType}</p>
        <p className="text-blue-700 font-semibold">
          Normal {sensorType} range: {minValue} - {maxValue}
        </p>
        {message ? (
          <p className="text-gray-700">Notes: {message}</p>
        ) : (
          <p className="text-gray-700">Notes: -</p>
        )}
        {triggered ? (
          <div className="flex flex-col space-y-1">
            <p className="text-lg font-bold text-red-500">
              WARNING: Values exceeded
            </p>
            <p className="text-lg font-semibold text-red-600">
              Current value: {typeOfSensor.value}
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {triggered ? (
        <div className="ml-auto text-right flex flex-col space-y-2">
          <p className="text-gray-900">Defined at: {formatDate(definedDate)}</p>
          <p className="text-gray-900 font-bold text-red-500">
            Triggered at: {formatDate(triggeredDate)}
          </p>
        </div>
      ) : (
        <div className="ml-auto text-right flex flex-col space-y-2">
          <p className="text-gray-900">Defined at: {formatDate(definedDate)}</p>
        </div>
      )}
    </div>
  );
}

export default WarningCard;
