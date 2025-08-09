import React from 'react'

const QuizCard = ({onClick}) => {
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
      {/* Banner/Image */}
      <div
        style={{
          height: '260px', // 🔹 Increased from 120px → 160px (can use 180px too)
          backgroundImage: 'url(/assets/banner_images/NetflixCard.jpg)', // updated URL size for clarity
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
        }}
      />
      {/* Content */}
      <div style={{ padding: '1.25rem', textAlign: 'center' }}> {/* 🔹 slightly more padding */}
        <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>Netflix Quiz</h3> {/* 🔹 bigger title */}
        <p style={{ margin: 0, fontSize: '0.95rem' }}>Time to check your netflix encyclopedia knowledge</p>
      </div>
    </div>
  )
}

export default QuizCard
