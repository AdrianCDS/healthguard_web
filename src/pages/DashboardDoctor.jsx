import React from "react";
import ButtonsGroup from "./ButtonsGroup";
import PatientProblems from "./PatientProblems";
import Alerts from "./Alerts";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function DashboardDoctor() {
  const buttonLabels = {
    Detalii: "Detalii Cont",
    Lista: "Lista Pacienti",
    Cereri: "Cereri Pacienți",
    Delogare: "Delogare",
  };

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    if (confirmation) {
      setIsLoggedIn(false); // Setează starea autentificării la false pentru a efectua redirectarea
    }
  };
  const handleLogoutConfirmation = () => {
    const confirmation = window.confirm(
      "Ești sigur că vrei să te deconectezi?"
    );
    if (confirmation) {
      handleLogout(); // Delogare utilizator
    }
  };

  const handleButtonClick = (buttonName) => {
    console.log(`Butonul ${buttonName} a fost apăsat.`);
    // Returnează un Link către ruta corespunzătoare
    switch (buttonName) {
      case "Lista":
        return <Link to="/listapacienti" />;

      case "Detalii":
        return <Link to="/detaliicont" />;

      default:
        return null;
    }
  };
  return (
    <div
      className=" h-screen w-full bg-cover h-screen flex items-center justify-center bg-white"
      style={{
        backgroundImage: "url('src/assets/dashboard.PNG')",
        backgroundSize: "cover",
      }}
    >
      <div className="h-screen w-full ">
        <div className="h-1/5 flex justify-center ">
          <h1 className="text-6xl font-bold">HealthGuard-Wear</h1>
        </div>
        <div className="h-4/5 flex">
          <div className="w-1/5 flex flex-col justify-between h-full">
            <ButtonsGroup
              onButtonClick={handleButtonClick}
              buttonLabels={buttonLabels}
              orientation="vertical"
            />
          </div>
          <div className="w-4/5 flex flex-col justify-center items-center">
            <div className="h-1/4 w-2/3 flex justify-around items-center gap-5">
              <div className="border border-blue-500 border-4 h-3/4  w-72 rounded-lg text-center">
                <p>Total Pacienti</p>
              </div>
              <div className="border border-blue-500 border-4 h-3/4  w-72 rounded-lg text-center">
                <p>Pacient Adaugat Recent</p>
              </div>
              <div className="border border-blue-500 border-4 h-3/4  w-72 rounded-lg text-center">
                <p>Urmatoarea Consultatie</p>
              </div>
            </div>
            <div className="h-3/4 w-full flex justify-center gap-3">
              <div className="w-2/5 h-full flex flex-col justify-around gap-4">
                <div className="border border-blue-500 border-4  rounded-lg text-center bg-blue-400 text-white h-auto ">
                  <p>Pacienti adaugati recent</p>

                  <div className="flex flex-col justify-around items-center gap-4">
                    {" "}
                    <PatientProblems
                      nume="Popescu"
                      prenume="Ion"
                      probleme="Durere în piept, tuse persistentă"
                    />
                    <PatientProblems
                      nume="Popescu"
                      prenume="Ion"
                      probleme="Durere în piept, tuse persistentă"
                    />
                    <PatientProblems
                      nume="Popescu"
                      prenume="Ion"
                      probleme="Durere în piept, tuse persistentă"
                    />
                  </div>
                </div>
                <div className="border border-blue-500 border-4  rounded-lg text-center bg-blue-400 text-white  ">
                  <p>Consultatii viitoare</p>
                  <div className="flex flex-col justify-around items-center gap-4">
                    <PatientProblems
                      nume="Popescu"
                      prenume="Ion"
                      probleme="Durere în piept, tuse persistentă"
                    />
                    <PatientProblems
                      nume="Popescu"
                      prenume="Ion"
                      probleme="Durere în piept, tuse persistentă"
                    />
                    <PatientProblems
                      nume="Popescu"
                      prenume="Ion"
                      probleme="Durere în piept, tuse persistentă"
                    />
                    <PatientProblems
                      nume="Popescu"
                      prenume="Ion"
                      probleme="Durere în piept, tuse persistentă"
                    />
                    <PatientProblems
                      nume="Popescu"
                      prenume="Ion"
                      probleme="Durere în piept, tuse persistentă"
                    />
                  </div>
                </div>
              </div>
              <div className="w-2/5 h-full">
                <div className="border border-blue-500 border-4  rounded-lg text-center bg-blue-400 text-white h-auto h-full">
                  <p> Alarme Declansate</p>
                  <div className="flex flex-col justify-around items-center w-full">
                    <Alerts
                      nume="Ionescu "
                      prenume="Ionel"
                      puls="90bps"
                      tensiune="13/3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isLoggedIn && <Redirect to="/login" />}
      </div>
    </div>
  );
}
