import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Home({answers, onSelectQuestion, allCleared}) {
  return (
    <div className="container py-5">
      {/* ===== 新增區塊：全破關提示 ===== */}
      {allCleared && (
        <div className="mb-4">
          {/* 隱藏關卡 */}
          <Card className="text-center" >
            <Card.Body >
              <Card.Title>Well Done!</Card.Title>
              <Card.Text>
                恭喜你已完成各科的題目，也取得了最終解答的線索。
              </Card.Text>
              <Card.Text>
                欸呀，看來這些線索遺失了重要的東西。進入隱藏關卡，找回那些重要的東西吧！
              </Card.Text>
              <Button variant="success" size="lg" onClick={()=>onSelectQuestion('X')}>
                前往最終解答
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
      {/* ===== 新增區塊結束 ===== */}


      <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
        {/* 卡片 A */}
        <Card style={{ width: "12rem" }} className="text-center" onClick={()=>onSelectQuestion('A')}>
          <Card.Body>
            <Card.Title>題目 A</Card.Title>
            <Card.Text> {answers.A ? `(${answers.A})` : '「謎」'} </Card.Text>
            <Button variant="primary">進入 A</Button>
          </Card.Body>
        </Card>

        {/* 卡片 B */}
        <Card style={{ width: "12rem" }} className="text-center" onClick={()=>onSelectQuestion('B')}>
          <Card.Body>
            <Card.Title>題目 B</Card.Title>
            <Card.Text> {answers.B ? `(${answers.B})` : '「謎」'} </Card.Text>
            <Button variant="primary">進入 B</Button>
          </Card.Body>
        </Card>

        {/* 中間按鈕 */}
        <Button variant="success" size="lg">
          最終解答
        </Button>

        {/* 卡片 C */}
        <Card style={{ width: "12rem" }} className="text-center" onClick={()=>onSelectQuestion('C')}>
          <Card.Body>
            <Card.Title>題目 C</Card.Title>
            <Card.Text> {answers.C ? `(${answers.C})` : '「謎」'} </Card.Text>
            <Button variant="primary">進入 C</Button>
          </Card.Body>
        </Card>

        {/* 卡片 D */}
        <Card style={{ width: "12rem" }} className="text-center" onClick={()=>onSelectQuestion('D')}>
          <Card.Body>
            <Card.Title>題目 D</Card.Title>
            <Card.Text> {answers.D ? `(${answers.D})` : '「謎」'} </Card.Text>
            <Button variant="primary">進入 D</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};


export default Home;
