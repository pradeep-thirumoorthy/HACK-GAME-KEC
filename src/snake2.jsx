import React, { useState, useEffect } from 'react';

const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;

const Snake = ({ segments }) => {
  return (
    <>
      {segments.map((segment, index) => (
        <div
          key={index}
          style={{
            gridColumnStart: segment[0] + 1,
            gridRowStart: segment[1] + 1,
            backgroundColor: 'green',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
          }}
        ></div>
      ))}
    </>
  );
};

const Food = ({ position }) => {
  return (
    <div
      style={{
        gridColumnStart: position[0] + 1,
        gridRowStart: position[1] + 1,
        backgroundColor: 'red',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
      }}
    ></div>
  );
};

const GameBoard = () => {
  const [snake, setSnake] = useState([[10, 10], [10, 11], [10, 12]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState('right');
  const [score, setScore] = useState(0);

  const isSnakeBody = (x, y) => {
    return snake.some(segment => segment[0] === x && segment[1] === y);
  };

  const generateFood = () => {
    let foodX, foodY;
    do {
      foodX = Math.floor(Math.random() * GRID_WIDTH);
      foodY = Math.floor(Math.random() * GRID_HEIGHT);
    } while (isSnakeBody(foodX, foodY));

    setFood([foodX, foodY]);
  };

  const moveSnake = () => {
    const newHead = calculateNewHead();

    if (isSnakeBody(newHead[0], newHead[1])) {
      const collisionIndex = snake.findIndex(
        segment => segment[0] === newHead[0] && segment[1] === newHead[1]
      );
      setSnake(snake.slice(0, collisionIndex));
      setScore(score => score - collisionIndex);
    } else {
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setSnake([newHead, ...snake]);
        setScore(score => score + 1);
        generateFood();
      } else {
        setSnake([newHead, ...snake.slice(0, -1)]);
      }
    }
  };

  const calculateNewHead = () => {
    const [headX, headY] = snake[0];
    let newHeadX = headX,
      newHeadY = headY;

    switch (direction) {
      case 'up':
        newHeadY = (headY - 1 + GRID_HEIGHT) % GRID_HEIGHT;
        break;
      case 'down':
        newHeadY = (headY + 1) % GRID_HEIGHT;
        break;
      case 'left':
        newHeadX = (headX - 1 + GRID_WIDTH) % GRID_WIDTH;
        break;
      case 'right':
        newHeadX = (headX + 1) % GRID_WIDTH;
        break;
      default:
        break;
    }

    return [newHeadX, newHeadY];
  };

  useEffect(() => {
    const gameInterval = setInterval(() => {
      moveSnake();
    }, 100);

    return () => clearInterval(gameInterval);
  }, [snake]);

  useEffect(() => {
    const handleKeyPress = e => {
      switch (e.code) {
        case 'ArrowUp':
          if (direction !== 'down') setDirection('up');
          break;
        case 'ArrowDown':
          if (direction !== 'up') setDirection('down');
          break;
        case 'ArrowLeft':
          if (direction !== 'right') setDirection('left');
          break;
        case 'ArrowRight':
          if (direction !== 'left') setDirection('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_WIDTH}, 20px)`,
        gridTemplateRows: `repeat(${GRID_HEIGHT}, 20px)`,
        gap: '1px',
        backgroundColor: 'black',
        padding: '20px',
      }}
    >
      <Snake segments={snake} />
      <Food position={food} />
      <div
        style={{
          gridColumnStart: 1,
          gridRowStart: GRID_HEIGHT + 1,
          gridColumnEnd: GRID_WIDTH + 1,
          color: 'white',
        }}
      >
        Score: {score}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>React Snake Game</h1>
      <GameBoard />
    </div>
  );
};

export default App;
