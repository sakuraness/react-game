import React from 'react';

function QuestionC({ onBack, onSubmit }) {
  return (
    <div>
      <h2>題目 C</h2>
      <p>這裡是題目 C 的內容（先隨便填充）</p>
      <button onClick={onBack}>返回主畫面</button>
      <button onClick={() => onSubmit('答C')}>送出答案</button>
    </div>
  );
}

export default QuestionC;