import React, {useState} from 'react'
import { API_URL } from '../data/apiPath'

function VendorLogin({welcomeHandler}) {
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")

 const loginHandle = async(e) =>{
  e.preventDefault();
  try {
    const response = await fetch(`${API_URL}/vendor/login`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email, password})
    })
    const data = await response.json();
    if(response.ok){
      alert("Successfully login")
      setEmail(""),
      setPassword("")
      localStorage.setItem('loginToken', data.token)
      welcomeHandler()
    }
    const vendorId = data.vendorId
    console.log("checking", vendorId);
    const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
    const vendorData = await vendorResponse.json()
    
    if(vendorResponse.ok){
      const vendorFirmId = vendorData.vendorFirmId;

      const vendorFirmName = vendorData.vendor.firm[0].firmName
      console.log("mi firmname is", vendorFirmName);

      localStorage.setItem("firmId", vendorFirmId)
      localStorage.setItem("firmName", vendorFirmName)
      window.location.reload()
    }
  } catch (error) {
    alert("failed");
  }

 }


  return (
    <>
    <div className='loginSection'>
    <h3>Vendor Login</h3>
    <form className='authForm' onSubmit={loginHandle}>
        <label>Email:</label><br/>
        <input type='email' name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Enter email'/> <br/>
        <label>Password:</label><br/>
        <input type ="password"  name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password'/><br/><br/>
        <button className='submit-btn' type='submit'>Login</button>
    </form>
    </div>
    </>
  )
}

export default VendorLogin