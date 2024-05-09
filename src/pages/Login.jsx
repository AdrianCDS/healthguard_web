import "./../assets/general-styles.css";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { AUTH_TOKEN } from "../constants";

function Login() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    badge_number: "",
  });

  const navigate = useNavigate();

  const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
      loginUser(input: { email: $email, password: $password }) {
        token
      }
    }
  `;

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("ERROR: " + error);
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formState);
      await login({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });
    } catch (error) {
      console.error("Caught error: " + error);
    }
  };

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
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        email: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
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
                    value={formState.password}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        password: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                  />
                </div>
                {/* <div className="mb-10">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="badgeNumber"
                  >
                    Badge number
                  </label>
                  <input
                    value={formState.badge_number}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        email: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="badgeNumber"
                    type="text"
                  />
                </div> */}
                <div className="mb-10 w-100">
                  <div className="flex justify-center w-full">
                    <div
                      onClick={handleFormSubmit}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded w-full"
                    >
                      Log in
                    </div>
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
