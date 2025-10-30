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
              <Form.Control className="answer-input" placeholder="答" />
            </div>

            <div className="column">
              <div className="vertical-text">左答削頭去一橫</div>
              <Form.Control className="answer-input" placeholder="答" />
            </div>
          </div>
        </Card.Body>

        {/* ✅ 返回主畫面按鈕 */}
        <div className="button-group">
          <Button onClick={onBack}>返回主畫面</Button>
          <Button>提示</Button>
          <Button onClick={() => onSubmit('顛')}>送出答案</Button>
        </div>
      </Card>
    </div>
  );
}

export default QuestionA;