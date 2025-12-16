// import { ApolloClient, InMemoryCache } from "@apollo/client";

// export const client = new ApolloClient({
//   uri: "http://localhost:8000/graphql/",
//   cache: new InMemoryCache(),
// });


import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const link = new HttpLink({
  uri: "http://localhost:8000/graphql/",
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
