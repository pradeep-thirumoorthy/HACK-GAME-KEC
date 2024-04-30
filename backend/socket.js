import Room from "./roomSchema.js";

const rooms = {};

const socketManager = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('joinRoom', ({ roomId, playerName }) => {
            socket.join(roomId);
            console.log(roomId, playerName);

            if (!rooms[roomId]) {
                rooms[roomId] = { players: {}, foods: { x: 5, y: 5 }, HighScore: { playerName: '', score: 0 } };
            }

            const gameState = rooms[roomId];

            if (!gameState.players[playerName]) {
                gameState.players[playerName] = { snake: [{ x: 10, y: 10 }], direction: 'right', Score: 0 };
            }

            io.to(roomId).emit('initialState', gameState);
        });

        socket.on('move', ({ direction, playerName, roomId }) => {
            const gameState = rooms[roomId];

            if (gameState.players[playerName]) {
                const player = gameState.players[playerName];
                let newX = player.snake[0].x;
                let newY = player.snake[0].y;

                switch (direction) {
                    case 'up':
                        newY--;
                        break;
                    case 'down':
                        newY++;
                        break;
                    case 'left':
                        newX--;
                        break;
                    case 'right':
                        newX++;
                        break;
                }

                if (newX < 0 || newY < 0 || newX >= 20 || newY >= 20) {
                    console.log("Game Over!");
                    player.snake = [{ x: 10, y: 10 }];
                    gameState.foods = { x: 5, y: 5 };
                    io.to(roomId).emit('updateGameState', gameState);
                    return;
                }

                player.snake.unshift({ x: newX, y: newY });

                if (newX === gameState.foods.x && newY === gameState.foods.y) {
                    gameState.foods = generateRandomPosition();
                    player.Score += 1;
                } else {
                    player.snake.pop();
                }

                io.to(roomId).emit('updateGameState', gameState);
            }
        });

        socket.on('regenerateFood', ({ playerName, roomId }) => {
            const gameState = rooms[roomId];

            if (gameState.players[playerName]) {
                const player = gameState.players[playerName];

                if (player.snake[0].x === gameState.foods.x && player.snake[0].y === gameState.foods.y) {
                    gameState.foods = generateRandomPosition();
                    player.Score += 1;
                    io.to(roomId).emit('updateGameState', gameState);
                }
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });

        socket.on('LeaveRoom', async ({ playerName, roomId }) => {
            const gameState = rooms[roomId];

            if (gameState && gameState.players[playerName]) {
                delete gameState.players[playerName];
                console.log(`Player ${playerName} left room ${roomId}`);

                try {
                    const room = await Room.findOne({ code: roomId });
                    room.highestScore = {
                        playerName: playerName,
                        score: gameState.players[playerName].Score
                    };
                    await room.save();
                    console.log(`Updated high score (${room.highestScore.score}) for room ${roomId}`);
                } catch (error) {
                    console.error('Error updating high score:', error);
                }

                io.to(roomId).emit('playerLeft', { playerName });

                if (Object.keys(gameState.players).length === 0) {
                    delete rooms[roomId];
                    try {
                        await Room.findOneAndDelete({ code: roomId });
                        console.log(`Room ${roomId} deleted.`);
                    } catch (error) {
                        console.error('Error deleting room:', error);
                    }
                }
            } else {
                console.log(`Player ${playerName} not found in room ${roomId}`);
            }
        });
    });
};

const generateRandomPosition = () => {
    return {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
    };
};

export default socketManager;
