import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../Login.css';


function Login() {
 
  const [name,setName]=useState('');
  
  const navigate=useNavigate();
  const submitToLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/user/login',
        { name }
      );
      console.log(response.data[0].name);
      sessionStorage.setItem('user',response.data[0].name)
      window.location.pathname='/game';
    } catch (error) {
      console.error(error);
    }
  };

  return (
   <div className='body'>
    <div className='box'>

      <form className=''>
        <div className='my-5'>
          <h1 className='text-warning'>Enter Username</h1>
        </div>
        <div>
        <input className='w-100' size={20} onChange={(e)=>setName(e.target.value)}></input><br></br><br></br>
        </div>
        <div className='text-center my-5'>
        <button className='btn btn-warning'  onClick={submitToLogin}> Submit</button>
        </div>
      </form>

    </div>

   </div>



// <input className='w-75' size={20} onChange={(e)=>setName(e.target.value)}></input><br></br><br></br>
//             <button  className='' onClick={submitToLogin}> Submit</button>
  )
}

export default Login;