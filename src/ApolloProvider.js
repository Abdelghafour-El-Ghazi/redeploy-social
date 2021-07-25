import React from "react";
import App from "./App";
import {
  ApolloProvider as ApolloProvider2,
} from '@apollo/react-components'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "https://nameless-bastion-67517.herokuapp.com/",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider2 client={client}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ApolloProvider2>
);
