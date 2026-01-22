import React from "react";
import "./Home.css";
import bg from "../images/bgStarSky.png";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useRef } from "react";

const CLICK_INTERVAL_MS = 3000; // 3 秒，之後只改這裡
const REQUIRED_CLICKS = 8;

function Home({ answers, onSelectQuestion, allCleared, isXCleared }) {

  const [clickCount, setClickCount] = useState(0);

  const clearTimerRef = useRef(null); // 判斷「是否通關」
  const idleResetTimerRef = useRef(null); // 判斷是否「歸零」

  const handleFinalClick = () => {
    if (!allCleared) return;

    const now = Date.now();

    // 判斷通關倒數正在進行，若有代表「第 9 下」
    if (clearTimerRef.current) {
      clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }

    // 刷新「歸零」倒數
    if (idleResetTimerRef.current) {
      clearTimeout(idleResetTimerRef.current);
    }

    idleResetTimerRef.current = setTimeout(() => {
      setClickCount(0);
    }, CLICK_INTERVAL_MS);

    let nextCount = clickCount + 1;
    setClickCount(nextCount);

    // 是否剛好到 8 下
    if (nextCount === REQUIRED_CLICKS) {
      clearTimerRef.current = setTimeout(() => {
        onSelectQuestion("clear");
      }, CLICK_INTERVAL_MS);
    }
  };




  return (
    <div className="home-bg"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="container py-5">
        {/* ===== 隱藏關卡 ===== */}
        {allCleared && !isXCleared && (
          <div className="mb-4">
            <Card className="text-center ui-card--square" >
              <Card.Body >
                <Card.Title>Well Done!</Card.Title>
                <Card.Text>
                  恭喜你已完成各科的題目，也取得了所有謎底。
                </Card.Text>
                <Card.Text>
                  不過這些謎底好像缺少了什麼。進入隱藏關卡可以尋找遺失的關鍵。<br />
                  或是你也可以靠自己的智慧直接找出最終解答。
                </Card.Text>
                <Button className="ui-btn ui-btn--primary-square" size="lg" onClick={() => onSelectQuestion('X')}>
                  前往隱藏關卡
                </Button>
              </Card.Body>
            </Card>
          </div>
        )}
        {/* ===== 隱藏關卡結束 ===== */}

        {/* ===== X 通過訊息 ===== */}
        {isXCleared && (
          <div className="mb-4">
            <Card className="text-center ui-card--square" >
              <Card.Body >
                <Card.Title>Well Done!</Card.Title>
                <Card.Text>
                  重要的東西已經找回，最後為謎底補上關鍵，找出最終解答吧！
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
        {/* ===== X 通過訊息結束 ===== */}


        <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
          {/* 卡片 A */}
          <Card style={{ width: "12rem" }} className="text-center ui-card ui-card--orange">
            <Card.Body>
              <Card.Title>中文造詣</Card.Title>
              <Card.Text className="current-answer-box">
                <div className="answer-wrapper">
                  <div className="current-answer">
                    {answers.A ? `${answers.A}` : '謎'}
                  </div>

                  {isXCleared && (
                    <div className="current-answer-hint">3</div>
                  )}
                </div>
              </Card.Text>
              <Button className="ui-btn ui-btn--primary-square" onClick={() => onSelectQuestion('A')}>選擇</Button>
            </Card.Body>
          </Card>

          {/* 卡片 B */}
          <Card style={{ width: "12rem" }} className="text-center ui-card ui-card--green">
            <Card.Body>
              <Card.Title>數學理解</Card.Title>
              <Card.Text>
                <div className="answer-wrapper">
                  <div className="current-answer">
                    {answers.B ? `${answers.B}` : '謎'}
                  </div>

                  {isXCleared && (
                    <div className="current-answer-hint">2</div>
                  )}
                </div>
              </Card.Text>
              <Button className="ui-btn ui-btn--primary-square" onClick={() => onSelectQuestion('B')}>選擇</Button>
            </Card.Body>
          </Card>

          {/* 中間按鈕 */}
          <Button className="ui-btn ui-btn--primary-square" onClick={handleFinalClick}>
            {clickCount}
          </Button>

          {/* 卡片 C */}
          <Card style={{ width: "12rem" }} className="text-center ui-card ui-card--red">
            <Card.Body>
              <Card.Title>英文程度</Card.Title>
              <Card.Text>
                <div className="answer-wrapper">
                  <div className="current-answer">
                    {answers.C ? `${answers.C}` : '謎'}
                  </div>

                  {isXCleared && (
                    <div className="current-answer-hint">1</div>
                  )}
                </div>
              </Card.Text>
              <Button className="ui-btn ui-btn--primary-square" onClick={() => onSelectQuestion('C')}>選擇</Button>
            </Card.Body>
          </Card>

          {/* 卡片 D */}
          <Card style={{ width: "12rem" }} className="text-center ui-card ui-card--blue">
            <Card.Body>
              <Card.Title>生物知識</Card.Title>
              <Card.Text>
                <div className="answer-wrapper">
                  <div className="current-answer">
                    {answers.D ? `${answers.D}` : '謎'}
                  </div>

                  {isXCleared && (
                    <div className="current-answer-hint">4</div>
                  )}
                </div>
              </Card.Text>
              <Button className="ui-btn ui-btn--primary-square" onClick={() => onSelectQuestion('D')}>選擇</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};


export default Home;
