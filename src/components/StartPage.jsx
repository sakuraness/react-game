import React, { useState } from 'react';
import { Card, Button, Form } from "react-bootstrap";
import "./StartPage.css";
import bg from "../images/bgMainSky10.png";

function StartPage({ onSubmit }) {

  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");
  const [isNameFocused, setIsNameFocused] = useState(false);


  // 先獨立成 function，之後你可在這裡擴充 rules
  const validatePlayerName = (rawName) => {
    const name = (rawName ?? "").trim();

    if (!name) {
      return { isValid: false, message: "ERROR：請輸入名稱" };
    }

    // 長度限制：2~20 字元
    if (name.length < 2 || name.length > 20) {
      return { isValid: false, message: "ERROR：名稱長度限制 2~20 字元" };
    }

    // 阻擋常見 JS / XSS 語法
    const blockedJsPattern =
      /<\s*\/?\s*script\b|javascript\s*:|on\w+\s*=|<\s*\/?\s*[a-z][^>]*>|=>|[{}()[\];`\\]/i;

    if (blockedJsPattern.test(name)) {
      return { isValid: false, message: "ERROR：名稱包含不允許的字元或語法" };
    }

    return { isValid: true, message: "" };
  };

  const handleStart = () => {
    const result = validatePlayerName(playerName);

    if (!result.isValid) {
      setError(result.message);
      return;
    }

    const trimmedName = playerName.trim();
    const isConfirmed = window.confirm(`核對：你是 ${trimmedName}？`);

    if (!isConfirmed) {
      return; // 使用者按取消就不送出
    }

    setError("");
    onSubmit(trimmedName);
  };



  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
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

      <Card className="question-card ui-card ui-card--gray">
        <Card.Body className="question-card-body">
          <div className="hint-box">
            「歡迎你，挑戰者」
          </div>

          <Card.Title style={{ textAlign: "center", marginBottom: "20px", marginTop: "100px" }}>
            你的名字是————
          </Card.Title>

          <Form.Group className="name-form-wrap">
            <div className="name-input-wrapper">
              <Form.Control
                type="text"
                className="name-input"
                placeholder=""
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              {!playerName.trim() && <span className="center-blink-caret" />}
            </div>
          </Form.Group>

          <button className="glow-btn" onClick={handleStart}>
            <svg className="border-svg" viewBox="0 0 160 50" preserveAspectRatio="none">
                <rect x="1" y="1" width="158" height="48" pathLength="1" />
            </svg>
            START
          </button>
          {error && <div className="name-error">{error}</div>}
        </Card.Body>
      </Card>
    </div>
  );
}

export default StartPage;