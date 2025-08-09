import React from 'react'

const MoodCard = ({onClick}) => {
  return (
   <div
      onClick={onClick}
      style={{
        border: '1px solid #ccc',
        borderRadius: '12px',
        cursor: 'pointer',
        backgroundColor: '#f9f9f9',
        width: '100%',
        maxWidth: '300px',
        minWidth: '220px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      
      <div
        style={{
          height: '260px', 
          backgroundImage: 'url(/assets/banner_images/mood_card.jpg)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
        }}
      />
     
      <div style={{ padding: '1.25rem', textAlign: 'center' }}> 
        <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>Mood Fixer</h3> 
        <p style={{ margin: 0, fontSize: '0.95rem' }}>Feeling low? Lets fix your mood with fun and love</p>
      </div>
    </div>
  )
}

export default MoodCard