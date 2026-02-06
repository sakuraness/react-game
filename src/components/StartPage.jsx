import React, { useState } from 'react';
import { Card, Button, Form } from "react-bootstrap";
import "./StartPage.css";
import bg from "../images/bgStarSky.png";

function StartPage({ onSubmit }) {

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
        <Card.Body>
          <div className="hint-box">
            「那一天，老師終於回想起了，曾經批改字音字形考卷的恐怖。」
          </div>

          <Card.Title style={{ textAlign: "center", marginBottom: "20px" }}>
            請直向閱讀文字，每一行答案各有一字，最後兩字終能合二為一。
          </Card.Title>

          <button class="glow-btn">
            <svg class="border-svg" viewBox="0 0 160 50" preserveAspectRatio="none">
                <rect x="1" y="1" width="158" height="48" pathLength="1" />
            </svg>
            START
          </button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default StartPage;