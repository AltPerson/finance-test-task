import React from 'react';
import './ticker-picker.css';
import TickerOptionCheckbox from '../ticker-option-checkbox/ticker-option-checkbox';

const TickersPicker = ({ tickers, handleSetPickers }) => {
  return (
    <div className="tickers">
      <span className="tickers__title">Вибрані акції</span>
      <div className="tickers-container">
        {tickers.map((ticker) => (
          <TickerOptionCheckbox key={ticker.label} label={ticker.label} status={ticker.isPicked} handleSetPickers={handleSetPickers} />
        ))}
      </div>
    </div>
  );
};

export default TickersPicker;
