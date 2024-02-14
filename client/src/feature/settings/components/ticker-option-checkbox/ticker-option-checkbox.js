import React from 'react';
import './ticker-option-checkbox.css';
import Label from 'components/label/label';

const TickerOptionCheckbox = ({ label, status, handleSetPickers }) => {
  return (
    <label className="ticker-container">
      <Label className={label.toLowerCase()} text={label} />
      <input type="checkbox" checked={status} id={label} onChange={handleSetPickers} />
      <span className="checkmark"></span>
    </label>
  );
};

export default TickerOptionCheckbox;
