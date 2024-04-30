import { Link } from "react-router-dom";
import { useState } from "react";
import RenderPacient from "./RenderPacient";
import AdaugaPacientModal from "./AdaugaPacientModal";

function ListaPacienti() {
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Funcție pentru gestionarea evenimentului de click pe butonul de filtru
  const handleFilterClick = () => {
    // Inversează starea de sortare la fiecare clic pe buton
    setAscendingOrder(!ascendingOrder);
  };
  const handleOpenModal = () => {
    setModalOpen(true); // Deschide modalul când este apelată această funcție
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Închide modalul când este apelată această funcție
  };

  const handleAddPacient = (pacientNou) => {
    // Implementează adăugarea efectivă a pacientului în lista ta de pacienți
    console.log("Pacient nou:", pacientNou);
  };

  const pacienti = [
    {
      nume: "John Doe",
      cnp: "1234567890123",
      telefon: "0712345678",
      status: "activ",
    },
    {
      nume: "Jane Smith",
      cnp: "9876543210987",
      telefon: "0723456789",
      status: "inactiv",
    },
    {
      nume: "Tom Jay",
      cnp: "9876543210987",
      telefon: "0623456789",
      status: "inactiv",
    },
    // Alți pacienți...
  ];
  return (
    <div
      className="bg-auto h-screen flex items-center justify-center bg-white"
      style={{
        backgroundImage: "url('src/assets/login-background.PNG')",
        backgroundSize: "cover",
      }}
    >
      <div className="h-screen w-full flex flex-col items-center ">
        <div className="h-1/5 flex w-4/5 justify-between items-center">
          <Link to="/dashboard">
            <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 border-2 border-blue-500 rounded">
              ⟵ Înapoi
            </button>
          </Link>

          <button
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 border-2 border-blue-500 rounded"
            onClick={handleOpenModal}
          >
            Adauga Pacienti
          </button>
        </div>
        <div className="h-4/5 flex flex-col w-3/4 ">
          <div className="h-1/5 w-full justify-between flex flex-row">
            <input
              className="h-1/2 rounded-full bg-blue-100  border-2 border-blue-500  placeholder-blue-400 focus:text-blue-800 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="⌕ Cauta pacienti"
            />
            <button
              className="w-1/6 rounded-full h-1/2 bg-blue-100 hover:bg-blue-700 text-blue-800 font-bold  border-2 border-blue-500 rounded "
              onClick={handleFilterClick}
            >
              {ascendingOrder ? "↑ Crescător" : "↓ Descrescător"}
            </button>
          </div>
          <div className="h-4/5 w-full flex flex-col gap-3 items-center">
            {pacienti.map((pacient, index) => (
              <RenderPacient
                key={index}
                nume={pacient.nume}
                cnp={pacient.cnp}
                telefon={pacient.telefon}
                status={pacient.status}
              />
            ))}
          </div>
        </div>
      </div>
      {modalOpen && ( // Afiseaza modalul doar daca modalOpen este true
        <AdaugaPacientModal
          onClose={handleCloseModal} // Pasam functia de inchidere a modalei ca prop pentru a putea fi apelata din interiorul modalei
          onAddPacient={handleAddPacient} // Pasam functia pentru adaugarea pacientului ca prop
        />
      )}
    </div>
  );
}

export default ListaPacienti;
