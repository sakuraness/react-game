import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
// import Game from './components/Game'; // 之後的頁面

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/game" element={<Game />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
