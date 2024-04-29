import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Connect to the server

const App = () => {
    const [direction, setDirection] = useState(null);
    const [otherDirections, setOtherDirections] = useState([]);
    const [Position,setPosition]=useState();
    useEffect(() => {
        
        
        const handleKeyDown = (event) => {
            const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
            const pressedKey = event.key;

            // Only update the direction state if the pressed key is an arrow key
            if (arrowKeys.includes(pressedKey)) {
                setDirection(pressedKey);
                socket.emit('direction', pressedKey);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Listen for direction events from the server
        socket.on('userConnected', (userid) => {
            setOtherDirections(prevState => [...prevState,{id:`${userid} is Connected`}]);
        });
        socket.on('direction', ({ id, direction }) => {
            setOtherDirections(prevState => [...prevState, { id, direction }]);
        });
        socket.on('userDisconnected', (userid) => {
            setOtherDirections(prevState => prevState.filter(direction => direction.id !== userid));
            
            setOtherDirections(prevState => [...prevState,{id:`${userid} is Disconnected`}]);
        });

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            socket.off('direction');
        };
    }, []);

    return (
        <div>
            <h1>Real-time Game</h1>
            <p>Use arrow keys to move</p>
            <p>Current direction: {direction || 'None'}</p>
            <p>Other players' directions:</p>
            <ul>
                {otherDirections.map(({ id, direction }) => (
                    <li key={id}>{id}: {direction}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
