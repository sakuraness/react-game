import React, { useState, useRef } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import "./QuestionX.css";
import bgA from "../images/chineseBG.jpg";

const ANSWER = "3214";

function QuestionX({ onBack, onSubmit }) {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [records, setRecords] = useState([]);
  const [locked, setLocked] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);

  const inputRefs = useRef([]);

  /* ===== 輸入處理 ===== */
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value) || locked) return;

    const next = [...inputs];
    next[index] = value;
    setInputs(next);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /* ===== 驗證 ===== */
  const validate = () => {
    if (inputs.some(v => v === "")) return "請輸入完整 4 位數字";
    if (new Set(inputs).size !== 4) return "數字不可重複";
    return null;
  };

  /* ===== A/B 判定 ===== */
  const checkAB = (guess) => {
    let A = 0, B = 0;
    for (let i = 0; i < 4; i++) {
      if (guess[i] === ANSWER[i]) A++;
      else if (ANSWER.includes(guess[i])) B++;
    }
    return { A, B };
  };

  /* ===== 提交 ===== */
  const handleSubmit = () => {
    if (locked) return;

    const err = validate();
    if (err) {
      setErrorMsg(err);
      setShowError(true);
      return;
    }

    const guess = inputs.join("");
    const { A, B } = checkAB(guess);

    setRecords(prev => [
      ...prev,
      { index: prev.length + 1, guess, result: `${A}A${B}B` }
    ]);

    setInputs(["", "", "", ""]);
    inputRefs.current[0]?.focus();

    if (A === 4) {
      setLocked(true);
      setShowSuccess(true);
    }
  };

  const handle1A2BRule = () => {
    setShowRuleModal(true);
  };

  const handleCloseRuleModal = () => {
    setShowRuleModal(false);
  };

  /* ===== 成功返回 ===== */
  const handleSuccessBack = () => {
    onSubmit("3214");
  };

  return (
    <div
      className="questionX-wrapper"
      style={{ backgroundImage: `url(${bgA})` }}
    >
      <Card className="questionX-card">
        <Card.Body className="questionX-body">
          {/* ===== 上方說明區 ===== */}
          <div className="questionX-header">
            <div className="hint-box">
              「他知道，只要順序錯了，一切都會重來。」
            </div>

            <Card.Title className="questionX-title">
              1A2B：請猜出不重複的 4 位數字，為答案補上的最後的拼圖。
            </Card.Title>
            <Button onClick={handle1A2BRule}>
              1A2B規則
            </Button>
          </div>

          <div className="unknown-area">
            <div className="unknown-digit-box">?</div>
            <div className="unknown-digit-box">?</div>
            <div className="unknown-digit-box">?</div>
            <div className="unknown-digit-box">?</div>
          </div>

          <div className="questionX-divider" />

          {/* ===== 中間猜測紀錄區 ===== */}
          <div className="questionX-history">
            {records.map(r => (
              <div key={r.index} className="record-row">
                <div className="record-index">第 {r.index} 次</div>

                <div className="record-guess">
                  {r.guess.split("").map((d, i) => (
                    <div key={i} className="digit-box">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="record-result">
                  {r.result}
                </div>
              </div>
            ))}
          </div>

          {/* ===== 底部輸入區 ===== */}
          <div className="questionX-inputBar">
            <Button variant="secondary" onClick={onBack}>
              返回主畫面
            </Button>
            {inputs.map((v, i) => (
              <Form.Control
                key={i}
                value={v}
                ref={el => (inputRefs.current[i] = el)}
                onChange={e => handleChange(i, e.target.value)}
                maxLength={1}
                disabled={locked}
                className="input-digit"
              />
            ))}

            <Button onClick={handleSubmit} disabled={locked}>
              提交
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* ===== 錯誤 Modal ===== */}
      <Modal show={showError} onHide={() => setShowError(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>輸入錯誤</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMsg}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowError(false)}>確認</Button>
        </Modal.Footer>
      </Modal>

      {/* ===== 成功 Modal ===== */}
      <Modal show={showSuccess} backdrop="static" keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>答對了</Modal.Title>
        </Modal.Header>
        <Modal.Body>你已成功破解正確答案。</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSuccessBack}>
            返回 HOME
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ===== 1A2B規則 Modal ===== */}
      <Modal
        show={showRuleModal}
        onHide={handleCloseRuleModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>1A2B 規則說明</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>系統會設定一組 <strong>4 位不重複的數字</strong>。</p>

          <p>每次猜測後，系統會給你一個回饋：</p>

          <ul>
            <li><strong>A</strong>：數字正確，位置也正確</li>
            <li><strong>B</strong>：數字正確，但位置錯誤</li>
          </ul>

          <p>
            例如答案是 <code>1234</code>，你猜 <code>1325</code>，<br />
            回饋為 <strong>1A2B</strong>。
          </p>

          <p>目標是用最少的次數找出正確答案。</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRuleModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default QuestionX;
