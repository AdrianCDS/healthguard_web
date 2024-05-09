import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./../assets/general-styles.css";

function Login() {
  return (
    <div>
      <Navbar />
      <div
        className="bg-cover h-screen flex items-center justify-center bg-white"
        style={{
          backgroundImage: "url('src/assets/login-background.PNG')",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-cover h-full pb-64 flex items-center justify-center bg-white login-bg">
          <div className="p-8 rounded-lg text-blue-800 text-left mx-auto">
            <div style={{ width: "488px", height: "283px" }}>
              <h1 className="text-3xl font-bold mb-10 text-center">
                Log into your account
              </h1>

              <form className="w-full">
                <div className="mb-10">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                  />
                </div>
                <div className="mb-10">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                  />
                </div>
                <div className="mb-10">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="badgeNumber"
                  >
                    Badge number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="badgeNumber"
                    type="text"
                  />
                </div>
                <div className="mb-10 w-100">
                  <div className="flex justify-center w-full">
                    <Link to="/dashboard" className="width-100">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded w-full">
                        Log in
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
