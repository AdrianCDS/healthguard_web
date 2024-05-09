import React, { useState } from "react";
import { Line } from "react-chartjs-2";

export default function AlertCard({
  first_name,
  last_name,
  bpm,
  temperature,
  humidity,
  ecgData,
}) {
  // Configurați datele pentru graficul ECG
  const ecgChartOptions = {
    scales: {
      y: {
        type: "linear",
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  const ecgChartData = {
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ], // Datele tale ECG
    datasets: [
      {
        label: "ECG",
        data: ecgData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="border border-blue-100 border-4 rounded-lg text-center bg-white flex flex-col items-center p-4">
      <div className="flex text-lg font-bold items-center space-x-2 text-white">
        <p className="text-blue-500">{first_name}</p>
        <p className="text-blue-500">{last_name}</p>
      </div>
      <div className="flex justify-between items-start space-x-4">
        <div>
          <p className="font-semibold text-blue-500">
            BPM: <span className="font-bold text-red-500">{bpm}</span>
          </p>
        </div>
        <div>
          <p className="font-semibold text-blue-500">
            Temperature:{" "}
            <span className="font-bold text-red-500">{temperature} C</span>
          </p>
        </div>
        <div>
          <p className="font-semibold text-blue-500">
            Humidity:{" "}
            <span className="font-bold text-red-500">{humidity}%</span>
          </p>
        </div>
      </div>
      {/* Afiseaza graficul ECG */}
      <div className="w-full">
        <Line
          data={ecgChartData}
          options={ecgChartOptions}
          key={JSON.stringify(ecgData)}
        />
      </div>
    </div>
  );
}
