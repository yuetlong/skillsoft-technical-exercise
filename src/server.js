const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
const fs = require('fs');

const typeDefs = gql`
    # Only display the name, origin, height, mass, and birth date.
    
    type Person {
        name: String
        homeworld: Planet
        height: String
        mass: String
        birth_year: String
    }
    
    type Planet {
        name: String
    }

    type Query {
        People(first: Int, offset: Int): [Person]
    }
`;

const fetchAll = async (resourceName, writeToFile) => {
    const doFetch = async () => {
        let resource = [];
        let link = `https://swapi.dev/api/${resourceName}`;
        while (link != null) {
            const response = await axios.get(link);
            response.data.results.forEach(e => resource.push(e));
            link = response.data.next;
        }
        return resource;
    };

    const resource = await doFetch();

    if (writeToFile) {
        fs.writeFile(`temp/${resourceName}.json`, JSON.stringify(resource), (err) => {
            if (err) {
                throw err;
            }
            console.log(`${resourceName}.json is saved`);
        });
    }
    return resource;
}

const deserializeAll = (resourceName) => {
    const str = fs.readFileSync(`temp/${resourceName}.json`, 'utf8');
    return JSON.parse(str);
}

let people = [];
let planets = [];

// (async () => {
//     people = await fetchAll("people", true);
//     planets = await fetchAll("planets", true);
// })();

people = deserializeAll("people");
planets = deserializeAll("planets");



const resolvers = {
    Query: {
        People: (_, {first, offset = 0}) =>
            first === undefined ?
                people.slice(offset) :
                people.slice(offset, offset + first),
    },
    Person: {
        homeworld(parent) {
            const idx = parseInt(parent.homeworld.split("/")[5]);
            return planets[idx];
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
