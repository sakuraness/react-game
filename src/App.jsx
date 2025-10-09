import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';

import Home from './components/Home';
import QuestionA from './components/QuestionA';
import QuestionB from './components/QuestionB';
import QuestionC from './components/QuestionC';
import QuestionD from './components/QuestionD';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [answers, setAnswers] = useState({ A: null, B: null, C: null, D: null });

  const handleAnswer = (qKey, value) => {
    setAnswers(prev => ({ ...prev, [qKey]: value }));
    setCurrentPage('home'); // 回到首頁
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg">
        <Container className="justify-content-between" style={{width: '100%'}}>
          {/* 左邊 Logo */}
          <Navbar.Brand>Allen Magica</Navbar.Brand>

          {/* 中間頁面名稱 */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: 'bold'
          }}>
            {currentPage === 'home' && '現在正是解謎的時刻！'}
            {currentPage === 'A' && '中文造詣'}
            {currentPage === 'B' && '數學理解'}
            {currentPage === 'C' && '英文程度'}
            {currentPage === 'D' && '生物知識'}
          </div>

          {/* 右邊玩家名稱 */}
          <Navbar.Text className="ms-auto">
            玩家：playerX
          </Navbar.Text>
        </Container>
      </Navbar>

      {currentPage === 'home' && (
        <Home 
          answers={answers} 
          onSelectQuestion={(q)=>setCurrentPage(q)} 
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
    </>
  );
}

export default App;
