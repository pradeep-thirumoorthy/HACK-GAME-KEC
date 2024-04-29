import express from 'express';
import User from './userSchema.js';
const userRoute = express();
userRoute.post('/', (async (req, res) => {
    console.log("Hi");
    const { name, color } = req.body;
    console.log(name + " " + color);
    try {
        const newUser = await User.create({ name, color }); 
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
}));
userRoute.post('/login', (async (req, res) => {
    const { name } = req.body;
    console.log(name);
    try {
        const newUser = await User.find({ name });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error searching user' });
    }
}));

export default userRoute;