import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import SnakePlayground from './SnakePlayground';

const Snake = () => {
  const [gameState, setGameState] = useState({ players: {}, foods: [] });
  const playerName = sessionStorage.getItem('user');
  const roomId = 'room1';
  const socketRef = useRef(null);
  const keyListenerAdded = useRef(false);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3000'); // Change URL accordingly

      socketRef.current.on('initialState', (initialState) => {
        console.log(initialState);
        setGameState(initialState);
      });

      socketRef.current.on('updateGameState', (updatedState) => {
        console.log(updatedState);
        setGameState(updatedState);
      });

      socketRef.current.emit('joinRoom', { roomId, playerName }); // Change room name and player name as needed
    }

    if (!keyListenerAdded.current) {
      const handleKeyDown = (event) => {
        switch (event.key) {
          case 'ArrowUp':
            handleMove('up');
            break;
          case 'ArrowDown':
            handleMove('down');
            break;
          case 'ArrowLeft':
            handleMove('left');
            break;
          case 'ArrowRight':
            handleMove('right');
            break;
          default:
            break;
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      keyListenerAdded.current = true;

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        keyListenerAdded.current = false;
      };
    }
  }, [playerName, roomId]);

  const handleMove = (direction) => {
    let newX, newY;

    // Calculate the new position based on the direction
    switch (direction) {
      case 'up':
        newX = gameState.players[playerName].x;
        newY = gameState.players[playerName].y - 1;
        break;
      case 'down':
        newX = gameState.players[playerName].x;
        newY = gameState.players[playerName].y + 1;
        break;
      case 'left':
        newX = gameState.players[playerName].x - 1;
        newY = gameState.players[playerName].y;
        break;
      case 'right':
        newX = gameState.players[playerName].x + 1;
        newY = gameState.players[playerName].y;
        break;
      default:
        return;
    }

    // Emit the move request to the server
    socketRef.current.emit('move', { direction, newX, newY, roomId, playerName });
  };

  return (
    <div>
      {/* Render your game UI using gameState */}
      {/* For example: */}
      <div>
        <h2>Players:</h2>
        <ul>
          {Object.entries(gameState.players).map(([playerName, player], index) => (
            <li key={index}> {playerName}: {player.direction}</li>
          ))}
        </ul>

        <h2>Foods:</h2>
        <ul>
          <p>Food coordinates: x={gameState.foods.x}, y={gameState.foods.y}</p>
        </ul>
      </div>
      {/* Include controls to handle player movement */}
      <div>
        <button onClick={() => handleMove('up')}>Move Up</button>
        <button onClick={() => handleMove('down')}>Move Down</button>
        <button onClick={() => handleMove('left')}>Move Left</button>
        <button onClick={() => handleMove('right')}>Move Right</button>
        <SnakePlayground gameState={gameState} />
      </div>
    </div>
  );
};

export default Snake;