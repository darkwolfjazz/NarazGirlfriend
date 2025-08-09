import React from 'react'
import MoodCard from '../components/mood/MoodCard'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button';
import SongCard from '../components/songs/SongCard';
import ComplimentCard from '../components/compliments/ComplimentCard';
import QuizCard from '../components/quiz/QuizCard';
const Dashboard = ({setIsLoggedIn}) => {
   
   const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };
  
  const navigate=useNavigate();
    return (
    <div
    style={{padding:"2rem"}}>
        <h2>Welcome ! What would you like to do today?</h2> 
         <Button label="Logout" icon="pi pi-sign-out" severity="danger" onClick={handleLogout} />
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <MoodCard onClick={()=>navigate('/mood')}/>
        <SongCard onClick={()=>navigate('/romantic-songs')}/>
        <ComplimentCard onClick={()=>navigate('/compliments')}/> 
         <QuizCard onClick={()=>navigate('/quiz')}/>  
        </div>
    </div>
  )
}

export default Dashboard
