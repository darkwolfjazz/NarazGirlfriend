import React, { useState, useRef, useEffect} from 'react';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import prodUrl from "../../api";

const MoodComponent = ({setIsLoggedIn}) => {
  const [mood, setMood] = useState('');
  const [reason, setReason] = useState('');
  const [luckyNumber, setLuckyNumber] = useState(null);
  const [response, setResponse] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const toast = useRef(null);
  const videoRef = useRef(null);

  const navigate=useNavigate();

  const moodOptions = [
    { label: 'Sad', value: 'Sad' },
    { label: 'Angry', value: 'Angry' },
    { label: 'Stressed', value: 'Stressed' },
    { label: 'Lonely', value: 'Lonely' }
  ];
   
  const handleFixMood = async () => {
    setResponse('');
    setShowVideo(false);

    if (!mood || !reason || luckyNumber === null) {
      toast.current.show({
        severity: 'warn',
        summary: 'Missing fields',
        detail: 'Please fill in all the fields',
        life: 3000
      });
      return;
    }

    try {
      const res = await prodUrl.post('/mood/fix', {
        mood,
        reason,
        luckyNumber
      });

      const data = res.data;
      if (data.startsWith('video:')) {
        const videoUrl = data.replace('video:', '').replace('watch?v=', 'embed/') + '?autoplay=1';
        setResponse(videoUrl);
        setShowVideo(true);
        toast.current.show({
          severity: 'success',
          summary: 'Mood Fixed!',
          detail: 'Watch the funny video 🎥',
          life: 3000
        });

        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300); // scroll to video
      } else {
        toast.current.show({
          severity: 'success',
          summary: 'Mood Fixed!',
          detail: 'Coupon sent to your mail',
          life: 3000
        });
        setShowVideo(false);
      }

      // Reset fields
      setMood('');
      setReason('');
      setLuckyNumber(null);
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong',
        life: 3000
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Toast ref={toast} />

      <Card title="Fix Your Mood" style={{ padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div className="p-fluid" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          <span className="p-float-label">
            <Dropdown
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.value)}
              options={moodOptions}
              placeholder="Select your mood"
              style={{ width: '100%' }}
            />
            <label htmlFor="mood">Your Mood</label>
          </span>

          <span className="p-float-label">
            <InputTextarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              autoResize
            />
            <label htmlFor="reason">Why do you feel this way?</label>
          </span>

          <span className="p-float-label">
            <InputNumber
              id="luckyNumber"
              value={luckyNumber}
              onValueChange={(e) => setLuckyNumber(e.value)}
              useGrouping={false}
              style={{ width: '100%' }}
            />
            <label htmlFor="luckyNumber">Your Lucky Number</label>
          </span>

          <Button label="Fix Mood" icon="pi pi-check" onClick={handleFixMood} />
          <Button label="Logout" icon="pi pi-sign-out" severity="danger" onClick={handleLogout} />
        </div>
      </Card>

      {showVideo && (
        <div ref={videoRef} style={{ marginTop: '2rem' }}>
          <Card title="Here’s something to cheer you up! 🎥">
            <iframe
              width="100%"
              height="315"
              src={response}
              title="Mood Fixer Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MoodComponent;
