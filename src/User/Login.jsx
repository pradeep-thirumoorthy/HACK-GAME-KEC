import { useState } from 'react'
import axios from 'axios'



function User() {
 

  const [selectedColor, setSelectedColor] = useState('red');
  const [name,setName]=useState('');
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const submitToBackend=()=>
  {
    axios.post("http://localhost:3000/user",{name,color:selectedColor})
    .then(result=>
    {
      console.log(result);
    })
    .catch
    (
      err=>console.log(err)
    )
 }

  return (
   <div className='body '>
    
    <div className='row my-5 '>
      <div className='col-6 p-5'>
      <div className='color' style={{ backgroundColor: selectedColor }}>
        
      </div>
      </div>
      <div className='col-6 p-4'>
        <div className='mx-5'>
          <h1>Enter Name</h1>
        </div>
        <div className='mx-5'>
            <input className='w-75' size={20} onChange={(e)=>setName(e.target.value)}></input><br></br><br></br>
            <button  className='' onClick={submitToBackend}> Submit</button>
        </div>
      </div>
    </div>
   </div>
  )
}

export default User;