import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const apollo = new ApolloClient({
    uri: 'http://152.67.98.241:3000/graphql',
    cache: new InMemoryCache(),
  });


  export default apollo;