import React from 'react';
import { useState } from 'react';

import './Start.css';
import axios from 'axios';
import { Card, Input, Button } from 'antd';

const { Meta } = Card;


function Start()
{
    const [code,setCode] =useState('');
    const [createCode, setCreateCode]=useState('');

    const handleCreate = async () => {
        try {
          const response = await axios.post(
            'http://localhost:3000/room/add',
            { code:createCode,name:sessionStorage.getItem('user') }
          );
          console.log(response.data);
          sessionStorage.setItem('room',createCode);
    
          window.location.pathname='/room';
        } catch (error) {
          console.error(error);
        }
      };
      const handleJoin = async () => {
        try {
          const response = await axios.post(
            'http://localhost:3000/room/check',
            { code:code,name:sessionStorage.getItem('user') }
          );
          console.log(response.data);
          sessionStorage.setItem('room',code);
    
          window.location.pathname='/game';
        } catch (error) {
          console.error(error);
        }
      };

   return(
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' ,backgroundColor:'#4C4E52'}}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ marginRight: '20px' }}>
          <Card title={<h1 style={{ color: '#faad14', margin: 0 }}>Create Room</h1>} bordered={false} style={{ width: 300 }}>
            <Input value={createCode} onChange={(e) => setCreateCode(e.target.value)} placeholder="Enter room code" />
            <Button type="primary" style={{ marginTop: '10px' }} onClick={handleCreate}>Create</Button>
          </Card>
        </div>
        <div>
          <Card title={<h1 style={{ color: '#faad14', margin: 0 }}>Join Room</h1>} bordered={false} style={{ width: 300 }}>
            <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter room code" />
            <Button type="primary" style={{ marginTop: '10px' }} onClick={handleJoin}>Join</Button>
          </Card>
        </div>
      </div>
    </div>
   );
}

export default Start;
