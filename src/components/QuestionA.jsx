import React from 'react';
import { Card, Button, Form } from "react-bootstrap";
import "./QuestionA.css";
import bgA from "../images/chineseBG.jpg"; // ✅ 從 src/images 匯入背景圖

function QuestionA({ onBack, onSubmit }) {
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

      <Card className="question-card">
        <Card.Body>
          <Card.Title style={{ textAlign: "center", marginBottom: "20px" }}>
            題目 A
          </Card.Title>

          {/* 題目內容區 */}
          <div className="question-columns">
            <div className="column">
              <div className="vertical-text">天地人心愛誠和</div>
              <Form.Control className="answer-input" placeholder="答" />
            </div>

            <div className="column">
              <div className="vertical-text">山水火風雲雷光</div>
              <Form.Control className="answer-input" placeholder="答" />
            </div>
          </div>
        </Card.Body>

        {/* ✅ 返回主畫面按鈕 */}
        <div className="button-group">
          <Button onClick={onBack}>返回主畫面</Button>
          <Button>提示</Button>
          <Button onClick={() => onSubmit('答A')}>送出答案</Button>
        </div>
      </Card>
    </div>
  );
}

export default QuestionA;