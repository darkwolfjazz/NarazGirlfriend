import React from 'react'
import MoodCard from '../components/mood/MoodCard'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button';
import SongCard from '../components/songs/SongCard';
import ComplimentCard from '../components/compliments/ComplimentCard';
import QuizCard from '../components/quiz/QuizCard';

// Responsive CSS for grid using CSS-in-JS (no external CSS needed)
const gridCss = `
.dashboard-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
}
.dashboard-row > * {
  flex: 1 1 220px;
  max-width: 300px;
  min-width: 180px;
}
@media (max-width: 1200px) {
  .dashboard-row > * { max-width: 45vw; }
}
@media (max-width: 850px) {
  .dashboard-row > * { max-width: 90vw; }
  .dashboard-row { gap: 0.75rem; }
}
@media (max-width: 650px) {
  .dashboard-row { flex-direction: column; align-items: center; }
  .dashboard-row > * { max-width: 96vw; }
}
`



const Dashboard = ({setIsLoggedIn}) => {
   
   const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };
  
  const navigate=useNavigate();
    return (
     <div style={{ padding: '2rem', width: '100%', boxSizing: 'border-box' }}>
      {/* Inject responsive grid CSS */}
      <style>{gridCss}</style>
      <h2 style={{ textAlign: 'center' }}>Welcome! What would you like to do today?</h2>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <Button
          label="Logout"
          icon="pi pi-sign-out"
          severity="danger"
          onClick={handleLogout}
        />
      </div>
      {/* Responsive grid row */}
      <div className="dashboard-row" style={{ marginTop: '2rem' }}>
        <MoodCard onClick={() => navigate('/mood')} />
        <SongCard onClick={() => navigate('/romantic-songs')} />
        <ComplimentCard onClick={() => navigate('/compliments')} />
        <QuizCard onClick={() => navigate('/quiz')} />
      </div>
    </div>
  )
}

export default Dashboard
