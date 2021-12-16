const app = require('./app');
const http = require('http');

const port = (process.env.NODE_ENV === "test") ? 8000 : (process.env.PORT || '5000');

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`listening on port on ${port} ` + new Date())
})
