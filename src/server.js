const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./router');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

//rutas definidas en router.js
app.use('/', routes);

// SSL
const sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname, '../ssl/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../ssl/cert.pem')),
};

// Servidor HTTPS con SSL
const server = https.createServer(sslOptions, app);

server.listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en https://localhost:${PORT}`);
});
