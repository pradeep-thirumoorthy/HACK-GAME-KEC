import { useState } from 'react'
import axios from 'axios'



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
      window.location.pathname='/game';
    } catch (error) {
      console.error(error);
    }
  };

  return (
   <div className='body '>
    
    <div className='row my-5 '>
      <div className='col-6 p-5'>
      </div>
      <div className='col-6 p-4'>
        <div className='mx-5'>
          <h1>Enter Name</h1>
        </div>
        <div className='mx-5'>
            <input className='w-75' size={20} onChange={(e)=>setName(e.target.value)}></input><br></br><br></br>
            <button  className='' onClick={submitToLogin}> Submit</button>
        </div>
      </div>
    </div>
   </div>
  )
}

export default Login;