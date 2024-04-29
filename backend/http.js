import roomRoute from "./roomRoute.js";
import userRoute from "./userRoute.js";
import cors from 'cors';
const HttpManager = ((app,PlayerPos)=>{

// Handle HTTP requests
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use('/user', userRoute);
  app.use('/room', roomRoute);
})
export default HttpManager;