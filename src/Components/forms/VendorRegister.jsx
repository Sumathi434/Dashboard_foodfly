import React, {useState} from 'react'
import { API_URL } from '../data/apiPath'


function VendorRegister({loginHandler}) {
  const[username, setUsername] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[error, setError] = useState("")
  const[loading, setLoading] = useState(true)

  const handleSubmit = async(e)=>{
    e.preventDefault();
 try {
  const response = await fetch(`${API_URL}/vendor/register`,{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({username, email, password})
  })
      const data = await response.json()
      if(response.ok){
        console.log(data)
        setUsername("")
        setEmail("")
        setPassword("")
        alert("Vendor registered successfully")
        loginHandler()
      }
 } catch (error) {
  console.log(error, "failed");
  alert("Registration failed try again")
 }
  }
  return (
    <>
    <div className='registerSection'>
    <h3>Vendor Register</h3>
    <form className='authForm' onSubmit={handleSubmit}>
        <label>Username:</label><br/>
        <input type='text' name="username" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='Enter Username'/><br/>
        <label>Email:</label><br/>
        <input type='email' name="email" value={email}  onChange={(e)=> setEmail(e.target.value)} placeholder='Enter email'/> <br/>
        <label>Password:</label><br/>
        <input type ="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter password'/><br/><br/>
        <button className='submit-btn' type='submit'>SignUp</button>
    </form>
    </div>
    
    
    </>
  )
}

export default VendorRegister