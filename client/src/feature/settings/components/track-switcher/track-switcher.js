import React from 'react';
import './track-switcher.css';

const TrackSwitcher = ({ handleSetIsTracking, isTracking }) => {
  return (
    <div className="track-container">
      <span className="title">Увімкнути відслідковування акцій </span>
      <label className="switch">
        <input type="checkbox" checked={isTracking} onChange={handleSetIsTracking} />
        <span className="slider round" />
      </label>
    </div>
  );
};

export default TrackSwitcher;
