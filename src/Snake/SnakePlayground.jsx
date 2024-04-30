import React from 'react';

const SnakePlayground = ({ gameState }) => {
    console.log(gameState);
  const renderSnake = (playerName, player) => {
    const blockSize = 20; // Size of each block
    const separation = 15; // Separation between blocks

    const xPos = player.x * (blockSize + separation);
    const yPos = player.y * (blockSize + separation);

    return (
      <rect
        key={playerName}
        x={xPos}
        y={yPos}
        width={blockSize}
        height={blockSize}
        fill="green"
      />
    );
  };

  const foodX = (gameState.foods.x * 20) + (gameState.foods.x * 15);
  const foodY = (gameState.foods.y * 20) + (gameState.foods.y * 15);

  return (
    <svg width="100%" height="100%" viewBox="0 0 2000 1500">
      <circle
        cx={foodX}
        cy={foodY}
        r={10}
        fill="red"
      />
      
      {Object.entries(gameState.players).map(([playerName, player]) =>
        renderSnake(playerName, player)
      )}
    </svg>
  );
};

export default SnakePlayground;
