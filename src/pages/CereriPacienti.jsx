import Menu from "./Menu";
import { Link } from "react-router-dom";
import RenderCerere from "./RenderCerere";

function CereriPacienti() {
  const pacienti = [
    {
      nume: "Tom",
      prenume: "John",
      email: "tom@email.com",
    },
    {
      nume: "Ja",
      prenume: "Jessie",
      email: "jsica@email.com",
    },
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
        <div className="h-1/5 flex  ">
          <h1 className="text-4xl font-bold">HealthGuard-Wear</h1>
        </div>
        <div className="h-1/5 flex w-4/5 justify-between items-center">
          <Link to="/dashboard">
            <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 border-2 border-blue-500 rounded">
              ⟵ Înapoi
            </button>
          </Link>
        </div>
        <div className="h-4/5 flex flex-col w-1/2 ">
          <div className="h-1/5 w-full  flex flex-row justify-between">
            <input
              className="h-1/2 rounded-full bg-blue-100  border-2 border-blue-500  placeholder-blue-400 focus:text-blue-800 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="⌕ Cauta pacienti"
            />
          </div>
          <div className="h-4/5 flex flex-col items-center gap-3 ">
            {pacienti.map((pacient, index) => (
              <RenderCerere
                key={index}
                nume={pacient.nume}
                prenume={pacient.prenume}
                email={pacient.email}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CereriPacienti;
