import React from 'react';

function QuestionB({ onBack, onSubmit }) {
  return (
    <div>
      <h2>題目 B</h2>
      <p>這裡是題目 B 的內容（先隨便填充）</p>
      <button onClick={onBack}>返回主畫面</button>
      <button onClick={() => onSubmit('答B')}>送出答案</button>
    </div>
  );
}

export default QuestionB;