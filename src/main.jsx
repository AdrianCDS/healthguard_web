import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

let apiUrl = import.meta.env.VITE_API_URL;

console.log(
  `HOST (in-use): ${import.meta.env.MODE} / API URL (in-use): ${apiUrl}`
);

const client = new ApolloClient({
  uri: `${apiUrl}/api/graphql`,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
