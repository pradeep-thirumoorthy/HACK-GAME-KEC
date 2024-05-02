import React, { useState, useEffect } from 'react';

const Movement = ({ handleMove }) => {
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Get the current direction
      const currentDirection = direction;
  
      switch (event.key) {
        case 'ArrowUp':
          // Prevent moving down if currently moving up
          if (currentDirection !== 'down') {
            setDirection('up');
          }
          break;
        case 'ArrowDown':
          // Prevent moving up if currently moving down
          if (currentDirection !== 'up') {
            setDirection('down');
          }
          break;
        case 'ArrowLeft':
          // Prevent moving right if currently moving left
          if (currentDirection !== 'right') {
            setDirection('left');
          }
          break;
        case 'ArrowRight':
          // Prevent moving left if currently moving right
          if (currentDirection !== 'left') {
            setDirection('right');
          }
          break;
        default:
          break;
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction]);
  

  useEffect(() => {
    if (direction) {
      handleMove(direction);
    }
  }, [direction, handleMove]);

  return null; // Since this component doesn't render anything visible, return null
};

export default Movement;
