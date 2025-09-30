import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Appoinment from "./Pages/Appoinment";
import Contact from "./Pages/Contact";
import Doctors from "./Pages/Doctors";
import MyAppoinment from "./Pages/MyAppoinment";
import MyProfile from "./Pages/MyProfile";
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';


const App = () => {
  return (
    <div className='mx:4 sm:mx-[10%] max-sm:px-5'>

      <NavBar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/appoinment/:docId' element={<Appoinment/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/my-appoinments' element={<MyAppoinment/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        
      </Routes>

      <Footer/>
      
    </div>
  )
}

export default App