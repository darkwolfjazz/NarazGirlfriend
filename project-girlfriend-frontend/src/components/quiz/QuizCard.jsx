import React from 'react'

const QuizCard = ({onClick}) => {
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
        <h3>Time to play some quiz</h3>
        <p>Lets check your netflix encylopedia</p>
      
    </div>
  )
}

export default QuizCard
