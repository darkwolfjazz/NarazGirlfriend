import React from 'react'
import MoodCard from '../components/mood/MoodCard'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button';
import SongCard from '../components/songs/SongCard';
import ComplimentCard from '../components/compliments/ComplimentCard';
import QuizCard from '../components/quiz/QuizCard';


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
      <style>{gridCss}</style>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              background: 'linear-gradient(90deg, #007ad9, #00c6ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              letterSpacing: '1px'
            }}
          >
            Welcome!
          </h2>
         <div
  style={{
    fontSize: '1.3rem',
    fontWeight: 600,
    color: '#2c3e50',
    marginTop: '0.4rem',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }}
>
  <span role="img" aria-label="sparkles">✨</span>
  Ready to explore something amazing?
</div>

        </div>
        <Button
          label="Logout"
          icon="pi pi-sign-out"
          severity="danger"
          onClick={handleLogout}
          style={{
            fontWeight: 600,
            borderRadius: '1.5rem',
            padding: '0.5rem 2rem',
            fontSize: '1rem',
            boxShadow: '0 2px 8px 0 rgba(0,122,217,0.08)'
          }}
        />
      </div>

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
