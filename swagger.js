const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  // host: 'localhost:8080',
  host: 'cse341-w05-w08.herokuapp.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger-output.json';
//const endpointsFiles = ['./routes/contacts.js', './routes/index.js'];
const endpointsFiles = ['./routes/toDo.js', './routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
