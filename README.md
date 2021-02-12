# Skillsoft Full Stack Technical Exercise

### Required dependencies
Node, yarn

### Instructions
1. Be sure local port 3000 and 4000 are free.
2. ```yarn install```
3. Launch the Apollo backend server ```node src/server.js```
4. Launch the frontend server in development mode```yarn start```

### Approach
I chose Apollo to be the backend server and Material UI for front end components.

The Apollo server fetches all People and Planet resources from swapi.dev, and stores it in memory.
Custom resolvers are made to provide API for pagination and connect People and Planet objects.
The material UI library provided all the tools I needed to prototype the front end quickly.
The grid system supports responsive design without the need to write CSS.