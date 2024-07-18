import './App.css';
import App2 from './snake2';

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import User from './User/user';
import Login from './User/Login';
import Start from './Room/Room';
import GameInterface from './Playground/main';
import Home from './User/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      {!sessionStorage.getItem('user')?<>
        <Route path='/signup' element={<User />} />
      <Route path='/login' element={<Login />} /></>:
      !sessionStorage.getItem('room')? 
      <>
      <Route path='/room' element={<Start />} />
      
      </>:<>
      <Route path='/game' element={<GameInterface/>}/></>}
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
