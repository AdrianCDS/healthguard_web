import React from "react";
import ButtonsGroup from "./ButtonsGroup";
import PatientDetailsSummaryCard from "./PatientDetailsSummaryCard";
import AlertCard from "./AlertCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { AUTH_TOKEN } from "../constants";
import { useQuery } from "@apollo/client";
import * as Queries from "../queries";

export default function Dashboard() {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const userQueryResult = useQuery(Queries.GET_USER_BY_TOKEN_QUERY, {
    variables: { token: authToken },
  });

  const medic = userQueryResult.data?.getUserByToken;

  const pacientsDataQueryResult = useQuery(
    Queries.GET_MEDIC_PACIENTS_DATA_QUERY,
    {
      variables: { id: medic?.id },
    }
  );

  const pacients = pacientsDataQueryResult.data?.getMedicPacients;

  let mostRecentPatientEmail = null;
  let triggeredAlerts = null;

  if (pacients) {
    const pacientsWithTriggeredWarnings = pacients
      .map((pacient) => {
        const triggeredWarnings = pacient.pacientProfile.healthWarnings.filter(
          (warning) => warning.triggered
        );
        if (triggeredWarnings.length > 0) {
          return {
            ...pacient,
            healthWarnings: triggeredWarnings,
          };
        }
        return null;
      })
      .filter((pacient) => pacient !== null);

    const [mostRecentPatient] = [...pacients].sort(
      (a, b) => new Date(b.insertedAt) - new Date(a.insertedAt)
    );

    mostRecentPatientEmail = mostRecentPatient.email;
    triggeredAlerts = pacientsWithTriggeredWarnings;
  }

  const buttonLabels = {
    Details: "Account details",
    List: "List pacients",
    Requests: "Pacient requests",
    Logout: "Logout",
  };

  const handleButtonClick = (buttonName) => {
    switch (buttonName) {
      case "List":
        return <Link to="/pacients" />;

      case "Details":
        return <Link to="/account" />;

      default:
        return null;
    }
  };
  return (
    <div
      className="w-full bg-cover h-screen flex justify-between bg-white overflow-hidden"
      style={{
        backgroundImage: "url('src/assets/abstract_background_2.svg')",
        backgroundSize: "cover",
      }}
    >
      {authToken &&
      medic &&
      pacients &&
      mostRecentPatientEmail &&
      triggeredAlerts ? (
        <div className="w-full bg-cover flex justify-between">
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
          <div className="w-3/4 flex px-32 pt-24 justify-between items-start">
            <div className="flex flex-col space-y-4 h-full pb-32">
              <h1 className="font-semibold text-xl">
                Welcome back, {medic.firstName}!
              </h1>
              <div className="flex justify-between items-center gap-5 mr-4">
                <div className="flex flex-col bg-white items-end border border-blue-300 border-4 rounded-lg text-center p-4">
                  <img
                    src="src/assets/pacient_wheelchair_artwork.svg"
                    className="w-36 h-36"
                  />
                  <p className="font-semibold text-gray-700 text-md">
                    Total pacients
                  </p>
                  <p className="text-black font-bold text-lg italic">
                    {medic.medicProfile.pacients.length}
                  </p>
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
                    {mostRecentPatientEmail}
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
                  <p className="text-black font-bold text-lg italic">N/A</p>
                </div>
              </div>
              <div className="h-full flex justify-between gap-4">
                <div className="w-full border border-blue-400 border-4 rounded-lg text-center bg-blue-400 p-4 h-3/4 overflow-y-scroll">
                  <p className="text-white pb-2 text-2xl font-bold ">
                    Last added pacients
                  </p>
                  <div className="flex flex-col items-center space-y-4 text-white">
                    {[...pacients]
                      .reverse()
                      .filter(
                        (pacient) => pacient.pacientProfile.state == "CONFIRMED"
                      )
                      .map((pacient, index) => (
                        <PatientDetailsSummaryCard
                          key={index}
                          first_name={pacient.firstName}
                          last_name={pacient.lastName}
                          date={pacient.insertedAt}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full flex items-center justify-center gap-3 mx-auto pb-12">
              <div className="border border-blue-400 border-4 overflow-y-auto rounded-lg text-center bg-blue-400 h-full p-4 h-fulloverflow-y-scroll">
                <p className="text-white text-2xl  font-bold pb-2">
                  Triggered alerts
                </p>
                <div className="flex flex-col space-y-4 justify-around items-center text-white w-full">
                  {triggeredAlerts.map((triggeredPacient, index) => (
                    <AlertCard
                      key={index}
                      first_name={triggeredPacient.firstName}
                      last_name={triggeredPacient.lastName}
                      bpm={
                        triggeredPacient.pacientProfile.sensorData.filter(
                          (data) => data.type === "BPM"
                        )[0]?.value
                      }
                      temperature={
                        triggeredPacient.pacientProfile.sensorData.filter(
                          (data) => data.type === "TEMPERATURE"
                        )[0]?.value
                      }
                      humidity={
                        triggeredPacient.pacientProfile.sensorData.filter(
                          (data) => data.type === "HUMIDITY"
                        )[0]?.value
                      }
                      ecgData={
                        triggeredPacient.pacientProfile.sensorData.filter(
                          (data) => data.type === "ECG"
                        )[0]?.value
                      }
                    />
                  ))}
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
