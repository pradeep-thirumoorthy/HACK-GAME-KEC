import './App.css';
import SnakeGame from './snake';
import App2 from './snake2';
import RealSnake from './Snake/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './User/user';

function App() {
  return (
    <BrowserRouter>
    <Routes>      
      <Route path='/' element={<></>} />
      <Route path='/reg' element={<User />} />
      <Route path='/Entry' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
