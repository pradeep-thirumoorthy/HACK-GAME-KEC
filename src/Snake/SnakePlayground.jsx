import React from 'react';

const blockSize = 10;
const SnakePlayground = ({ gameState }) => {
  const renderSnake = (player) => {

    return player.snake.map((segment, index) => (
      <rect
        key={index}
        x={segment.x * (blockSize )}
        y={segment.y * (blockSize )}
        width={blockSize}
        height={blockSize}
        fill="green"
      />
    ));
  };

  // Check if food coordinates are valid numbers
  const foodX = typeof gameState.foods.x === 'number' ? gameState.foods.x : 0;
  const foodY = typeof gameState.foods.y === 'number' ? gameState.foods.y : 0;

  return (
    <svg
      width="800px"
      height="800px"
      viewBox={`0 0 ${(blockSize) * 40} ${(blockSize) * 40}`} // Adjust the viewBox dimensions based on your grid size
      style={{ border: '1px solid black' }} // Add border to SVG
    >
      {/* Render food if coordinates are valid */}
      {typeof foodX === 'number' && typeof foodY === 'number' && (
        <circle
          cx={foodX * (blockSize ) +5}
          cy={foodY * (blockSize) +5}
          r={blockSize/2}
          fill="red"
        />
      )}

      {/* Render snake */}
      {Object.values(gameState.players).map((player) => renderSnake(player))}
    </svg>
  );
};

export default SnakePlayground;
