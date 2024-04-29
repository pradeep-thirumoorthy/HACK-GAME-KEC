import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import socketManager from './socket.js';
import HttpManager from './http.js';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

var PlayerPos = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017/test';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    
    console.error('MongoDB connection error:', error);
  });

const db = mongoose.connection;

app.use(express.static('public'));

HttpManager(app, PlayerPos);

socketManager(io, PlayerPos);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
