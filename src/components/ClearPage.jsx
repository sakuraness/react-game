import React, { useEffect, useMemo, useState } from 'react';
import { Card } from "react-bootstrap";
import "./ClearPage.css";
import bg from "../images/bgMainSky10.png";
import imgCongrats from "../images/congrats.png";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

async function getPlayerID() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
}

function ClearPage({ elapsedSeconds, playerName }) {
  useEffect(() => {
    const controller = new AbortController();

    const sendClearLog = async () => {
      try {
        const player_id = await getPlayerID();

        const payload = {
          // TODO: 之後在這裡補你要寫進 Google Sheet 的欄位
          player_id: player_id,
          player_name: playerName || "Unknown",
          clear_time:	new Date().toISOString(),
          total_play_time: `${String(Math.floor(elapsedSeconds / 60)).padStart(2, "0")}:${String(elapsedSeconds % 60).padStart(2, "0")}`,
          browser:	navigator.userAgent,
          device:	/Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
          game_version: "1.0"
        };

        await fetch(
          "https://script.google.com/macros/s/AKfycbz6Dy1Wq-ImgoZes9hyfk1Xm_InA0TrKaEfk5OyDWEd-4c6LU6QzDUJq1WnVEiVApLW/exec",
          {
            method: "POST",
            body: JSON.stringify(payload),
            signal: controller.signal,
          }
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to send clear log:", error);
        }
      }
    };

    sendClearLog();

    return () => controller.abort();
  }, [elapsedSeconds, playerName]);

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  const lines = useMemo(
    () => [
      `你成功完成了「點擊八下」的最終指令`,
      `為了感謝你的遊玩，你將不會獲得豐富的獎勵`,
      `通關花費時間為：${minutes} 分 ${seconds} 秒`
    ],
    [paddedMinutes, paddedSeconds]
  );

  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const runTyping = async () => {
      setCurrentLine(0);
      setCurrentChar(0);
      setIsDone(false);

      for (let i = 0; i < lines.length; i += 1) {
        setCurrentLine(i);
        setCurrentChar(0);

        for (let c = 1; c <= lines[i].length; c += 1) {
          if (cancelled) return;
          setCurrentChar(c);
          await sleep(55); // 逐字速度
        }

        if (i < lines.length - 1) {
          await sleep(320); // 換行停頓
        }
      }

      if (!cancelled) setIsDone(true);
    };

    runTyping();

    return () => {
      cancelled = true;
    };
  }, [lines]);


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
      <Card className="question-card ui-card ui-card--gray">
        <Card.Body className="question-card-body">
          <div className="hint-box">
            恭喜通關
          </div>

          <Card.Title className="clear-playername">
            {playerName}
          </Card.Title>
      
          <Card.Title className="clear-type-box">
            {lines.map((line, idx) => {
              const isPast = idx < currentLine;
              const isActive = idx === currentLine && !isDone;
              const isLastLineDone = isDone && idx === lines.length - 1;

              const visibleText = isDone || isPast
                ? line
                : isActive
                ? line.slice(0, currentChar)
                : "";

              const showCaret = isActive || isLastLineDone;

              return (
                <div key={`${line}-${idx}`} className="clear-type-line">
                  <span>{visibleText}</span>
                  {showCaret && <span className="clear-type-caret" aria-hidden="true" />}
                </div>
              );
            })}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ClearPage;
