import React , { useState } from 'react';
import { Card, Button, Modal } from "react-bootstrap";
import "./QuestionB.css";
import bgC from "../images/mathBG.jpg";

function QuestionB({ onBack, onSubmit }) {
  const gridSize = 7;
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);

  // ✅ 你可自行在此填寫每個格子的數字
  const numbers = [
    [12, 67, 15, 88, 73, 30, 40],
    [9, 5, 8, 66, 29, 10, 21],
    [20, 47, 33, 71, 41, 99, 25],
    [44, 2, 23, 76, 3, 35, 18],
    [70, 4, 26, 45, 11, 28, 77],
    [48, 27, 14, 24, 32, 50, 82],
    [58, 89, 13, 83, 17, 39, 92],
  ];

  // ✅ 正確答案圖案（你提供的 G 形）
  const solution = [
    [0,1,0,0,1,0,0],
    [0,1,0,0,1,0,0],
    [0,1,0,1,1,0,0],
    [0,1,1,0,1,0,0],
    [0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0],
    [0,1,1,1,1,0,0],
  ];

  // 點擊狀態
  const [clicked, setClicked] = useState(
    Array(gridSize).fill(null).map(() => Array(gridSize).fill(false))
  );

  // 點擊格子切換狀態
  const handleClick = (row, col) => {
    const newClicked = clicked.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? !c : c))
    );
    setClicked(newClicked);
  };

  // 檢查是否完全符合 solution
  const handleSubmit = () => {
    let correct = true;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if ((solution[i][j] === 1) !== clicked[i][j]) {
          correct = false;
          break;
        }
      }
      if (!correct) break;
    }

    if (correct) {
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
      <Card className="question-card ui-card ui-card--green">
        <Card.Body>
          <div className="hint-box">
            「因數是距離解謎最遙遠的因素。」
          </div>
          
          <Card.Title style={{ textAlign: "center", marginBottom: "20px" }}>
            找出那些 "無法被拆解" 的數字並標註起來，如此一來答案就會浮現。
          </Card.Title>

          <div className="grid-container">
            {numbers.map((row, i) =>
                row.map((num, j) => (
                <div
                    key={`${i}-${j}`}
                    className={`grid-cell ${clicked[i][j] ? "clicked" : ""}`}
                    onClick={() => handleClick(i, j)}
                >
                    {num}
                </div>
                ))
            )}
          </div>
        </Card.Body>

        <div className="button-group">
          <Button className="ui-btn ui-btn--primary-square" onClick={onBack}>返回主畫面</Button>
          <Button className="ui-btn ui-btn--primary-square" onClick={handleSubmit}>送出答案</Button>
        </div>
      </Card>

      {/* 正確 modal */}
      <Modal show={showCorrectModal} onHide={() => setShowCorrectModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>CONGRATULATION!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>恭喜，你答對了！</p>
          <p>正確答案就是「ㄐㄧ」，可用中文記做「基」！</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => onSubmit('基')}>
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

export default QuestionB;
