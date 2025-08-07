import React from 'react'

const MoodCard = ({onClick}) => {
  return (
    <div
    onClick={onClick}
    style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1.5rem",
        cursor: "pointer",
        backgroundColor: "#f9f9f9",
        width: "250px",
        textAlign: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}
    >
        <h3>Mood Fixer</h3>
        <p>Feeling low? Lets fix your mood with fun and love</p>
      
    </div>
  )
}

export default MoodCard