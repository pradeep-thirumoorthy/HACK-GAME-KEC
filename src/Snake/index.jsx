import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import SnakePlayground from './SnakePlayground';

const Snake = () => {
  const [gameState, setGameState] = useState({ players: {}, foods: { x: 0, y: 0 } });
  const playerName = sessionStorage.getItem('user');
  const roomId = sessionStorage.getItem('room'); // Corrected to 'getItem'
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

      socketRef.current.emit('joinRoom', { roomId, playerName });
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
    const player = gameState.players[playerName];
    if (!player) return; // Player not found

    const head = player.snake[0];
    let newX = head.x;
    let newY = head.y;

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
      default:
        return;
    }

    socketRef.current.emit('move', { direction, newX, newY, roomId, playerName });
  };

  const addPoints = () => {
    socketRef.current.emit('regenerateFood', { playerName, roomId });
  };

  const handleLeaveRoom = () => {
    socketRef.current.emit('LeaveRoom', { playerName, roomId });
    sessionStorage.removeItem('room');
    window.location.pathname = '/room';
  };

  return (
    <div>
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
        <button onClick={handleLeaveRoom}>Leave Room</button>
        <SnakePlayground gameState={gameState} addPoints={addPoints} />
      </div>
    </div>
  );
};

export default Snake;
