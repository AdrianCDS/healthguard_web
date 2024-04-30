import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function ButtonsGroup({ buttonLabels }) {
  const [activeButton, setActiveButton] = useState(null);
  const history = useHistory();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleLogout = () => {
    const confirmation = window.confirm(
      "Ești sigur că vrei să te deconectezi?"
    );
    if (confirmation) {
      // Efectuăm acțiunile de delogare aici
      // De exemplu, putem reseta starea autentificării
      // și putem redirecționa utilizatorul către pagina de autentificare sau către pagina de start

      // Resetează starea autentificării (exemplu)
      // setIsLoggedIn(false);

      // Redirecționează utilizatorul către pagina de autentificare
      history.push("/login");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Link
        to="/detaliicont"
        className={`w-1/2 h-16 p-3 rounded-lg mb-4 focus:outline-none text-lg text-center ${
          activeButton === "Detalii"
            ? "bg-blue-500 border-4 border-blue-800 text-white"
            : "bg-white border border-blue-700 text-blue-700"
        } hover:bg-blue-300 hover:border-blue-300 hover:text-white transition-colors`}
        onClick={() => handleButtonClick("Detalii")}
      >
        {buttonLabels["Detalii"]}
      </Link>
      <Link
        to="/listapacienti"
        className={`w-1/2 h-16 p-3 rounded-lg mb-4 focus:outline-none text-lg text-center ${
          activeButton === "Lista"
            ? "bg-blue-500 border-4 border-blue-800 text-white"
            : "bg-white border border-blue-700 text-blue-700"
        } hover:bg-blue-300 hover:border-blue-300 hover:text-white transition-colors`}
        onClick={() => handleButtonClick("Lista")}
      >
        {buttonLabels["Lista"]}
      </Link>
      <Link
        to="/cereripacienti"
        className={`w-1/2 h-16 p-3 rounded-lg mb-4 focus:outline-none text-lg text-center ${
          activeButton === "Cereri"
            ? "bg-blue-500 border-4 border-blue-800 text-white"
            : "bg-white border border-blue-700 text-blue-700"
        } hover:bg-blue-300 hover:border-blue-300 hover:text-white transition-colors`}
        onClick={() => handleButtonClick("Cereri")}
      >
        {buttonLabels["Cereri"]}
      </Link>
      <button
        className={`w-1/2 h-16 p-3 rounded-lg mb-4 focus:outline-none text-lg text-center ${
          activeButton === "Delogare"
            ? "bg-blue-500 border-4 border-blue-800 text-white"
            : "bg-white border border-blue-700 text-blue-700"
        } hover:bg-blue-300 hover:border-blue-300 hover:text-white transition-colors`}
        onClick={() => {
          handleButtonClick("Delogare");
          handleLogout(); // Apelarea funcției de delogare la apăsarea butonului
        }}
      >
        {buttonLabels["Delogare"]}
      </button>
    </div>
  );
}

export default ButtonsGroup;
