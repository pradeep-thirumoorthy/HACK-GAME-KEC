import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import SnakePlayground from './SnakePlayground';
import Movement from './Movement';
import { Button, Descriptions, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';

const Snake = () => {
  const [gameState, setGameState] = useState({ players: {}, foods: { x: 0, y: 0 } });
  const playerName = sessionStorage.getItem('user');
  const roomId = sessionStorage.getItem('room'); // Corrected to 'getItem'
  const socketRef = useRef(null);
  const keyListenerAdded = useRef(false);
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3000'); // Change URL accordingly
      socketRef.current.on('initialState', (initialState) => {
        console.log(initialState);
        setGameState(initialState);
      });
      socketRef.current.on('updateGameState', (updatedState) => {
        console.log(updatedState);
        setGameState(updatedState);
      });
      socketRef.current.on('message', (updatedState) => {
        console.log(updatedState);
      });

      socketRef.current.emit('joinRoom', { roomId, playerName });
    }

    if (!keyListenerAdded.current) {
      const handleKeyDown = (event) => {
        switch (event.key) {
          case 'ArrowUp':
            handleMove('up');
            break;
          case 'ArrowDown':
            handleMove('down');
            break;
          case 'ArrowLeft':
            handleMove('left');
            break;
          case 'ArrowRight':
            handleMove('right');
            break;
          default:
            break;
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      keyListenerAdded.current = true;
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        keyListenerAdded.current = false;
      };
    }
  }, [playerName, roomId]);

  const handleMove = (direction) => {
    socketRef.current.emit('move', { direction, roomId, playerName });
  };

  const addPoints = () => {
    console.log('addPoints')
    socketRef.current.emit('regenerateFood', { playerName, roomId });
  };

  const handleLeaveRoom = () => {
    socketRef.current.emit('LeaveRoom', { playerName, roomId });
    sessionStorage.removeItem('room');
    window.location.pathname = '/room';
  };

  return (
    <Layout style={{ minHeight: '95vh',overflow:'hidden' }}>
      <Sider theme="light" breakpoint='lg'>
      <div>
        <br/>
        <Title level={3}>High Score
        <Descriptions bordered>
        <Descriptions.Item key={-1} label={!(gameState.HighScore)?'':gameState.HighScore.playerName}>
        {JSON.stringify(!(gameState.HighScore)?0:gameState.HighScore.score)}</Descriptions.Item>
        </Descriptions>
        </Title>
      <Descriptions bordered title="Players" column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }} >
        {Object.entries(gameState.players).map(([playerName, player], index) => (
          <Descriptions.Item key={index} label={playerName}>
            {player.Score.toString()}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </div>
        <Button onClick={handleLeaveRoom} style={{ margin: '20px' }}>Leave Room</Button>
      </Sider>
      <Layout>
        <Content style={{ padding: '24px'}}>
          <Movement handleMove={handleMove}/>
          <SnakePlayground gameState={gameState} addPoints={addPoints} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Snake;
