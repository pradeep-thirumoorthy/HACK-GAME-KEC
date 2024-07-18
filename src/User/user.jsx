import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Input, Button, Tooltip, Card, Flex } from 'antd';
import { ChromeOutlined } from '@ant-design/icons';

function User() {
  const [selectedColor, setSelectedColor] = useState('red');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const submitToBackend = () => {
    axios
      .post('http://localhost:3000/user', { name, color: selectedColor })
      .then((result) => {
        console.log(result);
        navigate('/login');
      })
      .catch((err) => console.log(err));
  };

  const colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'orange',
    'coral',
    'beige',
    'brown',
    'purple',
    'maroon',
  ];

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={12}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: selectedColor,
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div>
          <h1>Enter Name</h1>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{ marginBottom: '1rem' }}
          />
          <Flex justify={'space-between'}>
          <Button type="primary" onClick={submitToBackend}>
            Submit
          </Button>
          <p>Already a User?<a href='/login'>Login</a></p>
          </Flex>
        </div>
        </Card>
      </Col>
      <Col span={12}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {colors.map((color) => (
            <Tooltip title={color} key={color}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: color,
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  margin: '0.5rem',
                  cursor: 'pointer',
                }}
                onClick={() => handleColorClick(color)}
              />
            </Tooltip>
          ))}
        </div>
      </Col>
    </Row>
  );
}

export default User;