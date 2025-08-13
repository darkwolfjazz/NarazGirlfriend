import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import './QuizComponent.css';
import prodUrl from "../../api";        

const TOTAL_QUESTIONS=6;
const QuizComponent = ({setIsLoggedIn}) => {
  const [questionData, setQuestionData] = useState(null);
  const[selectedOption,setSelectedOption]=useState('');
  const[score,setScore]=useState(0);
  const[askedQuestions,setAskedQuestions]=useState(0);
  const[quizOver,setQuizOver]=useState(false);
  const[loading,setLoading]=useState(false);
  const toast=useRef(null);
  const navigate=useNavigate();
  const[usedQuestionIds,setUsedQuestionIds]=useState(new Set());

  const handleLogout=()=>{
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/')
  };
  
  const fetchUniqueQuestion=async()=>{
     setLoading(true);
     try{
      let tries=0;
      const maxTries=10;
      while(tries<maxTries){
        const response=await prodUrl.get('/api/getRandomQuiz');
        const data=response.data;
        console.log("Data from getRandom Quiz->",data);
        if(!data){
          toast.current.show({
            severity:'warn',
            summary:'No questions found',
            detail:'No questions found from the server'
          });
          break;
        }
        if(!usedQuestionIds.has(data.id)){
          setQuestionData(data);
          setSelectedOption('');
          setUsedQuestionIds(prev=>new Set(prev).add(data.id));
          break;
        }
        tries++;
      }
      if(tries==maxTries){
         toast.current.show({ 
          severity: 'warn', summary: 'No new questions', detail: 'Could not find new questions.' 
        });
      }
     }catch(err){
       toast.current.show({ 
        severity: 'error', summary: 'Error', detail: 'Failed to fetch question' 
      });
     }finally{
      setLoading(false);
     }
  };
  
  useEffect(() => {
    fetchUniqueQuestion();
  }, []);

  const submitAnswer = async (e) => {
    e.preventDefault();

    if (!selectedOption) {
      toast.current.show({
         severity: 'warn', summary: 'Select Option', detail: 'Please select an option' 
        });
      return;
    }

    try {
      setLoading(true);
      const params = new URLSearchParams({
        quizId: questionData.id,
        userAnswer: selectedOption,
      });
      const response = await prodUrl.post(`/api/checkScore?${params.toString()}`);
      const points = response.data;
      console.log("Points API->",points);
      setScore(prev => prev + points);
      setAskedQuestions(prev => prev + 1);

      if (askedQuestions + 1 >= TOTAL_QUESTIONS) {
        setQuizOver(true);
      } else {
        fetchUniqueQuestion();
      }
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to submit answer' });
    } finally {
      setLoading(false);
    }
  };
  const resetQuiz = () => {
    setScore(0);
    setAskedQuestions(0);
    setQuizOver(false);
    setUsedQuestionIds(new Set());
    fetchUniqueQuestion();
  };

  if (loading && !questionData) return <div>Loading...</div>;

  return (
   <div className="quiz-container">
      <Toast ref={toast} />
      <Card className="p-card">
        <div className="score-header">Score: {score}</div>

        {quizOver ? (
          <div className="quiz-over-message">
            <h3>Quiz Finished!</h3>
            <p className="final-score">Your final score: {score}</p>
            <Button label="Restart Quiz" onClick={resetQuiz} />
            <Button label="Logout" icon="pi pi-sign-out" severity="danger" onClick={handleLogout} />
          </div>
        ) : (
          <form onSubmit={submitAnswer}>
            <div className="question-text">{questionData?.question}</div>

            <div className="options-container">
              <div className="p-field-radiobutton">
                <RadioButton
                  inputId="optionA"
                  name="option"
                  value="A"
                  onChange={(e) => setSelectedOption(e.value)}
                  checked={selectedOption === 'A'}
                />
                <label htmlFor="optionA">{questionData?.optionA}</label>
              </div>

              <div className="p-field-radiobutton">
                <RadioButton
                  inputId="optionB"
                  name="option"
                  value="B"
                  onChange={(e) => setSelectedOption(e.value)}
                  checked={selectedOption === 'B'}
                />
                <label htmlFor="optionB">{questionData?.optionB}</label>
              </div>

              <div className="p-field-radiobutton">
                <RadioButton
                  inputId="optionC"
                  name="option"
                  value="C"
                  onChange={(e) => setSelectedOption(e.value)}
                  checked={selectedOption === 'C'}
                />
                <label htmlFor="optionC">{questionData?.optionC}</label>
              </div>

              <div className="p-field-radiobutton">
                <RadioButton
                  inputId="optionD"
                  name="option"
                  value="D"
                  onChange={(e) => setSelectedOption(e.value)}
                  checked={selectedOption === 'D'}
                />
                <label htmlFor="optionD">{questionData?.optionD}</label>
              </div>
            </div>

            <Button label={loading ? "Checking..." : "Submit Answer"} type="submit" disabled={loading} />
             <Button label="Logout" icon="pi pi-sign-out" severity="danger" onClick={handleLogout} />
          </form>
        )}
      </Card>
    </div>
  )
}

export default QuizComponent