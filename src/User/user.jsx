import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



function User() {
 

  const [selectedColor, setSelectedColor] = useState('red');
  const [name,setName]=useState('');
  const navigate=useNavigate();
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const submitToBackend=()=>
  {
    axios.post("http://localhost:3000/user",{name,color:selectedColor})
    .then(result=>
    {
      console.log(result);
      navigate('/login');
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
    <div className='color_choose px-5'>
      <div className='red' onClick={() => handleColorClick('red')}>

      </div>
      <div className='blue' onClick={() => handleColorClick('blue')}>
        
      </div>
      <div className='green' onClick={() => handleColorClick('green')}>
        
      </div>
      <div className='yellow' onClick={() => handleColorClick('yellow')}>
        
      </div>
      <div className='orange' onClick={() => handleColorClick('orange')}>
        
      </div>
     </div>
     <div className='color_choose px-5'>
      <div className='coral'  onClick={() => handleColorClick('coral')}>
        
      </div>
      <div className='beige'  onClick={() => handleColorClick('beige')}>
        
      </div>
      <div className='brown'  onClick={() => handleColorClick('brown')}>
        
      </div>
      <div className='purple'  onClick={() => handleColorClick('purple')}>
        
      </div>
      <div className='maroon'  onClick={() => handleColorClick('maroon')}> 
        
        </div>
        
        </div>
    
   </div>
  )
}

export default User;