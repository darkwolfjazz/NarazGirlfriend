import React from 'react'

const MoodCard = ({onClick}) => {
  return (
    <div
    onClick={onClick}
    style={{
       border: '1px solid #ccc',
        borderRadius: '12px',
        padding: '2rem',
        cursor: 'pointer',
        backgroundColor: '#f9f9f9',
        width: '300px',
        textAlign: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
        <h3>Mood Fixer</h3>
        <p>Feeling low? Lets fix your mood with fun and love</p>
      
    </div>
  )
}

export default MoodCard