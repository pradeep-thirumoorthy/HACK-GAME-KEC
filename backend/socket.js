const socketManager=((io)=>{
    io.on('connection', (socket) => {
        console.log('A user connected');
        

        socket.broadcast.emit('userConnected', socket.id);
        //In Server Side::::


        // socket.on('action trigger',(variable_from_client)=>{
        //    process the data based on your need of the action;
        // });


        socket.on('direction', (direction) => {
            socket.broadcast.emit('direction', { id: socket.id, direction });
            console.log('direction', direction);
        });
    


        


        socket.on('disconnect', () => {
            console.log('User disconnected');
            socket.broadcast.emit('userDisconnected', socket.id);
        });
    });
})
export default socketManager;