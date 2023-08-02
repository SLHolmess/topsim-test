// import { default as ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core/index.js"
import { removeLastTrailingSlash } from './util';

let client: any;

/**
 * getApolloClient
 */

 export function getApolloClient() {
    if (!client) {
      client = _createApolloClient();
    }
    return client;
  }
  
  /**
   * createApolloClient
   */
  
  export function _createApolloClient() {
    return new ApolloClient({
      link: new HttpLink({
        uri: removeLastTrailingSlash(import.meta.env.WORDPRESS_GRAPHQL_ENDPOINT as string),
      }),
      cache: new InMemoryCache({
        typePolicies: {
          RootQuery: {
            queryType: true,
          },
          RootMutation: {
            mutationType: true,
          },
        },
      }),
    });
  }