import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        People: {
                            keyArgs: [],
                            merge(existing, incoming, { args: { offset = 0 }}) {
                                // Slicing is necessary because the existing data is
                                // immutable, and frozen in development.
                                const merged = existing ? existing.slice(0) : [];
                                for (let i = 0; i < incoming.length; ++i) {
                                    merged[offset + i] = incoming[i];
                                }
                                return merged;
                            },
                        },
                    },
                },
            },
        }
    ),
    uri: "http://localhost:4000/graphql"
});

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
