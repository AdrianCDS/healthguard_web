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
let apiKey = import.meta.env.VITE_API_KEY;

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Basic ${apiKey}`,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
