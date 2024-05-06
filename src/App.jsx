import React from 'react'
import Landingpage from './Pages/Landingpage';
import './App.css';
import Notfoundpage from './Components/forms/Notfoundpage';
import {Routes, Route} from 'react-router-dom'

function App(){
  return(
    <>
   
    <Routes>
      <Route path='/' element = {<Landingpage/>} />
      <Route path = '/*' element ={<Notfoundpage/>}  />
    </Routes>
    </>
  )
}
 export default App;