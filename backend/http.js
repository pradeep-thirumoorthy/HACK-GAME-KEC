import roomRoute from "./roomRoute.js";
import userRoute from "./userRoute.js";
import cors from 'cors';
const HttpManager = ((app,io)=>{

// Handle HTTP requests
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.post('/triggerFoodCollision', (req, res) => {
  const playerName = req.body.playerName;
  console.log(playerName);
  io.emit('FoodGenerate', playerName);
  res.sendStatus(200);
});
app.use('/user', userRoute);
  app.use('/room', roomRoute);
})
export default HttpManager;