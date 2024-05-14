import React from "react";
import heartalertSvg from "../assets/heartalert.svg";
import WarningCard from "./WarningCard";

function Alerts() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/5 bg-blue-300 flex flex-col items-center">
        <h1 className="text-white text-6xl text-center font-bold pt-8 pb-2 text-blue-700">
          Alerts
        </h1>
        <p className="text-xl text-blue-700 mb-0">Mario Rossi</p>
        <img
          src={heartalertSvg}
          className="w-1/2 h-1/2 mt-auto mb-4"
          alt="Heart Alert"
        />
      </div>
      <div className="flex-1 bg-white flex justify-center items-center">
        <div className="w-2/3 mx-auto">
          <WarningCard value={160} parameter="bpm" alertDate={new Date()} />
          <WarningCard value={160} parameter="bpm" alertDate={new Date()} />
          <WarningCard value={160} parameter="bpm" alertDate={new Date()} />
          <WarningCard value={160} parameter="bpm" alertDate={new Date()} />
        </div>
      </div>
    </div>
  );
}

export default Alerts;
