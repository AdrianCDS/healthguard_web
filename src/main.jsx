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

// const isProduction = process.env.NODE_ENV === "production";

let apiUrl = import.meta.env.VITE_API_URL;

console.log(`MODE (from env): ${import.meta.env.MODE}`);
console.log(`API URL (from env): ${apiUrl}`);

console.log(
  `HOST (in-use): ${process.env.NODE_ENV} / API URL (in-use): ${apiUrl}`
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
