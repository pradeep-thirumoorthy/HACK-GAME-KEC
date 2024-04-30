import express from 'express';
import Room from './roomSchema.js';
const roomRoute = express.Router();
roomRoute.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
});
roomRoute.post('/add', async (req, res) => {
    try {
      const { name, code } = req.body;
      const existingRoom = await Room.findOne({ code });
      console.log(existingRoom);
      if (existingRoom) {
        console.log("Already available");
        return res.status(401).json({ message: 'Code already exists' });
      }
     const newRoom = new Room({ name, code, users:[] });
      await newRoom.save();
      res.status(201).json(newRoom);
    } catch (error) {
      console.error('Error saving room:', error);
    }
  });

  roomRoute.post('/check', async (req, res) => {
    try {
        const { name, code } = req.body;
        const existingRoom = await Room.findOne({ code });
        console.log(code,existingRoom);
        if (!existingRoom) {
            return res.status(401).json({ error: 'Room not found' });
        }
        res.status(200).json(existingRoom);
    } catch (error) {
        console.error('Error checking room:', error);
        
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

roomRoute.delete('/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const deletedRoom = await Room.findOneAndDelete({ code });
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(deletedRoom);
  } catch (error) {
    console.error('Error deleting room:', error);
  }
});

export default roomRoute;