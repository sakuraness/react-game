import React, { useState } from 'react';
import { Card, Button, Form } from "react-bootstrap";
import "./QuestionA.css";
import bgA from "../images/chineseBG.jpg"; // ✅ 從 src/images 匯入背景圖

function QuestionA({ onBack, onSubmit }) {
  // ===== 答案 state =====
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');

  // ===== 正確答案定義 =====
  const correctAnswers = {
    answer1: '真',
    answer2: '頁',
    final: '顛',
  };

  // ===== 檢查答案 =====
  const checkAnswer = () => {
    if (
      answer1.trim() === correctAnswers.answer1 &&
      answer2.trim() === correctAnswers.answer2
    ) {
      onSubmit(correctAnswers.final);
    } else {
      alert('答案不正確，請再試一次');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgA})`,
        backgroundRepeat: "repeat",
        backgroundSize: "500px 500px",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // 原本是 center
        paddingTop: "8vh", // 控制上方距離，可調 5~10vh
      }}
    >

      <Card className="question-card ui-card ui-card--orange">
        <Card.Body>
          <div className="hint-box">
            「那一天，老師終於回想起了，曾經批改字音字形考卷的恐怖。」
          </div>

          <Card.Title style={{ textAlign: "center", marginBottom: "20px" }}>
            請直向閱讀文字，每一行答案各有一字，最後兩字終能合二為一。
          </Card.Title>

          {/* 題目內容區 */}
          <div className="question-columns">
            <div className="column">
              <div className="vertical-text">十目增一開八腳</div>
              <Form.Control
                className="answer-input"
                placeholder="答"
                value={answer1}
                onChange={(e) => setAnswer1(e.target.value)}
              />
            </div>

            <div className="column">
              <div className="vertical-text">左答削頭去一橫</div>
              <Form.Control
                className="answer-input"
                placeholder="答"
                value={answer2}
                onChange={(e) => setAnswer2(e.target.value)}
              />
            </div>
          </div>
        </Card.Body>

        {/* ✅ 返回主畫面按鈕 */}
        <div className="button-group">
          <Button className="ui-btn ui-btn--primary-square" onClick={onBack}>返回主畫面</Button>
          <Button  className="ui-btn ui-btn--primary-square" onClick={checkAnswer}>送出答案</Button>
        </div>
      </Card>
    </div>
  );
}

export default QuestionA;