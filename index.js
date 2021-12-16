const app = require('./app');
const http = require('http');

const port = process.env.PORT || '5000';

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`listening on port on ${port} ` + new Date())
    // createDB()
    // .then(() => SERVER.start())
    // .then(() => insertInitialData())
})
