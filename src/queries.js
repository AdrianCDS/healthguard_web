import { gql } from "@apollo/client";

export const GET_USER_BY_TOKEN_QUERY = gql`
  query GetUserByTokenQuery($token: String!) {
    getUserByToken(token: $token) {
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
    }
  }
`;

export const GET_USER_BY_PACIENT_ID_QUERY = gql`
  query GetUserByPacientIdQuery($id: ID!) {
    getUserByPacientId(id: $id) {
      id
      email
      firstName
      lastName
      phoneNumber
      pacientProfile {
        id
        cnp
        age
        state
        workPlace
        profession
        address {
          city
          country
          street
          streetNumber
        }
        recommandations {
          activityType {
            type
          }
          startDate
          daysDuration
        }
        sensorData {
          type
          value
          date
        }
      }
    }
  }
`;

export const GET_MEDIC_DATA_QUERY = gql`
  query GetMedicDataQuery($token: String!) {
    getUserByToken(token: $token) {
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
    }
    getMedicPacients(userId: null, getByToken: $token) {
      firstName
      lastName
      email
      cnp
      phoneNumber
      insertedAt
    }
  }
`;

export const GET_MEDIC_PACIENTS_DATA_QUERY = gql`
  query GetMedicPacientsDataQuery($id: ID!) {
    getMedicPacients(userId: $id) {
      id
      firstName
      lastName
      email
      cnp
      phoneNumber
      insertedAt
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      token
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation LogoutMutation($token: String!) {
    logoutUser(input: { token: $token }) {
      token
    }
  }
`;
