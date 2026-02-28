import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import "./QuestionD.css";
import bgC from "../images/biologyBG.jpg";

function QuestionD({ onBack, onSubmit }) {
  const gridSize = 4;
  const [visibleHints, setVisibleHints] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);

  // ✅ 固定的提示格與內容
  const hints = {
    0: "海洋生物",
    3: "有殼",
    4: "腳很多",
    10: "有鬍鬚",
    11: "有分節",
    13: "有尾巴",
  };

  // 點擊格子 → 顯示提示 3 秒後淡出
  const handleClick = (index) => {
    if (!hints[index]) return; // 無提示格不反應
    setVisibleHints((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setVisibleHints((prev) => ({ ...prev, [index]: false }));
    }, 3000);
  };

  // 檢查答案
  const handleSubmit = () => {
    if (inputValue.trim() === "蝦") {
      setShowCorrectModal(true);
    } else {
      setShowWrongModal(true);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgC})`,
        backgroundRepeat: "repeat",
        backgroundSize: "500px 500px",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "8vh",
      }}
    >
      <Card className="question-card ui-card ui-card--blue">
        <Card.Body>
          <div className="hint-box">
            「想要答案嗎？想要的話就送給你吧！自己去找吧，我把線索都埋藏在那裡了。」
          </div>
          
          <Card.Title style={{ textAlign: "center", marginBottom: "20px" }}>
            根據找到的線索猜出一種生物，答案只有一個字。
          </Card.Title>

          <div className="grid-container-d">
            {Array.from({ length: gridSize * gridSize }, (_, index) => (
              <div
                key={index}
                className="grid-cell-d"
                onClick={() => handleClick(index)}
              >
                {visibleHints[index] && (
                  <span className="hint-text">{hints[index]}</span>
                )}
              </div>
            ))}
          </div>

          <div className="answer-area">
            <Form.Control
              type="text"
              maxLength={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="謎"
              className="answer-input"
            />
          </div>
        </Card.Body>

        <div className="button-group">
          <Button className="ui-btn ui-btn--primary-square" onClick={onBack}>返回主畫面</Button>
          <Button className="ui-btn ui-btn--primary-square" onClick={handleSubmit}>送出答案</Button>
        </div>
      </Card>

      {/* ✅ 正確 modal */}
      <Modal show={showCorrectModal} onHide={() => setShowCorrectModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>恭喜答對！</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>正確答案就是「蝦」！</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => onSubmit("蝦")}>
            回首頁
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ❌ 錯誤 modal */}
      <Modal show={showWrongModal} onHide={() => setShowWrongModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>答錯了！</Modal.Title>
        </Modal.Header>
        <Modal.Body>再想想看，也許線索還沒全看完！</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowWrongModal(false)}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QuestionD;
