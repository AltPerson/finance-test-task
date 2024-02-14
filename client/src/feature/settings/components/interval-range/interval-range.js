import React from 'react';
import './interval-range.css';

const IntervalRange = ({ updateDelay, handleUpdateDelay }) => {
  return (
    <div className="interval">
      <div className="interval-label">
        <span>Затримка оновлення</span>
      </div>
      <div className="interval-container">
        <input type="range" id="interval-delay" name="interval-delay" min="0.1" step="0.1" onChange={handleUpdateDelay} value={updateDelay} max="5" />
        <span>{updateDelay} ms</span>
      </div>
    </div>
  );
};

export default IntervalRange;
