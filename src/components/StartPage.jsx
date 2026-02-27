import React, { useState } from 'react';
import { Card, Button, Form } from "react-bootstrap";
import "./StartPage.css";
import bg from "../images/bgStarSky.png";

function StartPage({ onSubmit }) {

  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");
  const [isNameFocused, setIsNameFocused] = useState(false);


  // 先獨立成 function，之後你可在這裡擴充 rules
  const validatePlayerName = (rawName) => {
    const name = (rawName ?? "").trim();

    if (!name) {
      return { isValid: false, message: "請先輸入名稱" };
    }

    return { isValid: true, message: "" };
  };

  const handleStart = () => {
    const result = validatePlayerName(playerName);

    if (!result.isValid) {
      setError(result.message);
      return;
    }

    setError("");
    onSubmit(playerName.trim());
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

      <Card className="question-card ui-card ui-card--orange">
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