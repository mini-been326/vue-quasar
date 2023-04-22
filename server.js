const config = require('./config')[process.env.NODE_ENV];
const express = require('express');
const http = require('http');

const app = express();
const port = config.PORT;
const router = express.Router();
const cors = require('cors');

let corsOptions = {
  origin: '*',
  Credential: true,
};

app.use(cors(corsOptions));

//const todoRouter = require('./api/todo')
//app.use('/api',router);

//autoRouter
const autoRouter = require('./autoRouter');
autoRoute('/api', app);

const webServer = http.createServer(app);
webServer.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
