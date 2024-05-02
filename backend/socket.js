import Room from "./roomSchema.js";

const rooms = {};
let intervalIds={};

const socketManager = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('joinRoom', async ({ roomId, playerName }) => {
            socket.join(roomId);
            console.log(roomId, playerName);
            if(roomId ==null ||playerName ==null){
                console.log('Not an Authorized User');
                return;
            }
            if (!rooms[roomId] ) {
                
                const room = await Room.findOne({ code: roomId });
                console.log(room);
                const highScore = room ? {playerName:room.highestScore.playerName,score:room.highestScore.score} : { playerName: '', score: 0 };

                rooms[roomId] = { players: {}, foods: generateRandomPosition(), HighScore: highScore };
            }

            const gameState = rooms[roomId];

            if (!gameState.players[playerName]) {
                gameState.players[playerName] = { snake: [generateRandomPosition()], direction: 'right', Score: 0 };
                io.to(roomId).emit('message',`${playerName} is joined the Room`);
            }

            io.to(roomId).emit('initialState', gameState);
            if (!intervalIds[roomId]) { // Check if interval already started for this room
                startInterval(roomId); // Start interval only if not already started
            }
        });

        const updateSnakeMovement = (direction, playerName, roomId) => {
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
                
                // Adjust maxX and maxY for border
                const maxX = 40; // Subtract blockSize for border
                const maxY = 40; // Subtract blockSize for border
        
                if (newX < 0 || newY < 0 || newX >= maxX || newY >= maxY) {
                    player.snake = [generateRandomPosition()];
                    player.Score=0;
                    io.to(roomId).emit('updateGameState', gameState);
                    return player;
                }
                
                player.snake.unshift({ x: newX, y: newY });
                
                if (newX === gameState.foods.x && newY === gameState.foods.y) {
                    gameState.foods = generateRandomPosition();
                    player.Score += 1;
                    if(player.Score>gameState.HighScore.score){
                        gameState.HighScore={playerName,score:player.Score};
                    }
                } else {
                    player.snake.pop();
                }
                
                io.to(roomId).emit('updateGameState', gameState);
                return player;
            }
            return null;
        };
        const startInterval = (roomId) => {
            intervalIds[roomId] = setInterval(() => updateSnakeMovements(roomId), 200);
        };

        const stopInterval = (roomId) => {
            clearInterval(intervalIds[roomId]);
        };

        socket.on('move', ({ direction, playerName, roomId }) => {
            stopInterval(roomId);
            rooms[roomId].players[playerName].direction = direction;
            startInterval(roomId);
        })
        const updateSnakeMovements = () => {
            for (const roomId in rooms) {
                const gameState = rooms[roomId];
                for (const playerName in gameState.players) {
                    const player = gameState.players[playerName];
                    const direction = player.direction;
                    updateSnakeMovement(direction, playerName, roomId);
                }
            }
        };
        
        


        socket.on('regenerateFood', ({ playerName, roomId }) => {
            const gameState = rooms[roomId];
            console.log('Player Name:', playerName);
            console.log('Current Players:', gameState.players);
            console.log('Player Object:', gameState.players[playerName]);
          
            if (gameState.players[playerName]) {
              gameState.players[playerName].Score += 1;
          
              // Update high score if necessary
              if (!gameState.HighScore || gameState.HighScore.score < gameState.players[playerName].Score) {
                gameState.HighScore = {
                  playerName: playerName,
                  score: gameState.players[playerName].Score,
                };
              }
          
              const newFoodPosition = generateRandomPosition();
              gameState.foods = newFoodPosition;
              io.to(roomId).emit('updateGameState', gameState);
            } else {
              console.log('Player not found in gameState:', playerName);
            }
          });
        
        
        socket.on('disconnect', () => {
            stopInterval();
            console.log('A user disconnected');
        });

        socket.on('LeaveRoom', async ({ playerName, roomId }) => {
            const gameState = rooms[roomId];
            
            const room = await Room.findOne({ code: roomId });
            if (gameState && gameState.players[playerName] ) {
                if(gameState.HighScore.score > room.highestScore.score){
                try {
                    room.highestScore = {
                        playerName: gameState.HighScore.playerName,
                        score: gameState.HighScore.score
                    };
                    await room.save();
                    
                    console.log(`Updated high score (${room.highestScore.score}) for room ${roomId}`);
                } catch (error) {
                    console.error('Error updating high score:', error);
                }
            }
        
                delete gameState.players[playerName];
                delete rooms[roomId].players[playerName];
                io.to(roomId).emit('playerLeft', { playerName });
                io.to(roomId).emit('message',`${playerName} is left the Room`);
                if (Object.keys(gameState.players).length === 0) {
                    delete rooms[roomId];
                    stopInterval(roomId); // Stop interval when the last player leaves
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
