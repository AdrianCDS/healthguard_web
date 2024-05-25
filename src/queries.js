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
        healthWarnings {
          type
          message
          minValue
          maxValue
          triggered
          triggeredDate
          definedDate
          activityType {
            type
          }
        }
        recommandations {
          note
          recommandation
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
    getPacientLastReadSensorData(pacientId: $id) {
      date
      type
      value
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
      pacientProfile {
        id
        state
        sensorData {
          type
          value
          date
        }
        healthWarnings {
          triggered
          minValue
          maxValue
          triggeredDate
          definedDate
          type
          activityType {
            type
          }
          message
        }
      }
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

export const DELETE_PACIENT_USER_MUTATION = gql`
  mutation DeletePacientUserMutation($id: ID!) {
    deletePacientUser(pacientId: $id)
  }
`;

export const REGISTER_PACIENT_MUTATION = gql`
  mutation RegisterPacientMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $cnp: String!
    $age: Int!
    $workPlace: String!
    $profession: String!
    $country: String!
    $city: String!
    $street: String!
    $streetNumber: Int!
    $medicEmail: String!
  ) {
    registerPacientByMedic(
      input: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        pacientProfile: {
          cnp: $cnp
          age: $age
          workPlace: $workPlace
          profession: $profession
          address: {
            country: $country
            city: $city
            street: $street
            streetNumber: $streetNumber
          }
        }
        medicEmail: $medicEmail
      }
    ) {
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
        state
        address {
          country
          city
          street
          streetNumber
        }
        medicProfile {
          id
          badgeNumber
        }
      }
    }
  }
`;

export const ADD_RECOMMANDATION_TO_PACIENT_MUTATION = gql`
  mutation AddRecommandationToPacientMutation(
    $id: ID!
    $recommandation: String!
    $startDate: String!
    $daysDuration: Int!
    $note: String!
  ) {
    addRecommandation(
      input: {
        id: $id
        recommandation: $recommandation
        startDate: $startDate
        note: $note
        daysDuration: $daysDuration
      }
    ) {
      id
      firstName
      lastName
      email
      pacientProfile {
        id
        recommandations {
          recommandation
          activityType {
            type
          }
          startDate
          daysDuration
          note
        }
      }
    }
  }
`;

export const ADD_ALERT_TO_PACIENT_MUTATION = gql`
  mutation AddAlertToPacientMutation(
    $pacientId: ID!
    $minValue: Float!
    $maxValue: Float!
    $message: String!
    $activityType: ActivityTypeEnum!
    $sensorType: SensorTypeEnum!
  ) {
    addAlert(
      input: {
        id: $pacientId
        type: $sensorType
        minValue: $minValue
        maxValue: $maxValue
        message: $message
        activityType: { type: $activityType }
      }
    ) {
      id
      firstName
      lastName
      pacientProfile {
        id
        cnp
        age
        healthWarnings {
          type
          triggered
          triggeredDate
          definedDate
          message
          minValue
          maxValue
          activityType {
            type
          }
        }
      }
    }
  }
`;

export const UPDATE_PACIENT_USER_MUTATION = gql`
  mutation UpdatePacientUserMutation(
    $id: ID!
    $email: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $age: Int!
    $workPlace: String!
    $profession: String!
    $country: String!
    $city: String!
    $street: String!
    $streetNumber: Int!
  ) {
    updatePacientUser(
      input: {
        pacientId: $id
        email: $email
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        age: $age
        workPlace: $workPlace
        profession: $profession
        country: $country
        city: $city
        street: $street
        streetNumber: $streetNumber
      }
    ) {
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
        state
        medicProfile {
          id
          badgeNumber
        }
        address {
          country
          city
          street
          streetNumber
        }
      }
    }
  }
`;

export const GET_PACIENT_LAST_READ_SENSOR_DATA_QUERY = gql`
  enum SensorType {
    TEMPERATURE
    BPM
    HUMIDITY
    ECG
  }

  query GetPacientLastReadSensorDataQuery($pacientId: ID!) {
    getPacientLastSensorData(pacientId: $pacientId, sensorType: BPM) {
      type
      value
      date
    }
  }
`;
