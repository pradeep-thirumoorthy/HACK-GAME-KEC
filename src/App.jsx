import './App.css';
import SnakeGame from './snake';
import App2 from './snake2';
import RealSnake from './Snake/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './User/user';
import Login from './User/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>      
      <Route path='/' element={<SnakeGame/>} />
      {!sessionStorage.getItem('user')?<>
        <Route path='/reg' element={<User />} />
      <Route path='/login' element={<Login />} /></>:<>
      <Route path='/game' element={<SnakeGame/>}/>
      </>}
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
