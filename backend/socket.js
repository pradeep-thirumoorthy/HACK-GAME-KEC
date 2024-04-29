const socketManager=((io,PlayerPos)=>{
    io.on('connection', (socket) => {
        console.log('A user connected');
        
        socket.broadcast.emit('userConnected', socket.id);
        socket.emit('getIntial',PlayerPos);
        
        PlayerPos.push({id:socket.id,direction:'Right'});

        function updateDirectionById(id, newDirection) {
            const index = PlayerPos.findIndex(item => item.id === id);
            if (index !== -1) {
                PlayerPos[index].direction = newDirection;
            }
        }
        function RemoveUser(id) {
            PlayerPos=PlayerPos.filter(Player =>Player.id!==id);
        };
        socket.on('disconnect', () => {
            console.log('User disconnected');
            RemoveUser(socket.id);
            socket.broadcast.emit('userDisconnected', socket.id);
        });
        socket.on('direction', (direction) => {
            socket.broadcast.emit('direction', { id: socket.id, direction });
            updateDirectionById(socket.id,direction);
            console.log('direction', direction);
        });
    });
})
export default socketManager;