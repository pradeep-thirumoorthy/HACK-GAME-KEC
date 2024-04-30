// import React, { useState, useEffect } from "react";

// function SnakeGame() {
//     const [numberOfPlayers, setNumberOfPlayers] = useState(); // State to store the number of players

//     // Game variables
//     const [level, setLevel] = useState(1);
//     const [tileSize] = useState(20);
//     const [tileSize1] = useState(22);

//     const [gridSize] = useState(20);
//     const initialSnake = [{ x: 10, y: 10 }];
//     const [snakes, setSnakes] = useState(Array.from({ length: numberOfPlayers }, () => [{ x: 10, y: 10 }]));
//     const [foods, setFoods] = useState(Array.from({ length: numberOfPlayers }, () => ({ x: 5, y: 5 })));
//     const [directions, setDirections] = useState(Array.from({ length: numberOfPlayers }, () => "right"));
//     const [lastDirections, setLastDirections] = useState(Array.from({ length: numberOfPlayers }, () => "right"));

 

//     // Rest of your game logic remains unchanged...
//     // (I'm including only the relevant parts here for brevity)

//     // JSX for rendering
//     return (
//         <div>
//             <label htmlFor="numberOfPlayers">Number of Players:</label>
//             <input
//                 type="number"
//                 id="numberOfPlayers"
//                 name="numberOfPlayers"
//                 value={numberOfPlayers}
//                 onChange={(e)=>setNumberOfPlayers(e.target.value)}
//             />

//             <svg
//                 width={gridSize * tileSize}
//                 height={gridSize * tileSize}
//                 style={{ border: "1px solid black" }}
//             >
//                 {/* Render snakes */}
//                 {snakes.map((snake, snakeIndex) => (
//                     snake.map((segment, index) => (
//                         <rect
//                             key={index}
//                             x={segment.x * tileSize}
//                             y={segment.y * tileSize}
//                             width={tileSize}
//                             height={tileSize}
//                             fill={snakeIndex === 0 ? "green" : "blue"}
//                         />
//                     ))
//                 ))}

//                 {/* Render foods */}
//                 {foods.map((food, foodIndex) => (
//                     <circle
//                         key={foodIndex}
//                         cx={(food.x + 0.5) * tileSize}
//                         cy={(food.y + 0.5) * tileSize}
//                         r={tileSize / 2}
//                         fill={foodIndex === 0 ? "red" : "blue"}
//                     />
//                 ))}
//             </svg>
//         </div>
//     );
// }

// export default SnakeGame;


// import React, { useState, useEffect } from "react";

// function SnakeGame() {
//     // Game variables
//     const [level, setLevel] = useState(1);
//     const [tileSize] = useState(20);
//     const [tileSize1] = useState(22);

//     const [gridSize] = useState(20);
//     const initialSnake = [{ x: 10, y: 10 }];
//     const [snake1, setSnake1] = useState([{ x: 10, y: 10 }]);
//     const [snake2, setSnake2] = useState([{ x: 10, y: 10 }]);
//     const [food1, setFood1] = useState({ x: 5, y: 5 });
//     const [food2, setFood2] = useState({ x: 10, y: 5 });
//     const [direction1, setDirection1] = useState("right");
//     const [direction2, setDirection2] = useState("right");
//     const [lastDirection1, setLastDirection1] = useState("right");
//     const [lastDirection2, setLastDirection2] = useState("right");

//     // Function to move the snake
//     function resetGame(snake, setSnake, setFood, setDirection, setLastDirection) {
//         alert('Game over');
//         setSnake(initialSnake);
//         setFood({ x: 5, y: 5 });
//         setDirection("right");
//         setLastDirection("right");
//     }

//     function moveSnake(snake, setSnake, food, setFood, direction, lastDirection, setLastDirection) {
//         let newX = snake[0].x;
//         let newY = snake[0].y;
//         switch (direction) {
//             case "up":
//                 newY--;
//                 break;
//             case "down":
//                 newY++;
//                 break;
//             case "left":
//                 newX--;
//                 break;
//             case "right":
//                 newX++;
//                 break;
//             default:
//                 break;
//         }

//         // Check if the new position is within the grid
//         if (newX < 0 || newY < 0 || newX >= gridSize || newY >= gridSize) {
//             console.log("Border collision!");
//             setSnake([{ x: 10, y: 10 }]);
//             setFood({ x: 5, y: 5 });
//             return;
//         }

//         // Check if the new position collides with the snake's body (except the head)
//         for (let i = 1; i < snake.length; i++) {
//             if (newX === snake[i].x && newY === snake[i].y) {
//                 console.log("Body collision!");
//                 resetGame(snake, setSnake, setFood, setDirection, setLastDirection);
//                 return;
//             }
//         }

//         // Add the new head to the snake
//         const newSnake = [{ x: newX, y: newY }, ...snake];

//         if (newX !== food.x || newY !== food.y) {
//             newSnake.pop();
//         } else {
//             generateFood(setFood);
//         }

//         setSnake(newSnake);
//         setLastDirection(direction);
//     }

//     // Function to generate new food
//     function generateFood(setFood) {
//         setFood({
//             x: Math.floor(Math.random() * gridSize),
//             y: Math.floor(Math.random() * gridSize)
//         });
//     }

//     useEffect(() => {
//         const frameDelay = 150; // Adjust this value for the desired speed
//         const interval1 = setInterval(() => {
//             moveSnake(snake1, setSnake1, food1, setFood1, direction1, lastDirection1, setLastDirection1);
//         }, frameDelay);
//         const interval2 = setInterval(() => {
//             moveSnake(snake2, setSnake2, food2, setFood2, direction2, lastDirection2, setLastDirection2);
//         }, frameDelay);
//         return () => {
//             clearInterval(interval1);
//             clearInterval(interval2);
//         };
//     }, [snake1, snake2, direction1, direction2]);

//     useEffect(() => {
//         function handleKeyDown(event) {
//             switch (event.key) {
//                 case "ArrowUp":
//                     if (lastDirection1 !== "down") setDirection1("up");
//                     break;
//                 case "ArrowDown":
//                     if (lastDirection1 !== "up") setDirection1("down");
//                     break;
//                 case "ArrowLeft":
//                     if (lastDirection1 !== "right") setDirection1("left");
//                     break;
//                 case "ArrowRight":
//                     if (lastDirection1 !== "left") setDirection1("right");
//                     break;
//                 case "w":
//                     if (lastDirection2 !== "down") setDirection2("up");
//                     break;
//                 case "s":
//                     if (lastDirection2 !== "up") setDirection2("down");
//                     break;
//                 case "a":
//                     if (lastDirection2 !== "right") setDirection2("left");
//                     break;
//                 case "d":
//                     if (lastDirection2 !== "left") setDirection2("right");
//                     break;
//                 default:
//                     break;
//             }
//         }
//         document.addEventListener("keydown", handleKeyDown);
//         return () => {
//             document.removeEventListener("keydown", handleKeyDown);
//         };
//     }, [lastDirection1, lastDirection2]);

//     // JSX for rendering
//     return (
//         <svg
//             width={gridSize * tileSize}
//             height={gridSize * tileSize}
//             style={{ border: "1px solid black" }}
//         >
//             {/* Render snake 1 */}
//             {snake1.map((segment, index) => (
//                 <rect
//                     key={index}
//                     x={segment.x * tileSize}
//                     y={segment.y * tileSize}
//                     width={tileSize}
//                     height={tileSize}
//                     fill="green"
//                 />
//             ))}
            
//             {/* Render snake 2 */}
//             {snake2.map((segment, index) => (
//                 <rect
//                     key={index}
//                     x={segment.x * tileSize1}
//                     y={segment.y * tileSize1}
//                     width={tileSize}
//                     height={tileSize}
//                     fill="green"
//                 />
//             ))}
            
//             {/* Render food 1 */}
//             <circle
//                 cx={(food1.x + 0.5) * tileSize}
//                 cy={(food1.y + 0.5) * tileSize}
//                 r={tileSize / 2}
//                 fill="red"
//             />
            
//             {/* Render food 2 */}
//             <circle
//                 cx={(food2.x + 0.5) * tileSize}
//                 cy={(food2.y + 0.5) * tileSize}
//                 r={tileSize / 2}
//                 fill="blue"
//             />
//         </svg>
//     );
// }

// export default SnakeGame;
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
    // return (
    //     <div>
    //         <label htmlFor="numberOfSnakes">Number of Snakes:</label>
    //         <input
    //             type="number"
    //             id="numberOfSnakes"
    //             name="numberOfSnakes"
    //             value={numberOfSnakes}
    //             onChange={handleInputChange}
    //             min="1"
    //             max="6" // You can adjust the maximum number of snakes as needed
    //         />
    //         <svg
    //             width={gridSize * tileSize}
    //             height={gridSize * tileSize}
    //             style={{ border: "1px solid black" }}
    //         >
    //             {/* Render snakes */}
    //             {snakes.map((snake, index) => (
    //                 snake.snake.map((segment, segmentIndex) => (
    //                     <rect
    //                         key={index * gridSize + segmentIndex}
    //                         x={segment.x * tileSize}
    //                         y={segment.y * tileSize}
    //                         width={tileSize}
    //                         height={tileSize}
    //                         fill="green"
    //                     />
    //                 ))
    //             ))}
                
    //             {/* Render food */}
    //             <circle
    //                 cx={(food.x + 0.5) * tileSize}
    //                 cy={(food.y + 0.5) * tileSize}
    //                 r={tileSize / 2}
    //                 fill="red"
    //             />
    //         </svg>
    //     </div>
    // );
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
