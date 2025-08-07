import { use, useState } from 'react'
import './App.css'
import LoginForm from './components/Login/LoginForm'
import Dashboard from './pages/Dashboard'
import MoodComponent from './components/mood/MoodComponent'
import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom'

function App() {
 
  const[isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("isLoggedIn") === "true")

  return (
    <Router>
     <Routes>
      <Route path="/" element={<LoginForm setIsLoggedIn={setIsLoggedIn}/>} />
       <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
        path='/mood'
        element={isLoggedIn?
        <MoodComponent setIsLoggedIn={setIsLoggedIn}/>:<Navigate to="/"/>}
        />
     </Routes>
    </Router>
  )
}

export default App
