// const socketManager=((io,PlayerPos)=>{
//     io.on('connection', (socket) => {
//         console.log('A user connected');
        

//         socket.broadcast.emit('userConnected', socket.id);
//         //In Server Side::::


//         // socket.on('action trigger',(variable_from_client)=>{
//         //    process the data based on your need of the action;
//         // });


//         socket.on('direction', (direction) => {
//             socket.broadcast.emit('direction', { id: socket.id, direction });
//             console.log('direction', direction);
//         });
    




//         socket.on('disconnect', () => {
//             console.log('User disconnected');
//             socket.broadcast.emit('userDisconnected', socket.id);
//         });
//     });
// })
// export default socketManager;
const socketManager = (io, PlayerPos) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Joining a default room when a user connects
        socket.join('defaultRoom');
        console.log('User joined defaultRoom');

        // Emitting room details to the client when a user connects
        io.to('defaultRoom').emit('roomDetails', {
            roomName: 'defaultRoom',
            users: Object.keys(io.sockets.adapter.rooms['defaultRoom'].sockets)
        });

        // Broadcasting to all clients in the default room that a user connected
        socket.broadcast.to('defaultRoom').emit('userConnected', socket.id);

        // Broadcasting direction to all clients in the room
        socket.on('direction', (direction) => {
            socket.broadcast.to('defaultRoom').emit('direction', { id: socket.id, direction });
            console.log('direction', direction);
        });

        // Handling disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected');
            socket.broadcast.to('defaultRoom').emit('userDisconnected', socket.id);
            // Leaving the default room when a user disconnects
            socket.leave('defaultRoom');
            console.log('User left defaultRoom');
        });
    });
};

export default socketManager;

