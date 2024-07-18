import React from 'react';
import { Card, Input, Button } from 'antd';


function Home() {
    const Signup = async () => {
        window.location.pathname='/signup';
    };const Login = async () => {
        window.location.pathname='/login';
    };
  return (
    <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' ,backgroundColor:'#4C4E52'}}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ marginRight: '20px' }}>
          <Card title={<h1 style={{ color: '#faad14', margin: 0 }}>Login</h1>} bordered={false} style={{ width: 300 }}>
            <Button type="primary" style={{ marginTop: '10px' }} onClick={Login}>Login</Button>
          </Card>
        </div>
        <div>
          <Card title={<h1 style={{ color: '#faad14', margin: 0 }}>Signup</h1>} bordered={false} style={{ width: 300 }}>
            <Button type="primary" style={{ marginTop: '10px' }} onClick={Signup}>Signup</Button>
          </Card>
        </div>
      </div>
    </div>

    </>
  )
}

export default Home;