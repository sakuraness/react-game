import React from 'react';

function QuestionA({ onBack, onSubmit }) {
  return (
    <div>
      <h2>題目 A</h2>
      <p>這裡是題目 A 的內容（先隨便填充）</p>
      <button onClick={onBack}>返回主畫面</button>
      <button onClick={() => onSubmit('答A')}>送出答案</button>
    </div>
  );
}

export default QuestionA;