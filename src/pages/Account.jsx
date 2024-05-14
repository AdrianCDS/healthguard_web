import { Link } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { AUTH_TOKEN } from "../constants";
import { gql, useQuery } from "@apollo/client";
import * as Queries from "../queries";

function Account() {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const { data } = useQuery(Queries.GET_USER_BY_TOKEN_QUERY, {
    variables: { token: authToken },
  });

  const doctor = data?.getUserByToken;

  return (
    <div
      className="w-full bg-cover h-screen flex justify-between bg-white"
      style={{
        backgroundImage: "url('src/assets/abstract_background_2.svg')",
        backgroundSize: "cover",
      }}
    >
      {doctor ? (
        <div className="w-full flex flex-col items-center p-8">
          <div className="w-full h-full flex">
            <div className="w-1/4 flex flex-col space-y-4">
              <Link
                to="/dashboard"
                className="w-1/4 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 border-2 border-blue-500 rounded "
              >
                ⟵ Back
              </Link>
              <div className="pt-4 flex flex-col bg-blue-200 text-white items-center h-full rounded-l-2xl overflow-y-auto">
                <UserPlusIcon className="w-24 h-24 text-blue-500" />
                <div className="flex space-x-2 items-center">
                  <p className="text-xl text-blue-700">
                    Dr. {doctor.firstName}
                  </p>
                  <p className="text-xl text-blue-700">{doctor.lastName}</p>
                </div>
              </div>
            </div>
            <div className="w-3/4 flex flex-col divide-y-2 p-4 mt-12">
              <div>
                <p className="text-lg font-semibold pb-2">Account details</p>
                <div className="flex flex-col space-y-4 pt-1 pb-4">
                  <div className="w-1/4">
                    <p>Badge number</p>
                    <p className="text-gray-600">
                      {doctor.medicProfile.badgeNumber}
                    </p>
                  </div>
                  <div className="w-1/4">
                    <p>Email</p>
                    <p className="text-gray-600">{doctor.email}</p>
                  </div>
                  <div className="w-1/4">
                    <p>Phone number</p>
                    <p className="text-gray-600">{doctor.phoneNumber}</p>
                  </div>
                  <div className="w-1/4">
                    <p>Total pacients</p>
                    <p className="text-gray-600">
                      {doctor.medicProfile.pacients.length}
                    </p>
                  </div>
                </div>
                <img
                  src="/src/assets/bookmarks_artwork.svg"
                  className="w-1/2 h-1/2 pt-12"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
}

export default Account;
