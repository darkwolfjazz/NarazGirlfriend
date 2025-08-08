import axios from 'axios';
import React, { useRef, useState } from 'react'
import { InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import './ComplimentComponent.css';
const ComplimentComponent = ({setIsLoggedIn}) => {
  
  const[word,setWord]=useState('');
  const[compliment,setCompliment]=useState('');
  const[loading,setLoading]=useState(false);
  const toast=useRef(null);
  const navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/')
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!word.trim()) {
      toast.current.show({
        severity: 'warn',
        summary: 'Missing word',
        detail: 'Please enter a word before submitting.',
        life: 3000
      });
      return;
    }

    setLoading(true);
    setCompliment('');

    try {
      const response = await axios.post('http://localhost:8080/api/compliment', {
        word: word
      });

      console.log("Api response",response);

      if (response.data && response.data.generatedCompliment) {
        console.log("Response for compliment ->",response);
        console.table("response Data->",response.data);
        setCompliment(response.data.generatedCompliment);
        console.log("Final response:",response.data.generatedCompliment);
      } else {
        setCompliment('No compliment generated.');
      }
    } catch (err) {
      console.error("Error fetching compliment", err);
      setCompliment("Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };


   
    
    return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Toast ref={toast} />

      <Card title="Generate a Compliment 💖" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span className="p-float-label">
            <InputText
              id="word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              style={{ width: '100%' }}
            />
            <label htmlFor="word">Enter any word 💭</label>
          </span>

          <Button label={loading ? "Generating..." : "Get Compliment"} icon="pi pi-heart" loading={loading} type="submit" />
          <Button label="Logout" icon="pi pi-sign-out" severity="danger" onClick={handleLogout} />
        </form>

        {compliment && (
          <div className="compliment-card">
            {compliment}
          </div>
        )}
      </Card>
    </div>
  )
}

export default ComplimentComponent