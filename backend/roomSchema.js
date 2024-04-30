import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique:true,
    required: true,
  },
  highestScore: Number,
});

const Room = mongoose.model("Room", roomSchema);

export default Room;