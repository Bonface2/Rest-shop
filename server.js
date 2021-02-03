const http = require('http') //imports http
const app = require('./app');

const port = process.env.PORT || 3000; //assign default port
const server = http.createServer(app); //create server and assign listener (Executed when there is a new request and returns the response)
server.listen(port); 