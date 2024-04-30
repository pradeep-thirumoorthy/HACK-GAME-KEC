const gameState = {
    players: {},
    foods: []
  };
  
  const socketManager = (io) => {
    io.on('connection', (socket) => {
      console.log('A user connected');
  
      socket.on('joinRoom', ({ roomId, playerName }) => {
        socket.join(roomId);
        console.log(roomId, playerName);
  
        // Function to generate a random position for a player
        const generateRandomPosition = () => {
          return {
            x: Math.floor(Math.random() * 20), // Adjust the range as needed
            y: Math.floor(Math.random() * 20) // Adjust the range as needed
          };
        };
  
        // Add the player to the game state with the initial direction and position
        if (!gameState.players[playerName]) {
          const playerPosition = generateRandomPosition();
          gameState.players[playerName] = { direction: 'up', ...playerPosition }; // or any initial direction
  
          // If no food item exists yet, generate one
          if (Object.keys(gameState.foods).length === 0) {
            gameState.foods = generateRandomPosition();
          }
  
          // Emit the initial state to all players in the room
          io.to(roomId).emit('initialState', gameState);
        }
      });
  
      socket.on('move', ({ direction, newX, newY, playerName, roomId }) => {
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
  
    });
  };
  
  export default socketManager;