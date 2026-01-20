import React from 'react';
import { Card } from "react-bootstrap";
import "./ClearPage.css";
import bg from "../images/bgStarSky.png";
import imgCongrats from "../images/congrats.png";

function ClearPage() {
  return (
    <div
      className="clearpage-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <Card className="clearpage-card">
        <Card.Body className="clearpage-card-body">
          <Card.Title className="clearpage-title">
            恭喜通關
          </Card.Title>

          <img
            src={imgCongrats}
            alt="congratulations"
            className="clearpage-image"
          />

          <div className="clearpage-text">
            你成功完成了「點擊八下」的最終指令
          </div>

          <div className="clearpage-text">
            為了感謝你的遊玩，你將不會獲得豐富的獎勵
          </div>

          <div className="clearpage-text">
            通關花費時間為：XX 分 XX 秒
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ClearPage;
