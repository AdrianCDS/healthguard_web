import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  UsersIcon,
  ArrowLeftStartOnRectangleIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { AUTH_TOKEN } from "../constants";
import { gql, useMutation, useQuery } from "@apollo/client";
import * as Queries from "../queries";

function ButtonsGroup({ buttonLabels }) {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const [logout] = useMutation(Queries.LOGOUT_MUTATION, {
    variables: {
      token: authToken,
    },
    onCompleted: ({ logoutUser }) => {
      localStorage.removeItem(AUTH_TOKEN);
      navigate("/login");
    },
    onError: ({ error }) => {
      console.error("ERROR: " + error);
    },
  });

  const handleRemoveSessionToken = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Caught error: " + error);
    }
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleLogout = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (confirmation) {
      handleRemoveSessionToken();
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <Link
        to="/account"
        className={`w-full flex space-x-2 items-center p-2 rounded-lg focus:outline-none text-lg text-left text-blue-500 ${
          activeButton === "Details"
            ? "bg-blue-500 border-4 border-blue-800 text-white"
            : "bg-white border border-blue-700 text-blue-700"
        } hover:bg-blue-500 hover:border-blue-300 hover:text-white transition-colors`}
        onClick={() => handleButtonClick("Details")}
      >
        <ListBulletIcon className="h-6 w-6" />
        <p>{buttonLabels["Details"]}</p>
      </Link>
      <Link
        to="/pacients"
        className={`w-full flex space-x-2 items-center p-2 rounded-lg focus:outline-none text-lg text-left text-blue-500 ${
          activeButton === "List"
            ? "bg-blue-500 border-4 border-blue-800 text-white"
            : "bg-white border border-blue-700 text-blue-700"
        } hover:bg-blue-500 hover:border-blue-300 hover:text-white transition-colors`}
        onClick={() => handleButtonClick("List")}
      >
        <UsersIcon className="h-6 w-6" />
        <p>{buttonLabels["List"]}</p>
      </Link>
      <Link
        to="/pacients/requests"
        className={`w-full flex space-x-2 items-center p-2 rounded-lg focus:outline-none text-lg text-left text-blue-500 ${
          activeButton === "Requests"
            ? "bg-blue-500 border-4 border-blue-800 text-white"
            : "bg-white border border-blue-700 text-blue-700"
        } hover:bg-blue-500 hover:border-blue-300 hover:text-white transition-colors`}
        onClick={() => handleButtonClick("Requests")}
      >
        <EnvelopeIcon className="h-6 w-6" />
        <p>{buttonLabels["Requests"]}</p>
      </Link>
      <button
        className={`w-full flex space-x-2 items-center p-2 rounded-lg focus:outline-none text-lg text-left text-blue-500 ${
          activeButton === "Logout"
            ? "bg-blue-500 border-4 border-blue-800 text-white"
            : "bg-white border border-blue-700 text-blue-700"
        } hover:bg-blue-500 hover:border-blue-300 hover:text-white transition-colors`}
        onClick={() => {
          handleButtonClick("Logout");
          handleLogout();
        }}
      >
        <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
        <p>{buttonLabels["Logout"]}</p>
      </button>
    </div>
  );
}

export default ButtonsGroup;
