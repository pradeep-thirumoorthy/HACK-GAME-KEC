import React from 'react';
import { useState } from 'react';

import './Start.css';
import axios from 'axios';



function Start()
{
    const [code,setCode] =useState('');
    const [createCode, setcreateCode]=useState('');


    const handleCreate = async () => {
        try {
          const response = await axios.post(
            'http://localhost:3000/room/add',
            { code:createCode,name:sessionStorage.getItem('user') }
          );
          console.log(response.data);
          sessionStorage.setItem('room',createCode);
    
          window.location.pathname='/game';
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
    
          window.location.pathname='/room';
        } catch (error) {
          console.error(error);
        }
      };

   return(
<div className='body'>
    <div className='row p-4'>
     <div className=' col col-6 text-center'>
         <div className='m-5'>

            <h1 className='text-warning'>Create Room</h1>
         </div>
         <div className='m-5'>
            <h1 className='text-light'>
                <input type='text' value={createCode} onChange={(e)=>{setcreateCode(e.target.value)}}/>
            </h1>
         </div>
         <div className='m-5'>
            <button className='btn btn-warning' onClick={handleCreate}>Create</button>
         </div>
     </div>
     <div className='col line col-6 text-center'>
     <div className='m-5'>
            <h1 className='text-warning'>Join Room</h1>
         </div>
         <div className='m-5'>
        <input className='input text-light'value={code} onChange={(e)=>{setCode(e.target.value)}}></input>
         </div>
         <div className='m-5'>
            <button className='btn btn-warning' onClick={handleJoin}>Join</button>
         </div>
     </div>
    </div>
</div>
   );
}

export default Start;
