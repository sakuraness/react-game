import React from "react";
import "./Home.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Home({answers, onSelectQuestion, allCleared, isXCleared}) {
  return (
    <div className="container py-5">
      {/* ===== 隱藏關卡 ===== */}
      {allCleared && !isXCleared && (
        <div className="mb-4">
          <Card className="text-center" >
            <Card.Body >
              <Card.Title>Well Done!</Card.Title>
              <Card.Text>
                恭喜你已完成各科的題目，也取得了所有謎底。
              </Card.Text>
              <Card.Text>
                不過這些謎底好像缺少了什麼。進入隱藏關卡可以尋找遺失的關鍵。<br/>
                或是你也可以靠自己的智慧直接找出最終解答。
              </Card.Text>
              <Button variant="success" size="lg" onClick={()=>onSelectQuestion('X')}>
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
          <Card className="text-center" >
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
        <Card style={{ width: "12rem" }} className="text-center">
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
            <Button variant="primary" onClick={()=>onSelectQuestion('A')}>選擇</Button>
          </Card.Body>
        </Card>

        {/* 卡片 B */}
        <Card style={{ width: "12rem" }} className="text-center">
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
            <Button variant="primary" onClick={()=>onSelectQuestion('B')}>選擇</Button>
          </Card.Body>
        </Card>

        {/* 中間按鈕 */}
        <Button variant="success" size="lg">
          O
        </Button>

        {/* 卡片 C */}
        <Card style={{ width: "12rem" }} className="text-center">
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
            <Button variant="primary" onClick={()=>onSelectQuestion('C')}>選擇</Button>
          </Card.Body>
        </Card>

        {/* 卡片 D */}
        <Card style={{ width: "12rem" }} className="text-center">
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
            <Button variant="primary" onClick={()=>onSelectQuestion('D')}>選擇</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};


export default Home;
