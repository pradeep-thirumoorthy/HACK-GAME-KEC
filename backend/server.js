import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser'; // Import body-parser
import socketManager from './socket.js';
import HttpManager from './http.js';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your client's origin
    methods: ["GET", "POST"]
  }
});

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));

HttpManager(app);

// Socket.IO connections
socketManager(io);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
