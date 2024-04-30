const rooms = {};

const socketManager = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', ({ roomId, playerName }) => {
      socket.join(roomId);
      console.log(roomId, playerName);
      
      if (!rooms[roomId]) {
        rooms[roomId] = { players: {}, foods: [] };
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
      // Implement any necessary cleanup logic here
    });

    socket.on('regenerateFood', ({ playerName, roomId }) => {
      const gameState = rooms[roomId]; // Retrieve gameState for the specific room

      console.log('Player Name:', playerName.playerName);
      console.log('Current Players:', gameState.players);
      console.log('Player Object:', gameState.players[playerName]);

      if (gameState.players[playerName]) {
        gameState.players[playerName].Score += 1;
        const newFoodPosition = generateRandomPosition();
        gameState.foods = newFoodPosition;
        io.to(roomId).emit('updateGameState', gameState);
      } else {
        console.log('Player not found in gameState:', playerName);
      }
    });
  });
};

export default socketManager;
