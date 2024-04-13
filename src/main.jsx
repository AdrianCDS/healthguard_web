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

const isProduction = process.env.NODE_ENV === "production";

let apiUrl = isProduction ? process.env.API_PROD_HOST : "http://localhost:4000";

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
