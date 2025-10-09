<div
      style={{
        backgroundImage: `url(${bgC})`,
        backgroundRepeat: "repeat",
        backgroundSize: "500px 500px",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "8vh",
      }}
    >
      <Card className="question-card">
        <Card.Body>
          <Card.Title style={{ textAlign: "center", marginBottom: "20px" }}>
            題目 B
          </Card.Title>

          <div className="grid-container">
            {numbers.map((row, i) =>
                row.map((num, j) => (
                <div
                    key={`${i}-${j}`}
                    className={`grid-cell ${clicked[i][j] ? "clicked" : ""}`}
                    onClick={() => handleClick(i, j)}
                >
                    {num}
                </div>
                ))
            )}
          </div>
        </Card.Body>

        <div className="button-group">
          <Button onClick={onBack}>返回主畫面</Button>
          <Button>提示</Button>
          <Button onClick={handleSubmit}>送出答案</Button>
        </div>
      </Card>

      {/* 正確 modal */}
      <Modal show={showCorrectModal} onHide={() => setShowCorrectModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>CONGRATULATION!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>恭喜，你答對了！</p>
          <p>正確答案就是 EIGHT，也就是「八」！</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => onSubmit('八')}>
            回首頁
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 錯誤 modal */}
      <Modal show={showWrongModal} onHide={() => setShowWrongModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>答錯了！</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>答案不正確，再試一次吧！</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowWrongModal(false)}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </div>