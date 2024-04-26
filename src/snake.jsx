import React, { useState, useEffect } from "react";

function SnakeGame() {
    // Game variables
    const [tileSize] = useState(20);
    const [gridSize] = useState(20);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState("right");
    const [lastDirection, setLastDirection] = useState("right");

    // Function to move the snake
    function moveSnake() {
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
        }

        // Add the new head to the snake
        const newSnake = [{ x: newX, y: newY }, ...snake];

        // Check for collisions with walls
        if (newX < 0 || newY < 0 || newX >= gridSize || newY >= gridSize) {
            console.log("Game Over!");
            setSnake([{ x: 10, y: 10 }]); // Reset the snake position
            setFood({ x: 5, y: 5 }); // Reset the food position
            return;
        }

        // Remove the tail segment if it's not on food
        if (newX !== food.x || newY !== food.y) {
            newSnake.pop();
        } else {
            generateFood(); // Generate new food if the snake eats it
        }

        // Update the snake
        setSnake(newSnake);

        // Update lastDirection for smooth turns
        setLastDirection(direction);
    }

    // Function to generate new food
    function generateFood() {
        setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        });
    }
    useEffect(() => {
        const frameDelay = 100; // Adjust this value for the desired speed
        const interval = setInterval(() => {
            moveSnake();
        }, frameDelay);
        return () => clearInterval(interval);
    }, [snake, direction]);
    useEffect(() => {
        function handleKeyDown(event) {
            switch (event.key) {
                case "ArrowUp":
                    if (lastDirection !== "down") setDirection("up");
                    break;
                case "ArrowDown":
                    if (lastDirection !== "up") setDirection("down");
                    break;
                case "ArrowLeft":
                    if (lastDirection !== "right") setDirection("left");
                    break;
                case "ArrowRight":
                    if (lastDirection !== "left") setDirection("right");
                    break;
                default:
                    break;
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [lastDirection]);

    // JSX for rendering
    return (
        <svg
            width={gridSize * tileSize}
            height={gridSize * tileSize}
            style={{ border: "1px solid black" }}
        >
            {/* Render snake */}
            {snake.map((segment, index) => (
                <rect
                    key={index}
                    x={segment.x * tileSize}
                    y={segment.y * tileSize}
                    width={tileSize}
                    height={tileSize}
                    fill="green"
                />
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
