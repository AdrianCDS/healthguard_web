import { Link } from "react-router-dom";
import Menu from "./Menu";

function Home() {
  return (
    <div>
      <Menu />

      <div
        className="bg-cover h-screen flex items-center justify-center bg-white"
        style={{ backgroundImage: "url('src/assets/homepagefade.png')" }}
      >
        <div className="flex flex-col space-y-12 rounded-lg text-blue-900 text-center items-center">
          <div className="flex flex-col space-y-2">
            <h1 className="text-8xl font-bold">Welcome to HealthGuard Wear.</h1>
            <h2 className="text-6xl font-boldtext-blue-800">
              Access your dashboard down below
            </h2>
          </div>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded rounded-xl w-1/4"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
