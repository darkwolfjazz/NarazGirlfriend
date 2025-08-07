import React from 'react'
import MoodCard from '../components/mood/MoodCard'
import { useNavigate } from 'react-router-dom'
const Dashboard = ({onSelectModule}) => {
   const navigate=useNavigate();
    return (
    <div
    style={{padding:"2rem"}}>
        <h2>Welcome ! What would you like to do today?</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <MoodCard onClick={()=>navigate('/mood')}/>
        </div>
    </div>
  )
}

export default Dashboard
