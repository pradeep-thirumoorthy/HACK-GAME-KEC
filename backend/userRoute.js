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

export default userRoute;