import React from 'react';

const SnakePlayground = ({ gameState, addPoints }) => {
  // Function to render each snake
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

  // Function to handle collision between snake and food
  const handleFoodCollision = (playerName, player) => {
    if (player.x === gameState.foods.x && player.y === gameState.foods.y) {
      console.log("Points Added")
      addPoints({ playerName });
    }
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

      {/* Render snakes */}
      {Object.entries(gameState.players).map(([playerName, player]) => {
        // Check for collision with food
        handleFoodCollision(playerName, player);
        return renderSnake(playerName, player);
      })}
    </svg>
  );
};

export default SnakePlayground;
