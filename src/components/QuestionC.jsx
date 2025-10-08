import React , { useState } from 'react';
import { Card, Button, Form, Modal } from "react-bootstrap";
import "./QuestionC.css";
import bgC from "../images/englishBG.jpg";

function QuestionC({ onBack, onSubmit }) {
  const letters = [
    ["E","A","R","T","H"],
    ["V","I","D","E","O"],
    ["S","U","G","A","R"],
    ["L","I","G","H","T"],
    ["R","O","B","O","T"]
  ];

  const inputIndex = [0,1,2,3,4];

  const [inputs, setInputs] = useState(Array(5).fill(""));
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [rowResults, setRowResults] = useState([]); // 每行答題正確與否

  const handleInputChange = (row, value) => {
    const newInputs = [...inputs];
    newInputs[row] = value.toUpperCase();
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    const answer = ["E","I","G","H","T"];
    const isCorrect = inputs.every((v, i) => v === answer[i]);

    if (isCorrect) {
      setShowCorrectModal(true);
    } else {
      // 生成每行正確與否
      const results = inputs.map((v, i) => v === answer[i]);
      setRowResults(results);
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
      <Card className="question-card">
        <Card.Body>
          <Card.Title style={{ textAlign: "center", marginBottom: "20px" }}>
            題目 C
          </Card.Title>

          <div>
            {letters.map((row, i) => (
              <div className="matrix-row d-flex justify-content-center gap-2 mb-3" key={i}>
                {row.map((letter, j) => (
                  j === inputIndex[i] ? (
                    <Form.Control
                      key={j}
                      type="text"
                      maxLength={1}
                      className="matrix-input"
                      onChange={(e) => handleInputChange(i, e.target.value)}
                    />
                  ) : (
                    <div key={j} className="matrix-letter">{letter}</div>
                  )
                ))}
              </div>
            ))}
          </div>
        </Card.Body>

        <div className="button-group">
          <Button onClick={onBack}>返回主畫面</Button>
          <Button>提示</Button>
          <Button onClick={handleSubmit}>送出答案</Button>
        </div>
      </Card>

      {/* 正確 modal */}
      <Modal show={showCorrectModal} onHide={() => setShowCorrectModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>CONGRATULATION!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>恭喜，你答對了！</p>
          <p>正確答案就是 EIGHT，也就是「八」！</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => onSubmit('八')}>
            回首頁
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 錯誤 modal */}
      <Modal show={showWrongModal} onHide={() => setShowWrongModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>答錯了！</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>答案不正確，再試一次吧！</p>
          <div>
            {inputs.map((v, i) => (
              <p key={i}>
                 {rowResults[i] ? "✅" : "❌"} 第 {i+1} 行: <strong>{v || "空白"}</strong>
              </p>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowWrongModal(false)}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QuestionC;
