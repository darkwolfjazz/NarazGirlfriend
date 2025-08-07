import React, { useState, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { songs } from '../../data/songData.js';
import './RomanticSongs.css';

const RomanticSongs = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const playerRef = useRef();

  const handlePlay = (index) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex === null) return;
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    if (currentIndex === null) return;
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="romantic-container">
      <div className="playlist-header">
        <img
          src={
            currentIndex !== null ? songs[currentIndex].image : songs[0].image
          }
          alt="Playlist Cover"
          className="playlist-cover"
        />
        <div>
          <h2 className="playlist-title">Romantic Bollywood ❤️</h2>
          <p className="playlist-subtitle">Your handpicked romantic playlist</p>
        </div>
      </div>

      <div className="scrollable-song-list">
        <div className="song-list">
          {songs.map((song, idx) => (
            <div
              key={idx}
              className={`song-card ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => handlePlay(idx)}
            >
              <img src={song.image} alt={song.title} className="song-thumbnail" />
              <div>
                <p className="song-title">{song.title}</p>
                <p className="song-artist">{song.artist || 'Unknown Artist'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentIndex !== null && (
        <>
          <div className="lyrics-box">
            <h4>Lyrics: {songs[currentIndex].title}</h4>
            <p>{songs[currentIndex].lyrics}</p>
          </div>

          <div className="player-fixed">
            <AudioPlayer
              autoPlay
              src={songs[currentIndex].audioUrl}
              onEnded={handleNext}
              showSkipControls={true}
              showJumpControls={false}
              onClickPrevious={handlePrevious}
              onClickNext={handleNext}
              ref={playerRef}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RomanticSongs;
