import React from 'react'

function Navbar({loginHandler, signupHandler, showLogOut, logOutHandler}) {

 const firmName = localStorage.getItem('firmName');

  return (
    <>
    <div className='navbar'>

<div className='nav-container'>
    <div className='logo'>
      <h3>Foodfly</h3>
    </div>
     <div className='firmName'>
      <h2>FirmName: {firmName}</h2>
     </div>
   <div className='buttons'>
   {!showLogOut ? <>
   <button onClick = {signupHandler} className='signup'>SignUp</button>
   <button onClick = {loginHandler} className='login'>Login</button>
   </> :  <button onClick={logOutHandler} className='logout'>Logout</button>}

  
   </div>


</div>

    </div>
    
    </>
  )
}

export default Navbar