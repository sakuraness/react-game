import React from 'react';
import { Card, Button, Form } from "react-bootstrap";
import "./QuestionA.css";
import bgA from "../images/chineseBG.jpg"; // ✅ 從 src/images 匯入背景圖

function ClearPage() {
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
      <Button>CLEAR</Button>
      
    </div>
  );
}

export default ClearPage;