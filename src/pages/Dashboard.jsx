import React from "react";
import ButtonsGroup from "./ButtonsGroup";
import PatientDetailsSummaryCard from "./PatientDetailsSummaryCard";
import AlertCard from "./AlertCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { AUTH_TOKEN } from "../constants";

export default function Dashboard() {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const buttonLabels = {
    Details: "Account details",
    List: "List pacients",
    Requests: "Pacient requests",
    Logout: "Logout",
  };

  const handleButtonClick = (buttonName) => {
    console.log(`Butonul ${buttonName} a fost apăsat.`);
    // Returnează un Link către ruta corespunzătoare
    switch (buttonName) {
      case "Lista":
        return <Link to="/ListPacients" />;

      case "Detalii":
        return <Link to="/detaliicont" />;

      default:
        return null;
    }
  };
  return (
    <div
      className="w-full bg-cover h-screen flex justify-between bg-white"
      style={{
        backgroundImage: "url('src/assets/abstract_background_2.svg')",
        backgroundSize: "cover",
      }}
    >
      {authToken ? (
        <div className="w-full bg-cover h-screen flex justify-between">
          <div className="w-1/4 p-4 flex flex-col space-y-4 h-full bg-blue-300">
            <h1 className="text-5xl text-center font-bold pb-6 pt-8 text-blue-700">
              HealthGuard-Wear
            </h1>
            <ButtonsGroup
              onButtonClick={handleButtonClick}
              buttonLabels={buttonLabels}
              orientation="vertical"
            />
            <img src="src/assets/medics_artwork.svg" className="pt-36" />
          </div>
          <div className="w-3/4 flex px-32 pt-32 justify-between items-start">
            <div className="flex flex-col space-y-4 h-full pb-32">
              <div className="flex justify-between items-center gap-5">
                <div className="flex flex-col bg-white items-end border border-blue-300 border-4 rounded-lg text-center p-4">
                  <img
                    src="src/assets/pacient_wheelchair_artwork.svg"
                    className="w-36 h-36"
                  />
                  <p className="font-semibold text-gray-700 text-md">
                    Total pacients
                  </p>
                  <p className="text-black font-bold text-lg italic">6</p>
                </div>
                <div className="flex flex-col bg-white items-end border border-blue-300 border-4 rounded-lg text-center p-4">
                  <img
                    src="src/assets/last_added_artwork.svg"
                    className="w-36 h-36"
                  />
                  <p className="font-semibold text-gray-700 text-md">
                    Last added pacient
                  </p>
                  <p className="text-black font-bold text-lg italic">
                    user@gmail.com
                  </p>
                </div>
                <div className="flex flex-col bg-white items-end border border-blue-300 border-4 rounded-lg text-center p-4">
                  <img
                    src="src/assets/schedule_artwork.svg"
                    className="w-36 h-36"
                  />
                  <p className="font-semibold text-gray-700 text-md">
                    Next appointment
                  </p>
                  <p className="text-black font-bold text-lg italic">
                    12 Dec 2023
                  </p>
                </div>
              </div>
              <div className="h-full flex justify-between gap-4">
                <div className="border border-blue-400 border-4  rounded-lg text-center bg-blue-400 h-auto p-4">
                  <p className="text-white pb-2 text-2xl font-bold ">
                    Last added pacients
                  </p>
                  <div className="flex flex-col items-center space-y-4 text-white">
                    <PatientDetailsSummaryCard
                      first_name="Popescu"
                      last_name="Ion"
                      date="12 Dec 2023"
                    />
                    <PatientDetailsSummaryCard
                      first_name="Jamila"
                      last_name="Cuisine"
                      date="12 Dec 2023"
                    />
                    <PatientDetailsSummaryCard
                      first_name="Jamila"
                      last_name="Cuisine"
                      date="12 Dec 2023"
                    />
                    <PatientDetailsSummaryCard
                      first_name="Jane"
                      last_name="Roberts"
                      date="12 Dec 2023"
                    />
                  </div>
                </div>
                <div className="border border-blue-400 border-4  rounded-lg text-center bg-blue-400 p-4">
                  <p className="text-white pb-2 text-2xl font-bold ">
                    Future appointments
                  </p>
                  <div className="flex flex-col justify-around items-center gap-4 text-white">
                    <PatientDetailsSummaryCard
                      first_name="Popescu"
                      last_name="Ion"
                      date="12 Dec 2023"
                    />
                    <PatientDetailsSummaryCard
                      first_name="Jamila"
                      last_name="Cuisine"
                      date="12 Dec 2023"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full pb-32 flex justify-center gap-3">
              <div className="border border-blue-400 border-4  overflow-y-auto rounded-lg text-center bg-blue-400 h-full p-4">
                <p className="text-white text-2xl  font-bold pb-2">
                  Triggered alerts
                </p>
                <div className="flex flex-col space-y-4 justify-around items-center text-white w-full">
                  <AlertCard
                    first_name="Gabi"
                    last_name="Ionel"
                    bpm="90"
                    temperature="37.5"
                    humidity="50"
                    ecgData={[
                      0.1, 0.3, 0.5, 0.4, 0.2, 0.3, 0.6, 0.8, 0.7, 0.4, 0.6,
                      0.5, 0.5, 0.3, 0.1,
                    ]}
                  />
                  <AlertCard
                    first_name="Alex"
                    last_name="Popescu"
                    bpm="90"
                    temperature="37.5"
                    humidity="50"
                    ecgData={[
                      0.1, 0.3, 0.5, 0.4, 0.2, 0.3, 0.6, 0.8, 0.7, 0.4, 0.6,
                      0.5, 0.5, 0.3, 0.1,
                    ]}
                  />
                  <AlertCard
                    first_name="Raluca"
                    last_name="Ioan"
                    bpm="90"
                    temperature="37.5"
                    humidity="50"
                    ecgData={[
                      0.1, 0.3, 0.5, 0.4, 0.2, 0.3, 0.6, 0.8, 0.7, 0.4, 0.6,
                      0.5, 0.5, 0.3, 0.1,
                    ]}
                  />
                  <AlertCard
                    first_name="Alex"
                    last_name="Popescu"
                    bpm="90"
                    temperature="37.5"
                    humidity="50"
                    ecgData={[
                      0.1, 0.3, 0.5, 0.4, 0.2, 0.3, 0.6, 0.8, 0.7, 0.4, 0.6,
                      0.5, 0.5, 0.3, 0.1,
                    ]}
                  />
                  <AlertCard
                    first_name="Raluca"
                    last_name="Ioan"
                    bpm="90"
                    temperature="37.5"
                    humidity="50"
                    ecgData={[
                      0.1, 0.3, 0.5, 0.4, 0.2, 0.3, 0.6, 0.8, 0.7, 0.4, 0.6,
                      0.5, 0.5, 0.3, 0.1,
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mx-auto">
          <h1 className="font-bold text-5xl text-center">
            You are not logged in
          </h1>
        </div>
      )}
      ;
    </div>
  );
}
