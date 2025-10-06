import React from 'react';

function QuestionD({ onBack, onSubmit }) {
  return (
    <div>
      <h2>題目 D</h2>
      <p>這裡是題目 D 的內容（先隨便填充）</p>
      <button onClick={onBack}>返回主畫面</button>
      <button onClick={() => onSubmit('答D')}>送出答案</button>
    </div>
  );
}

export default QuestionD;