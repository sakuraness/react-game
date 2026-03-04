import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';

import './styles/tokens.css';
import './styles/components.css';
import './components/App.css';

import Home from './components/Home';
import QuestionA from './components/QuestionA';
import QuestionB from './components/QuestionB';
import QuestionC from './components/QuestionC';
import QuestionD from './components/QuestionD';
import QuestionX from './components/QuestionX';
import ClearPage from './components/ClearPage';
import StartPage from './components/StartPage';

function App() {
  const [currentPage, setCurrentPage] = useState('startPage');
  const [answers, setAnswers] = useState({ A: null, B: null, C: null, D: null });
  const [allCleared, setAllCleared] = useState(false); // TEST MODE: should be false
  const [isXCleared, setXCleared] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleStartSubmit = (name) => {
    setPlayerName(name);
    setElapsedSeconds(0);      // 重新開始時歸零
    setIsTimerRunning(true);   // 開始計時
    setCurrentPage("home");
  };

  const formatElapsedTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!isTimerRunning) return;

    const intervalId = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  useEffect(() => {
    if (currentPage === 'clear') {
      setIsTimerRunning(false);
    }
  }, [currentPage]);

  
  const handleAnswer = (qKey, value) => {
    setAnswers(prev => {
      const newAnswers = { ...prev, [qKey]: value };

      const isAllCleared = Object.values(newAnswers).every(v => v !== null);

      if (isAllCleared) {
        setAllCleared(true);
      }

      return newAnswers;
    });

    setCurrentPage('home');
  };

  const handleFinalAnswer = () => {
    
    setXCleared(true);
    setCurrentPage('home');
  };

  return (
    <>
      {/* Navbar */}
      <Navbar className="metallic-bg" expand="lg">
        <Container className="justify-content-between" style={{width: '100%'}}>
          {/* 左邊 ID */}
          <Navbar.Brand>
            挑戰者：{playerName || "Unknown"}
          </Navbar.Brand>

          {/* 中間頁面名稱 */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: 'bold'
          }}>
            {currentPage === 'startPage' && '現在正是解謎的時刻！'}
            {currentPage === 'home' && '現在正是解謎的時刻！'}
            {currentPage === 'A' && '中文造詣'}
            {currentPage === 'B' && '數學理解'}
            {currentPage === 'C' && '英文程度'}
            {currentPage === 'D' && '生物知識'}
            {currentPage === 'X' && '隱藏之聲'}
            {currentPage === 'clear' && '偶咩得多'}
          </div>

          {/* 右邊使用時數 */}
          <Navbar.Text className="ms-auto">
            Time: {formatElapsedTime(elapsedSeconds)}
          </Navbar.Text>

        </Container>
      </Navbar>

      {currentPage === "startPage" && (
        <StartPage onSubmit={handleStartSubmit} />
      )}
      {currentPage === 'home' && (
        <Home 
          answers={answers} 
          onSelectQuestion={(q)=>setCurrentPage(q)}
          allCleared ={allCleared}
          isXCleared = {isXCleared}
        />
      )}
      {currentPage === 'A' && (
        <QuestionA 
          onSubmit={(val)=>handleAnswer('A', val)}
          onBack={()=>setCurrentPage('home')}
        />
      )}
      {currentPage === 'B' && (
        <QuestionB 
          onSubmit={(val)=>handleAnswer('B', val)}
          onBack={()=>setCurrentPage('home')}
        />
      )}
      {currentPage === 'C' && (
        <QuestionC 
          onSubmit={(val)=>handleAnswer('C', val)}
          onBack={()=>setCurrentPage('home')}
        />
      )}
      {currentPage === 'D' && (
        <QuestionD 
          onSubmit={(val)=>handleAnswer('D', val)}
          onBack={()=>setCurrentPage('home')}
        />
      )}
      {currentPage === 'X' && (
        <QuestionX 
          onSubmit={()=>handleFinalAnswer()}
          onBack={()=>setCurrentPage('home')}
        />
      )}
      {currentPage === 'clear' && (
        <ClearPage
          elapsedSeconds={elapsedSeconds}
          playerName={playerName}
        />
      )}
    </>
  );
}

export default App;
