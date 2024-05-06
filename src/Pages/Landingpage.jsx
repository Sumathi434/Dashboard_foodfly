import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import VendorLogin from '../Components/forms/VendorLogin'
import VendorRegister from '../Components/forms/VendorRegister'
import Addfirm from '../Components/forms/Addfirm'
import Addproducts from '../Components/forms/Addproducts'
import Allproducts from '../Components/forms/Allproducts'
import WelcomePage from '../Components/forms/WelcomePage'

function Landingpage() {
  const[showLogin, setShowLogin] = useState(false)
  const[showSignup, setShowSignup] = useState(false)
  const[showaddfirm, setShowaddfirm] = useState(false)
  const[showAddproduct, setShowAddproduct] = useState(false)
  const[showAllproducts, setShowAllproducts] = useState(false)
  const[showLogOut, setShowLogOut] = useState(false)
  const[showaddFirmtitle, setShowaddFirmtitle] =  useState(true)
  const[welcomePage, setWelcomePage] = useState(false)

useEffect(()=>{
  const loginToken = localStorage.getItem('loginToken')
  if(loginToken){
    setShowLogOut(true)
  }
}, [])


useEffect(()=>{
  const firmName = localStorage.getItem('firmName')
  if(firmName){
    setShowaddFirmtitle(false)
  }
})

const logOutHandler = ()=>{
  confirm("Are you sure to logout")
  localStorage.removeItem("loginToken");
  localStorage.removeItem("firmId");
  localStorage.removeItem('firmName')
  setShowLogOut(false)
  setShowaddFirmtitle(true)
}


  const loginHandler = () =>{
    setShowLogin(true)
    setShowSignup(false)
    setShowaddfirm(false)
    setShowAddproduct(false)
    setShowAllproducts(false)
  } 
 const signupHandler = ()=>{
  setShowSignup(true)
  setShowLogin(false)
  setShowaddfirm(false)
  setShowAddproduct(false)
  setShowAllproducts(false)
 }
 const AddfirmHandler = ()=>{
  if(showLogOut){
  setShowSignup(false)
  setShowLogin(false)
  setShowaddfirm(true)
  setShowAddproduct(false)
  setShowAllproducts(false)
  setWelcomePage(false)
  
  }else{
    alert("Please login")
    setShowLogin(true)
    window.location.reload()
  }
 }

 const AddProductHandler = ()=>{
  if(showLogOut){
  setShowSignup(false)
  setShowLogin(false)
  setShowAddproduct(true)
  setShowaddfirm(false)
  setShowAllproducts(false)
  }else{
    alert("Please login")
    setShowLogin(true)
  }
 }

 const AllproductsHandler = ()=>{
  if(showLogOut){
  setShowSignup(false)
  setShowLogin(false)
  setShowAddproduct(false)
  setShowaddfirm(false)
  setShowAllproducts(true)
  }else{
    alert("Please login")
    setShowLogin(true) 
  }

 }


 const welcomeHandler = ()=>{
  setShowSignup(false)
  setShowLogin(false)
  setShowAddproduct(false)
  setShowaddfirm(false)
  setShowAllproducts(false)
  setWelcomePage(true)
 }

  return (
    <>
   <div className='section'>
   <Navbar loginHandler = {loginHandler} signupHandler = {signupHandler}
   showLogOut = {showLogOut}  logOutHandler = {logOutHandler}/>
   <div className='section-bar'>
   <Sidebar AddfirmHandler = {AddfirmHandler} AddProductHandler = {AddProductHandler} AllproductsHandler = {AllproductsHandler} showaddFirmtitle={showaddFirmtitle}/>
   { showLogin && <VendorLogin welcomeHandler ={welcomeHandler}/>}
   { showSignup && <VendorRegister loginHandler = {loginHandler}/>}
   { showaddfirm && showLogOut && <Addfirm/>}
   {showAddproduct && showLogOut && <Addproducts/> }
   {showAllproducts && showLogOut && <Allproducts/>}
   {welcomePage && <WelcomePage/>}
   
   </div>
   </div>
   
    </>
  )
}

export default Landingpage