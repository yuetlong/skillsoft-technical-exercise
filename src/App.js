import React, { useState, useEffect } from 'react';
import PersonCard from './PersonCard';
import { ApolloClient, gql, InMemoryCache} from "@apollo/client";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql"
});

function App() {
  const [people, setPeople] = useState([]);

  const personCards = people.map((person, idx) =>
      <Grid item xs={12} md={4} key={idx}>
        <PersonCard data={person} />
      </Grid>
  );

  const fetchPeople = (first, offset) => {
    client.query({
      query: gql`
        query TestQuery {
          People (offset: ${offset}, first: ${first}){
            name
            homeworld {
              name
            }
            height
            mass
            birth_year
          }
        }
      `
    })
    .then(result => {
      if (result.data.People != null && result.data.People.length > 0){
        setPeople(people.concat(result.data.People))
      }
    });
  }


  const loadMore = () => {
    fetchPeople(10, people.length);
  }

  useEffect(() => {loadMore();}, []);

  return (
    <div className="App">
      <Grid container spacing={3}>
          {personCards}
          <Button variant="outlined" color="primary" onClick={() => loadMore()}>
            Load more...
          </Button>
      </Grid>

    </div>
  );
}

export default App;
