import { useState } from 'react'
import axios from 'axios'
import { Button, Card, Col, Flex, Input, Row } from 'antd';



function Login() {
 
  const [name,setName]=useState('');
  const submitToLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/user/login',
        { name }
      );
      console.log(response.data[0].name);
      sessionStorage.setItem('user',response.data[0].name)
      window.location.pathname='/room';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
    <Col span={12}>
    <Card>
      <div>
        <h1>Enter Name</h1>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{ marginBottom: '1rem' }}
        />
        <Flex justify={'space-between'}>
        <Button type="primary" onClick={submitToLogin}>
          Submit
        </Button>
        <div>New User?<a href='/signup'>SignUp</a></div>
        </Flex>
      </div>
      </Card>
    </Col>
  </Row>
  )
}

export default Login;