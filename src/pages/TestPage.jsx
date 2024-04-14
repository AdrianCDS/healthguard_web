import { gql, useQuery } from "@apollo/client";

function TestPage() {
  const { data, loading, error } = useQuery(GET_USERS_QUERY);

  const users = data?.users;

  if (loading) return <p>Almost there...</p>;
  if (error) return <p>{error.message}</p>;

  return <pre>{JSON.stringify(users, null, "  ")}</pre>;
}

export const GET_USERS_QUERY = gql`
  {
    users {
      id
      email
      firstName
      lastName
      phoneNumber
      medicProfile {
        id
        badgeNumber
        pacients {
          id
          cnp
          age
        }
      }
      pacientProfile {
        id
        cnp
        age
        medicProfile {
          id
          badgeNumber
        }
      }
    }
  }
`;

export default TestPage;
