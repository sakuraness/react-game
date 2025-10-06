import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Home({answers, onSelectQuestion}) {
  return (
    <div className="container py-5">
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
