import Room from "./roomSchema.js";
const rooms = {};

const socketManager = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', ({ roomId, playerName }) => {
      socket.join(roomId);
      console.log(roomId, playerName);
      
      if (!rooms[roomId]) {
        rooms[roomId] = { players: {}, foods: [] ,HighScore:{playerName:'',score:0}};
      }

      const gameState = rooms[roomId];

      // Function to generate a random position for a player
      

      if (!gameState.players[playerName]) {
        const playerPosition = generateRandomPosition();
        gameState.players[playerName] = { direction: 'up', Score: 0, ...playerPosition }; // or any initial direction

        // If no food item exists yet, generate one
        if (Object.keys(gameState.foods).length === 0) {
          gameState.foods = generateRandomPosition();
        }
      }

      // Emit the initial state to all players in the room
      io.to(roomId).emit('initialState', gameState);
    });


    const generateRandomPosition = () => {
        return {
          x: Math.floor(Math.random() * 20), // Adjust the range as needed
          y: Math.floor(Math.random() * 20), // Adjust the range as needed
        };
      };
    socket.on('move', ({ direction, newX, newY, playerName, roomId }) => {
      const gameState = rooms[roomId]; // Retrieve gameState for the specific room

      // Update the player's position
      if (gameState.players[playerName]) {
        gameState.players[playerName].x = newX;
        gameState.players[playerName].y = newY;

        // Emit the updated game state to all clients in the room
        io.to(roomId).emit('updateGameState', gameState);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });

    socket.on('regenerateFood', ({ playerName, roomId }) => {
      const gameState = rooms[roomId]; // Retrieve gameState for the specific room
      
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
    
        // Check if this is the last player in the room
        if (Object.keys(gameState.players).length === 0) {
          // Delete the room data if there are no players left
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

export default socketManager;
