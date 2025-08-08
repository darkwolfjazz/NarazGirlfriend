import { use, useEffect, useState } from 'react'
import './App.css'
import LoginForm from './components/Login/LoginForm'
import Dashboard from './pages/Dashboard'
import MoodComponent from './components/mood/MoodComponent'
import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom'
import RomanticSongs from './components/songs/RomanticSongs'
import ComplimentComponent from './components/compliments/ComplimentComponent'

function App() {
 
  const[isLoggedIn,setIsLoggedIn]=useState(()=>{
   return localStorage.getItem('isLoggedIn')==='true';
  });

useEffect(()=>{
  localStorage.setItem('isLoggedIn',isLoggedIn);
},[isLoggedIn]);




  return (
    <Router>
     <Routes>
      <Route path="/" element={<LoginForm setIsLoggedIn={setIsLoggedIn}/>} />
       <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn}/> : <Navigate to="/" />}
        />
        <Route
        path='/mood'
        element={isLoggedIn?
        <MoodComponent setIsLoggedIn={setIsLoggedIn}/>:<Navigate to="/"/>}
        />
        <Route
        path='/romantic-songs'
        element={isLoggedIn?<RomanticSongs setIsLoggedIn={setIsLoggedIn}/>:<Navigate to="/"/>}
        />
        <Route
        path='/compliments'
        element={isLoggedIn?<ComplimentComponent setIsLoggedIn={setIsLoggedIn}/>:<Navigate to="/"/>}
        />
     </Routes>
    </Router>
  )
}

export default App
