import React, { useState, useEffect } from "react";

function SnakeGame() {
    // Game variables
    const [tileSize] = useState(35);
    const [gridSize] = useState(35);
    const [numberOfSnakes, setNumberOfSnakes] = useState(3); 
    // const initialSnakes = [
    //     [{ x: 5, y: 5 }],
    //     [{ x: 15, y: 5 }],
    //     [{ x: 5, y: 15 }],
    //     [{ x: 15, y: 15 }]
    // ];/
    const initialSnakes = Array.from({ length: numberOfSnakes }, (_, index) => [{ x: 5 + index * 5, y: 5 }]);
    const [snakes, setSnakes] = useState(initialSnakes.map(snake => ({ snake, direction: "right", lastDirection: "right" })));
    const [food, setFood] = useState({ x: 10, y: 10 });

    // Function to move a snake
    function moveSnake(index) {
        setSnakes(prevSnakes => {
            let newSnakes = [...prevSnakes];
            let snake = newSnakes[index].snake;
            let direction = newSnakes[index].direction;
            let lastDirection = newSnakes[index].lastDirection;

            let newX = snake[0].x;
            let newY = snake[0].y;
            switch (direction) {
                case "up":
                    newY--;
                    break;
                case "down":
                    newY++;
                    break;
                case "left":
                    newX--;
                    break;
                case "right":
                    newX++;
                    break;
                default:
                    break;
            }

            // Check if the new position is within the grid
            if (newX < 0 || newY < 0 || newX >= gridSize || newY >= gridSize) {
                console.log("Border collision!");
                resetGame(index);
                return newSnakes;
            }

            // Check if the new position collides with the snake's body (except the head)
            for (let i = 1; i < snake.length; i++) {
                if (newX === snake[i].x && newY === snake[i].y) {
                    console.log("Body collision!");
                    resetGame(index);
                    return newSnakes;
                }
            }

            // Add the new head to the snake
            const newSnake = [{ x: newX, y: newY }, ...snake];

            if (newX !== food.x || newY !== food.y) {
                newSnake.pop();
            } else {
                generateFood();
            }

            snake = newSnake;
            newSnakes[index] = { snake, direction, lastDirection };
            return newSnakes;
        });
    }

    // Function to reset a snake's position
    function resetGame(index) {
        alert('Snake ' + (index + 1) + ' Game over');
        setSnakes(prevSnakes => {
            let newSnakes = [...prevSnakes];
            newSnakes[index].snake = initialSnakes[index];
            return newSnakes;
        });
        generateFood();
    }

    // Function to generate new food
    function generateFood() {
        setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        });
    }

    useEffect(() => {
        const frameDelay = 150; // Adjust this value for the desired speed
        const interval = setInterval(() => {
            for (let i = 0; i < snakes.length; i++) {
                moveSnake(i);
            }
        }, frameDelay);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        function handleKeyDown(event) {
            for (let i = 0; i < snakes.length; i++) {
                let lastDirection = snakes[i].lastDirection;
                let direction = snakes[i].direction;
                switch (event.key) {
                    case "ArrowUp":
                        if (lastDirection !== "down") direction = "up";
                        break;
                    case "ArrowDown":
                        if (lastDirection !== "up") direction = "down";
                        break;
                    case "ArrowLeft":
                        if (lastDirection !== "right") direction = "left";
                        break;
                    case "ArrowRight":
                        if (lastDirection !== "left") direction = "right";
                        break;
                    default:
                        break;
                }
                setSnakes(prevSnakes => {
                    let newSnakes = [...prevSnakes];
                    newSnakes[i].direction = direction;
                    return newSnakes;
                });
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [snakes]);

    // JSX for rendering
    return (
        <svg
            width={gridSize * tileSize}
            height={gridSize * tileSize}
            style={{ border: "1px solid black" }}
        >
            {/* Render snakes */}
            {snakes.map((snake, index) => (
                snake.snake.map((segment, segmentIndex) => (
                    <rect
                        key={index * gridSize + segmentIndex}
                        x={segment.x * tileSize}
                        y={segment.y * tileSize}
                        width={tileSize}
                        height={tileSize}
                        fill="green"
                    />
                ))
            ))}
            
            {/* Render food */}
            <circle
                cx={(food.x + 0.5) * tileSize}
                cy={(food.y + 0.5) * tileSize}
                r={tileSize / 2}
                fill="red"
            />
        </svg>
    );
}

export default SnakeGame;