import React, { useState, useEffect } from 'react';
import PersonCard from './PersonCard';
import { ApolloClient, gql, InMemoryCache, useQuery } from "@apollo/client";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';



function App() {
    const MAIN_QUERY = gql`
        query TestQuery ($offset: Int!, $first: Int!){
            People (offset: $offset, first: $first){
                name
                homeworld {
                    name
                }
                height
                mass
                birth_year
            }
        }
    `;
    const { loading, error, data, fetchMore} = useQuery(MAIN_QUERY, {
        variables: {
            offset: 0,
            first: 10
        }
    });

  return (
    <div className="App">
        {loading ? "loading..." :
            <Grid container spacing={3}>
                {
                    data.People.map((person, idx) =>
                        <Grid item xs={12} md={4} key={idx}>
                            <PersonCard data={person} />
                        </Grid>)
                }
                <Button variant="outlined" color="primary" onClick={() => fetchMore({
                    variables: {
                        offset: data.People.length,
                        limit: 10
                    }
                })}>
                    Load more...
                </Button>
            </Grid>
        }
    </div>
  );
}

export default App;
