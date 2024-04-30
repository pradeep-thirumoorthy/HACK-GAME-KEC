import React from 'react';

const SnakePlayground = ({ gameState }) => {
  const renderSnake = (player) => {
    const blockSize = 20; // Size of each block
    const separation = 15; // Separation between blocks

    return player.snake.map((segment, index) => (
      <rect
        key={index}
        x={segment.x * (blockSize + separation)}
        y={segment.y * (blockSize + separation)}
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
      width="100%"
      height="100%"
      viewBox={`0 0 ${(20 + 15) * 40} ${(20 + 15) * 30}`} // Adjust the viewBox dimensions based on your grid size
      style={{ border: '1px solid black' }} // Add border to SVG
    >
      {/* Render food if coordinates are valid */}
      {typeof foodX === 'number' && typeof foodY === 'number' && (
        <circle
          cx={foodX * (20 + 15) + 10}
          cy={foodY * (20 + 15) + 10}
          r={10}
          fill="red"
        />
      )}

      {/* Render snake */}
      {Object.values(gameState.players).map((player) => renderSnake(player))}
    </svg>
  );
};

export default SnakePlayground;
