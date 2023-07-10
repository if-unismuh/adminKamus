import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const apollo = new ApolloClient({
    uri: 'https://kamus.if.unismuh.ac.id/graphql',
    cache: new InMemoryCache(),
  });


  export default apollo;